import os
import random
import string
from datetime import datetime, timedelta
from flask import Blueprint, request, jsonify
from models import Staff, Student, Parent
from database import db

auth_bp = Blueprint('auth', __name__)


# ── Staff Login ───────────────────────────────────────────────────────────────
@auth_bp.route('/staff/login', methods=['POST'])
def staff_login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    role     = data.get('role')

    print(f"Login attempt: username='{username}', role='{role}', password='{password}'")

    if not username or not password or not role:
        return jsonify({"error": "Missing required fields"}), 400

    username_clean = username.strip()
    if not username_clean.endswith('@college.com') and '@' not in username_clean:
        email_guess = f"{username_clean}@college.com"
    else:
        email_guess = username_clean

    user = Staff.query.filter(
        (Staff.username == username_clean) | 
        (Staff.email == username_clean) |
        (Staff.username == email_guess) |
        (Staff.email == email_guess)
    ).filter_by(role=role).first()
    
    if user:
        print(f"Found user: {user.username}. Password check: {user.check_password(password)}")
    else:
        print("User not found.")

    if user and user.check_password(password):
        return jsonify({
            "message": "Login successful",
            "token": "mock-jwt-token",
            "user": {
                "id": user.id,
                "username": user.username,
                "role": user.role,
                "full_name": user.name
            }
        }), 200

    return jsonify({"error": "Invalid credentials. Please check email, password, and selected role."}), 401


# ── Student Login ─────────────────────────────────────────────────────────────
@auth_bp.route('/student/login', methods=['POST'])
def student_login():
    data = request.json
    register_no = data.get('register_no') or data.get('uan')
    password    = data.get('password')

    if not register_no or not password:
        return jsonify({"error": "Missing required fields"}), 400

    student = Student.query.filter(
        (Student.register_no == register_no) | (Student.student_id == register_no)
    ).first()

    if student and student.check_password(password):
        return jsonify({
            "message": "Login successful",
            "token": f"student-{student.id}",
            "user": {
                "id": student.id,
                "register_no": student.register_no,
                "name": student.full_name,
                "role": "student"
            }
        }), 200

    return jsonify({"error": "Invalid register number or password"}), 401


# ── Parent: Send OTP ──────────────────────────────────────────────────────────
@auth_bp.route('/parent/send-otp', methods=['POST'])
def send_parent_otp():
    """
    Generate a 6-digit OTP for a parent, store it with 10-min expiry,
    and send it via Twilio SMS (fallback: return OTP in response for demo).
    """
    from models import ParentOTP
    data        = request.json
    register_no = data.get('register_no', '').strip()

    if not register_no:
        return jsonify({"error": "Student register number is required"}), 400

    # Find student and their linked parent
    student = Student.query.filter(
        (Student.register_no == register_no) | (Student.student_id == register_no)
    ).first()
    if not student:
        return jsonify({"error": "Student register number not found"}), 404

    parent = Parent.query.filter_by(student_id=student.id).first()
    if not parent:
        return jsonify({"error": "No parent linked to this student"}), 404

    phone = parent.phone_number or student.phone
    if not phone:
        return jsonify({"error": "No phone number registered for this student's parent"}), 400

    # Invalidate any existing unused OTPs for this student
    ParentOTP.query.filter_by(register_no=register_no, is_used=False).delete()
    db.session.flush()

    # Generate 6-digit numeric OTP
    otp_code   = ''.join(random.choices(string.digits, k=6))
    expires_at = datetime.utcnow() + timedelta(minutes=10)

    record = ParentOTP(
        register_no=register_no,
        otp=otp_code,
        phone=phone,
        expires_at=expires_at,
        is_used=False
    )
    db.session.add(record)
    db.session.commit()

    # ── Try to send via Twilio SMS ────────────────────────────────────────────
    sms_sent   = False
    demo_mode  = False
    sms_msg    = (
        f"UUCMS Parent Portal OTP\n"
        f"Your secure OTP for viewing {student.full_name}'s academic report: "
        f"{otp_code}\n"
        f"Valid for 10 minutes. Do not share this code."
    )

    twilio_sid   = os.environ.get('TWILIO_ACCOUNT_SID', '')
    twilio_token = os.environ.get('TWILIO_AUTH_TOKEN', '')
    twilio_from  = os.environ.get('TWILIO_PHONE_NUMBER', '')

    if twilio_sid and twilio_token and twilio_from and not twilio_sid.startswith('ACxxx'):
        try:
            from twilio.rest import Client as TwilioClient
            client = TwilioClient(twilio_sid, twilio_token)
            client.messages.create(body=sms_msg, from_=twilio_from, to=phone)
            sms_sent = True
        except Exception as e:
            demo_mode = True
    else:
        demo_mode = True

    response = {
        "message": f"OTP sent to {phone[:4]}****{phone[-3:]}!" if sms_sent
                   else f"Demo mode: OTP generated (configure Twilio to send real SMS)",
        "phone_hint": f"{phone[:4]}****{phone[-3:]}",
        "expires_in": 600,           # 10 minutes in seconds
        "sms_sent": sms_sent,
    }

    # In demo mode (Twilio not configured), return OTP so it can still work
    if demo_mode:
        response["demo_otp"] = otp_code
        response["note"] = "Twilio not configured. Using demo OTP above for testing."

    return jsonify(response), 200


# ── Parent Login (OTP + Credentials) ─────────────────────────────────────────
@auth_bp.route('/parent/login', methods=['POST'])
def parent_login():
    from models import ParentOTP
    data               = request.json
    parent_id          = data.get('parent_id') or data.get('token')
    password           = data.get('password')
    student_register_no= data.get('student_register_no')
    otp                = data.get('otp')

    # ── OTP Login Flow ────────────────────────────────────────────────────────
    if student_register_no and otp:
        student = Student.query.filter(
            (Student.register_no == student_register_no) |
            (Student.student_id  == student_register_no)
        ).first()
        if not student:
            return jsonify({"error": "Student register number not found"}), 404

        # Look up the most recent valid OTP record
        now    = datetime.utcnow()
        record = ParentOTP.query.filter_by(
            register_no=student.register_no,
            otp=otp,
            is_used=False
        ).filter(ParentOTP.expires_at > now).order_by(ParentOTP.created_at.desc()).first()

        # Fallback: demo OTP "123456" always works if Twilio not configured
        twilio_configured = bool(
            os.environ.get('TWILIO_ACCOUNT_SID', '').strip() and
            not os.environ.get('TWILIO_ACCOUNT_SID', '').startswith('ACxxx')
        )
        demo_bypass = (otp == "123456" and not twilio_configured)

        if not record and not demo_bypass:
            return jsonify({
                "error": "Invalid or expired OTP. Please request a new one."
            }), 401

        # Mark OTP as used
        if record:
            record.is_used = True
            db.session.commit()

        parent = Parent.query.filter_by(student_id=student.id).first()
        if not parent:
            return jsonify({"error": "No parent registered for this student"}), 404

        return jsonify({
            "message": "OTP Login successful",
            "token": f"parent-{parent.id}",
            "user": {
                "id": parent.id,
                "name": parent.name,
                "role": "parent",
                "student_name": student.full_name
            }
        }), 200

    # ── Parent ID + Password Flow ─────────────────────────────────────────────
    if not parent_id:
        return jsonify({"error": "Missing required fields"}), 400

    parent = Parent.query.filter(
        (Parent.parent_id == parent_id) | 
        (Parent.token == parent_id) |
        (Parent.phone_number == parent_id) |
        (Parent.phone_number == f"+91{parent_id}")
    ).first()

    if parent:
        student = Student.query.get(parent.student_id)
        return jsonify({
            "message": "Login successful",
            "token": f"parent-{parent.id}",
            "user": {
                "id": parent.id,
                "name": parent.name,
                "role": "parent",
                "student_name": student.full_name if student else "Unknown"
            }
        }), 200

    return jsonify({"error": "Invalid parent token or credentials"}), 401

@auth_bp.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.json
    email = data.get('email')
    if not email:
        return jsonify({"error": "Email is required"}), 400
    
    # In a real app, verify email exists and send a real email with a unique token.
    # Here, we just simulate success.
    print(f"[AUTH] Password reset link requested for: {email}")
    return jsonify({"message": "If the email is registered, a reset link will be sent."}), 200

@auth_bp.route('/reset-password', methods=['POST'])
def reset_password():
    data = request.json
    token = data.get('token')
    new_password = data.get('newPassword')
    
    if not token or not new_password:
        return jsonify({"error": "Missing token or password"}), 400
        
    # In a real app, verify the token, then hash the new password and update the DB.
    # Here, we simulate success.
    print(f"[AUTH] Password reset successful for token: {token}")
    return jsonify({"message": "Password successfully reset"}), 200
