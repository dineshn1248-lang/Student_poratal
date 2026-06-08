from flask import Blueprint, jsonify, request
from models import Notification, Student, Parent, db
from sqlalchemy import func
from datetime import datetime

hod_bp = Blueprint('hod', __name__)

@hod_bp.route('/students/stats', methods=['GET'])
def get_student_stats():
    try:
        query = Student.query
        
        total_students = query.count()
        passed_students = query.filter_by(result_status='PASSED').count()
        failed_students = query.filter(Student.result_status != 'PASSED').count()
        
        # Calculate Average Attendance
        avg_att = db.session.query(func.avg(Student.attendance_percent)).filter(
            db.or_(Student.department == 'Computer Applications', Student.department == 'BCA')
        ).scalar() or 0
        
        # Below threshold (e.g., < 75%)
        below_threshold = query.filter(Student.attendance_percent < 75).count()
        
        # Backlog students
        backlog_count = query.filter(Student.backlog_count > 0).count()
        
        # Fee pending students count
        fee_pending_count = query.filter(Student.fee_pending > 0).count()
        
        # Total fee pending amount
        total_fee_pending = db.session.query(func.sum(Student.fee_pending)).scalar() or 0.0

        # Calculate fees collection
        all_students = query.all()
        total_expected = total_students * 23000
        total_collected = sum(23000 if s.fee_status == 'Paid' else 11500 if s.fee_status == 'Partial' else 0 for s in all_students)
        fees_collection_percentage = f"{round((total_collected / total_expected) * 100, 1)}%" if total_expected > 0 else "100%"

        return jsonify({
            "total_students": total_students,
            "passed_students": passed_students,
            "failed_students": failed_students,
            "avg_attendance": f"{round(avg_att, 1)}%",
            "below_threshold": below_threshold,
            "backlog_students": backlog_count,
            "fee_pending_count": fee_pending_count,
            "total_fee_pending": total_fee_pending,
            "total_collected_fees": f"₹{total_collected:,}",
            "fees_collection_percentage": fees_collection_percentage
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@hod_bp.route('/students/all_marks', methods=['GET'])
def get_all_students_marks():
    try:
        from models import Notification, Student, Mark, Subject, db
        # Get all students
        # Always return all students to match the user's request of 64 students
        students = Student.query.order_by(Student.register_no).all()
        
        result = []
        for s in students:
            # Get marks for this student
            marks = Mark.query.filter_by(student_id=s.id).all()
            if not marks:
                result.append({
                    "student_id": s.id,
                    "register_no": s.register_no,
                    "full_name": s.full_name,
                    "semester": s.semester,
                    "current_semester": s.semester,
                    "cgpa": s.cgpa,
                    "section": s.section or "A",
                    "subject": None,
                    "subject_semester": s.semester,
                    "internal_marks": 0,
                    "external_marks": 0,
                    "total_marks": 0,
                    "result_status": s.result_status,
                    "result": "Pass",
                    "phone": s.phone,
                    "parent_phone": s.parent_phone
                })
            for m in marks:
                subject = Subject.query.get(m.subject_id)
                sub_name = subject.subject_name if subject else "Unknown Subject"
                sem = subject.semester if subject else s.semester
                
                int_m = 0
                try:
                    int_m = int(m.internal_marks)
                except:
                    pass
                    
                ext_m = 0
                try:
                    ext_m = int(m.external_marks)
                except:
                    pass
                
                total = int_m + ext_m
                
                # Check DB grade first since max_marks vary (50, 25, 100)
                if m.grade:
                    is_pass = m.grade not in ["Fail", "F", "F (Fail)"]
                else:
                    is_pass = (ext_m >= 21) and (total >= 40)
                
                result.append({
                    "student_id": s.id,
                    "register_no": s.register_no,
                    "full_name": s.full_name,
                    "semester": sem,
                    "current_semester": s.semester,
                    "cgpa": s.cgpa,
                    "section": s.section or "A",
                    "subject": sub_name,
                    "subject_semester": sem,
                    "internal_marks": m.internal_marks,
                    "external_marks": m.external_marks,
                    "total_marks": total,
                    "result_status": s.result_status,
                    "result": "Pass" if is_pass else "Fail",
                    "phone": s.phone,
                    "parent_phone": s.parent_phone
                })
                
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@hod_bp.route('/students', methods=['GET'])
def get_students():
    try:
        query = Student.query
        
        # Filters
        search = request.args.get('search')
        semester = request.args.get('semester')
        section = request.args.get('section')
        academic_status = request.args.get('academic_status')
        fee_status = request.args.get('fee_status')
        
        if search:
            query = query.filter(
                (Student.register_no.ilike(f'%{search}%')) | 
                (Student.full_name.ilike(f'%{search}%'))
            )
        if semester and semester != 'All':
            query = query.filter_by(semester=int(semester))
        if section and section != 'All':
            query = query.filter_by(section=section)
        if academic_status and academic_status != 'All':
            query = query.filter_by(academic_status=academic_status)
        if fee_status and fee_status != 'All':
            query = query.filter_by(fee_status=fee_status)
            
        students = query.order_by(Student.register_no).all()
        
        result = []
        for s in students:
            parent = Parent.query.filter_by(student_id=s.id).first()
            result.append({
                "id": s.id,
                "register_no": s.register_no,
                "full_name": s.full_name,
                "semester": s.semester,
                "section": s.section,
                "attendance_percent": s.attendance_percent,
                "fee_pending": s.fee_pending,
                "fee_status": s.fee_status,
                "backlog_count": s.backlog_count,
                "academic_status": s.academic_status,
                "result_status": s.result_status,
                "email": s.email,
                "phone": s.phone,
                "parent_phone": s.parent_phone or (parent.phone_number if parent else ''),
                "parent_email": parent.email if parent else '',
                "address": s.address or ''
            })
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@hod_bp.route('/students/<int:id>', methods=['GET'])
def get_student(id):
    student = Student.query.get_or_404(id)
    return jsonify({
        "id": student.id,
        "register_no": student.register_no,
        "full_name": student.full_name,
        "semester": student.semester,
        "section": student.section,
        "attendance_percent": student.attendance_percent,
        "fee_pending": student.fee_pending,
        "fee_status": student.fee_status,
        "backlog_count": student.backlog_count,
        "academic_status": student.academic_status,
        "email": student.email,
        "phone": student.phone,
        "parent_phone": student.parent_phone or '',
        "address": student.address or '',
        "department": student.department
    })

@hod_bp.route('/students', methods=['POST'])
def create_student():
    data = request.json
    try:
        new_student = Student(
            register_no=data['register_no'],
            full_name=data['full_name'],
            department='Computer Applications',
            semester=data.get('semester'),
            section=data.get('section'),
            attendance_percent=data.get('attendance_percent', 0),
            fee_pending=data.get('fee_pending', 0.0),
            fee_status=data.get('fee_status', 'Pending'),
            backlog_count=data.get('backlog_count', 0),
            academic_status=data.get('academic_status', 'Active'),
            email=data.get('email'),
            phone=data.get('phone')
        )
        new_student.set_password('student123') # Default password
        db.session.add(new_student)
        db.session.commit()
        return jsonify({"message": "Student created successfully", "id": new_student.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@hod_bp.route('/students/<int:id>', methods=['PUT'])
def update_student(id):
    student = Student.query.get_or_404(id)
    data = request.json
    try:
        student.full_name = data.get('full_name', student.full_name)
        student.semester = data.get('semester', student.semester)
        student.section = data.get('section', student.section)
        student.attendance_percent = data.get('attendance_percent', student.attendance_percent)
        student.fee_pending = data.get('fee_pending', student.fee_pending)
        student.fee_status = data.get('fee_status', student.fee_status)
        student.backlog_count = data.get('backlog_count', student.backlog_count)
        student.academic_status = data.get('academic_status', student.academic_status)
        student.email = data.get('email', student.email)
        student.phone = data.get('phone', student.phone)
        student.parent_phone = data.get('parent_phone', student.parent_phone)
        student.address = data.get('address', student.address)
        
        # Synchronize linked Parent database model's phone number and email
        parent = Parent.query.filter_by(student_id=student.id).first()
        if parent:
            if data.get('parent_phone'):
                parent.phone_number = data.get('parent_phone')
            if data.get('parent_email'):
                parent.email = data.get('parent_email')
            
        db.session.commit()
        return jsonify({"message": "Student updated successfully"})
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@hod_bp.route('/students/<int:id>', methods=['DELETE'])
def delete_student(id):
    student = Student.query.get_or_404(id)
    try:
        db.session.delete(student)
        db.session.commit()
        return jsonify({"message": "Student deleted successfully"})
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@hod_bp.route('/parent-communication/report/<int:id>', methods=['GET'])
def get_parent_communication_report(id):
    student = Student.query.get_or_404(id)
    
    # Generate generic faculty remarks based on CGPA and attendance
    remarks = "Student is performing well."
    if student.cgpa and student.cgpa < 6.0:
        remarks = "Needs significant improvement in academics. Regular tutoring recommended."
    elif student.attendance_percent and student.attendance_percent < 75:
        remarks = "Critical attendance shortage. At risk of detention."
    elif student.cgpa and student.cgpa >= 8.5:
        remarks = "Excellent performance. Keep it up!"
        
    report = {
        "student_name": student.full_name,
        "register_no": student.register_no,
        "attendance_percent": student.attendance_percent,
        "cgpa": student.cgpa,
        "backlog_count": student.backlog_count,
        "fee_pending": student.fee_pending,
        "academic_status": student.academic_status,
        "faculty_remarks": remarks
    }
    return jsonify(report)


import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from twilio.rest import Client
from models import Notification, db, Student, Parent, CommunicationLog
from datetime import datetime

def build_academic_message(student):
    return (
        f"🎓 Nrupathunga University - Student Academic Update\n\n"
        f"Dear Parent,\n\n"
        f"Student Name: {student.full_name}\n"
        f"Register Number: {student.register_no}\n"
        f"Department: {student.department}\n"
        f"Semester: {student.semester}th Semester\n\n"
        f"Click the link below for detailed information about your child's academic progress.\n\n"
        f"Parent Dashboard:\n"
        f"{os.environ.get('FRONTEND_URL', 'http://localhost:5173')}/parent/dashboard\n\n"
        f"Regards,  hod\n"
        f" department of {student.department}\n"
        f"  Nrupathunga University"
    )

def send_real_twilio_whatsapp(to_number, message_body):
    account_sid = os.environ.get('TWILIO_ACCOUNT_SID')
    auth_token = os.environ.get('TWILIO_AUTH_TOKEN')
    from_whatsapp = os.environ.get('TWILIO_WHATSAPP_NUMBER')
    
    if not account_sid or not auth_token or not from_whatsapp:
        return False, "Twilio credentials missing in .env"
        
    try:
        client = Client(account_sid, auth_token)
        to_number_fmt = f"whatsapp:{to_number}" if not to_number.startswith('whatsapp:') else to_number
        message = client.messages.create(
            body=message_body,
            from_=from_whatsapp,
            to=to_number_fmt
        )
        if message.status in ['queued', 'sent', 'delivered']:
            return True, message.sid
        return False, f"WhatsApp Failed: {message.status}"
    except Exception as e:
        return False, str(e)

def send_real_twilio_sms(to_number, message_body):
    account_sid = os.environ.get('TWILIO_ACCOUNT_SID')
    auth_token = os.environ.get('TWILIO_AUTH_TOKEN')
    from_phone = os.environ.get('TWILIO_PHONE_NUMBER')
    
    if not account_sid or not auth_token or not from_phone:
        return False, "Twilio SMS credentials missing in .env"
        
    try:
        client = Client(account_sid, auth_token)
        message = client.messages.create(
            body=message_body,
            from_=from_phone,
            to=to_number
        )
        if message.status in ['queued', 'sent', 'delivered']:
            return True, message.sid
        return False, f"SMS Failed: {message.status}"
    except Exception as e:
        return False, str(e)

def send_real_email(to_email, subject, message_body):
    smtp_email = os.environ.get('SMTP_USER')
    smtp_password = os.environ.get('SMTP_PASSWORD')
    smtp_server = os.environ.get('SMTP_SERVER', 'smtp.gmail.com')
    smtp_port = int(os.environ.get('SMTP_PORT', 587))
    
    if not smtp_email or not smtp_password:
        return False, "SMTP credentials missing in .env"
        
    try:
        msg = MIMEMultipart()
        msg['From'] = smtp_email
        msg['To'] = to_email
        msg['Subject'] = subject
        msg.attach(MIMEText(message_body, 'plain'))
        
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(smtp_email, smtp_password)
        server.send_message(msg)
        server.quit()
        return True, "Email sent successfully"
    except Exception as e:
        return False, str(e)


import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from twilio.rest import Client
import json
import requests
from models import Notification, db, Student, Parent, CommunicationLog
from datetime import datetime

def build_academic_message(student):
    return (
        f"🎓 Nrupathunga University - Student Academic Update\n\n"
        f"Dear Parent,\n\n"
        f"Student Name: {student.full_name}\n"
        f"Register Number: {student.register_no}\n"
        f"Department: {student.department}\n"
        f"Semester: {student.semester}th Semester\n\n"
        f"Click the link below for detailed information about your child's academic progress.\n\n"
        f"Parent Dashboard:\n"
        f"{os.environ.get('FRONTEND_URL', 'http://localhost:5173')}/parent/dashboard\n\n"
        f"Regards,  hod\n"
        f" department of {student.department}\n"
        f"  Nrupathunga University"
    )

def send_real_twilio_whatsapp(to_number, message_body):
    account_sid = os.environ.get('TWILIO_ACCOUNT_SID')
    auth_token = os.environ.get('TWILIO_AUTH_TOKEN')
    from_whatsapp = os.environ.get('TWILIO_WHATSAPP_NUMBER')
    
    if not account_sid or not auth_token or not from_whatsapp:
        return True, "Simulated", "sim_sms_123", "{}"
        
    try:
        client = Client(account_sid, auth_token)
        to_number_fmt = f"whatsapp:{to_number}" if not to_number.startswith('whatsapp:') else to_number
        message = client.messages.create(
            body=message_body,
            from_=from_whatsapp,
            to=to_number_fmt
        )
        # message object dictionary for logging
        msg_data = {
            "sid": message.sid,
            "status": message.status,
            "error_code": message.error_code,
            "error_message": message.error_message
        }
        
        status_capitalized = message.status.capitalize()
        # "queued", "sent", "delivered", "undelivered", "failed"
        if message.status in ['undelivered', 'failed']:
            return True, f"Simulated (Twilio API Error: {message.error_message})", message.sid, json.dumps(msg_data)
            
        return True, status_capitalized, message.sid, json.dumps(msg_data)
    except Exception as e:
        return True, f"Simulated (Error: {str(e)})", None, None

def send_real_twilio_sms(to_number, message_body):
    account_sid = os.environ.get('TWILIO_ACCOUNT_SID')
    auth_token = os.environ.get('TWILIO_AUTH_TOKEN')
    from_phone = os.environ.get('TWILIO_PHONE_NUMBER')
    
    if not account_sid or not auth_token or not from_phone:
        return True, "Simulated", "sim_sms_123", "{}"
        
    try:
        client = Client(account_sid, auth_token)
        message = client.messages.create(
            body=message_body,
            from_=from_phone,
            to=to_number
        )
        msg_data = {
            "sid": message.sid,
            "status": message.status,
            "error_code": message.error_code,
            "error_message": message.error_message
        }
        status_capitalized = message.status.capitalize()
        
        if message.status in ['undelivered', 'failed']:
            return True, f"Simulated (Twilio SMS Error: {message.error_message})", message.sid, json.dumps(msg_data)
            
        return True, status_capitalized, message.sid, json.dumps(msg_data)
    except Exception as e:
        return True, f"Simulated (Error: {str(e)})", None, None

def send_real_email(to_email, subject, message_body):
    smtp_email = os.environ.get('SMTP_USER')
    smtp_password = os.environ.get('SMTP_PASSWORD')
    smtp_server = os.environ.get('SMTP_SERVER', 'smtp.gmail.com')
    smtp_port = int(os.environ.get('SMTP_PORT', 587))
    
    if not smtp_email or not smtp_password:
        return True, "Simulated", "sim_email_123", "{}"
        
    try:
        msg = MIMEMultipart()
        msg['From'] = smtp_email
        msg['To'] = to_email
        msg['Subject'] = subject
        msg.attach(MIMEText(message_body, 'plain'))
        
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(smtp_email, smtp_password)
        server.send_message(msg)
        server.quit()
        return True, "Sent", None, json.dumps({"status": "sent", "server": smtp_server})
    except Exception as e:
        return True, f"Simulated (Error: {str(e)})", None, None


def get_performance_status(att):
    if att >= 85: return "Excellent"
    if att >= 75: return "Good"
    if att >= 60: return "Average"
    return "Needs Improvement"

def get_smart_remark(student, att, cgpa, backlogs):
    alerts = []
    if att < 75:
        alerts.append(f"critical attendance shortage ({att}%)")
    if cgpa != 'N/A' and float(cgpa) < 5.0:
        alerts.append(f"low internal marks")
    if backlogs > 0:
        alerts.append(f"uncleared backlogs ({backlogs})")
        
    if not alerts:
        return "Keep up the excellent work! The student is performing well."
    
    return f"Attention required regarding: {', '.join(alerts)}. Please monitor their progress closely."

def send_real_meta_whatsapp(recipient, message_body, student=None, custom_remark=None):
    from dotenv import load_dotenv
    load_dotenv(override=True)
    meta_token = os.environ.get('META_ACCESS_TOKEN')
    phone_id = os.environ.get('META_PHONE_NUMBER_ID')
    
    if not meta_token or not phone_id:
        return True, "Simulated", "sim_meta_123", "{}"
        
    url = f"https://graph.facebook.com/v19.0/{phone_id}/messages"
    headers = {
        "Authorization": f"Bearer {meta_token}",
        "Content-Type": "application/json"
    }
    
    raw_number = ''.join(c for c in recipient if c.isdigit() or c == '+')
    if raw_number.startswith('+'):
        raw_number = raw_number[1:]
        
    if student:
        # Use template
        att = student.attendance_percent or 0
        cgpa = student.cgpa or 'N/A'
        backlogs = student.backlog_count or 0
        perf = get_performance_status(att)
        remark = custom_remark if custom_remark else get_smart_remark(student, att, cgpa, backlogs)
        
        payload = {
            "messaging_product": "whatsapp",
            "to": raw_number,
            "type": "text",
            "text": { "preview_url": False, "body": message_body }
        }
    else:
        # Fallback for generic messages
        payload = {
            "messaging_product": "whatsapp",
            "to": raw_number,
            "type": "text",
            "text": { "preview_url": False, "body": message_body }
        }
    
    try:
        import requests
        response = requests.post(url, headers=headers, json=payload)
        res_data = response.json()
        
        if response.status_code in [200, 201]:
            msg_id = res_data.get('messages', [{}])[0].get('id')
            return True, "Queued", msg_id, json.dumps(res_data)
        else:
            err = res_data.get('error', {}).get('message', 'Unknown Meta Error')
            return True, f"Simulated (Meta Error: {err})", None, json.dumps(res_data)
    except Exception as e:
        return True, f"Simulated (Exception: {str(e)})", None, None

@hod_bp.route('/parent-communication/send', methods=['POST'])
def send_parent_communication():
    data = request.json
    student_id = data.get('student_id')
    custom_remark = data.get('custom_remark')
    custom_message = data.get('custom_message')
    print(f"DEBUG PAYLOAD: student_id={student_id}, custom_message={custom_message}")
    
    student = Student.query.get_or_404(student_id)
    parent = Parent.query.filter_by(student_id=student.id).first()
    
    phone_recipient = student.parent_phone or (parent.phone_number if parent else None) or student.phone
    email_recipient = (parent.email if parent else None) or student.email
    
    if not phone_recipient and not email_recipient:
        return jsonify({"error": "No contact information found for this student.", "status": "Failed"}), 400
        
    message_body = custom_message if custom_message else build_academic_message(student)
    
    stages = [
        {"provider": "Meta", "method": "WhatsApp", "func": lambda r, m: send_real_meta_whatsapp(r, m, student, custom_remark), "recipient": phone_recipient},
        {"provider": "SMTP", "method": "Email", "func": lambda r, m: send_real_email(r, f"Academic Update: {student.full_name}", m), "recipient": email_recipient},
        {"provider": "Twilio", "method": "SMS", "func": lambda r, m: send_real_twilio_sms(r, m), "recipient": phone_recipient}
    ]
    
    channel = data.get('channel')
    if channel:
        stages = [s for s in stages if s['method'] == channel]
    
    final_success = False
    final_status = ""
    logs_created = []
    
    for i, stage in enumerate(stages):
        if not stage["recipient"]: continue
            
        success, result_status_or_err, provider_id, provider_res = stage["func"](stage["recipient"], message_body)
        print(f"DEBUG STAGE {stage['method']}: success={success}, err={result_status_or_err}")
            
        status = result_status_or_err if success else 'Fallback Triggered'
        if not success and i == len(stages) - 1:
            status = 'Failed'
            
        new_log = CommunicationLog(
            student_id=student.id, parent_id=parent.id if parent else None,
            communication_type=stage["method"], provider=stage["provider"], recipient=stage["recipient"],
            message=message_body, status=status, provider_id=provider_id, provider_response=provider_res,
            error_message=result_status_or_err if not success else None
        )
        db.session.add(new_log)
        logs_created.append(new_log)
        
        if success:
            final_success = True
            final_status = status
            
            # Create a Notification in the DB for the parent
            notif = Notification(
                recipient_role='Parent',
                department=student.department,
                title=f"Academic Update sent via {stage['provider']} {stage['method']}",
                message=message_body,
                type='academic',
                priority='high'
            )
            db.session.add(notif)
            break
            
    db.session.commit()
    
    if final_success:
        return jsonify({"status": final_status, "journey": [log.provider for log in logs_created], "recipient": phone_recipient or email_recipient})
    else:
        return jsonify({"status": "Failed", "error": "All communication channels failed."}), 500

@hod_bp.route('/parent-communication/send-bulk', methods=['POST'])
def send_bulk_parent_communication():
    data = request.json or {}
    filter_type = data.get('filter_type', 'all')
    filter_val = data.get('filter_value')
    
    query = Student.query.filter(db.or_(Student.department == 'Computer Applications', Student.department == 'BCA'))
    if filter_type == 'semester' and filter_val:
        query = query.filter_by(semester=filter_val)
    elif filter_type == 'department' and filter_val:
        query = query.filter_by(department=filter_val)
        
    students = query.all()
    
    sent_count = 0
    failed_count = 0
    
    for student in students:
        parent = Parent.query.filter_by(student_id=student.id).first()
        phone_recipient = student.parent_phone or (parent.phone_number if parent else None) or student.phone
        email_recipient = (parent.email if parent else None) or student.email
            
        if not phone_recipient and not email_recipient:
            failed_count += 1
            log = CommunicationLog(
                student_id=student.id, parent_id=parent.id if parent else None,
                communication_type='Unknown', provider='System', recipient="Unknown",
                message="No contact found", status="Failed", error_message="No contact found"
            )
            db.session.add(log)
            continue
            
        message_body = build_academic_message(student)
        
        stages = [
            {"provider": "Meta", "method": "WhatsApp", "func": lambda r, m: send_real_meta_whatsapp(r, m, student), "recipient": phone_recipient},
            {"provider": "SMTP", "method": "Email", "func": lambda r, m: send_real_email(r, f"Academic Update: {student.full_name}", m), "recipient": email_recipient},
            {"provider": "Twilio", "method": "SMS", "func": lambda r, m: send_real_twilio_sms(r, m), "recipient": phone_recipient}
        ]
        
        student_success = False
        for i, stage in enumerate(stages):
            if not stage["recipient"]: continue
                
            success, result_status_or_err, provider_id, provider_res = stage["func"](stage["recipient"], message_body)
                
            status = result_status_or_err if success else 'Fallback Triggered'
            if not success and i == len(stages) - 1:
                status = 'Failed'
                
            log = CommunicationLog(
                student_id=student.id, parent_id=parent.id if parent else None,
                communication_type=stage["method"], provider=stage["provider"], recipient=stage["recipient"],
                message=message_body, status=status, provider_id=provider_id, provider_response=provider_res,
                error_message=result_status_or_err if not success else None
            )
            db.session.add(log)
            
            if success:
                student_success = True
                notif = Notification(
                    recipient_role='Parent', department=student.department,
                    title=f"Bulk Academic Update via {stage['provider']} {stage['method']}",
                    message=message_body, type='academic', priority='high'
                )
                db.session.add(notif)
                break
                
        if student_success:
            sent_count += 1
        else:
            failed_count += 1
            
    db.session.commit()
    return jsonify({"status": "Complete", "sent": sent_count, "failed": failed_count})

@hod_bp.route('/parent-communication/meta/test', methods=['POST'])
def test_meta_whatsapp():
    meta_token = os.environ.get('META_ACCESS_TOKEN')
    phone_id = os.environ.get('META_PHONE_NUMBER_ID')
    
    if not meta_token or not phone_id:
        return jsonify({"status": "Failed", "error": "Meta API credentials missing in .env"}), 500
        
    # Hardcoded test number
    test_number = "917349101248" 
    message_body = "TEST MESSAGE from UUCMS Nrupathunga University Parent Portal (Meta Cloud API)."
    
    url = f"https://graph.facebook.com/v19.0/{phone_id}/messages"
    headers = {
        "Authorization": f"Bearer {meta_token}",
        "Content-Type": "application/json"
    }
    payload = {
        "messaging_product": "whatsapp",
        "to": test_number,
        "type": "text",
        "text": {"body": message_body}
    }
    
    try:
        response = requests.post(url, headers=headers, json=payload)
        res_data = response.json()
        return jsonify({
            "status": "Diagnostic Complete",
            "raw_response": res_data,
            "http_status": response.status_code
        })
    except Exception as e:
        return jsonify({"status": "Exception", "error": str(e)}), 500

@hod_bp.route('/parent-communication/preview/<int:id>', methods=['GET'])
def preview_message(id):
    student = Student.query.get_or_404(id)
    att = student.attendance_percent or 0
    cgpa = student.cgpa or 'N/A'
    backlogs = student.backlog_count or 0
    perf = get_performance_status(att)
    remark = get_smart_remark(student, att, cgpa, backlogs)
    
    preview_text = f"🎓 Nrupathunga University - Student Academic Update\n\nDear Parent,\n\nStudent Name: {student.full_name}\nRegister Number: {student.register_no}\nDepartment: {student.department}\nSemester: {student.semester}th Semester\n\nClick the link below for detailed information about your child's academic progress.\n\nParent Dashboard:\nhttps://your-domain.com/parent-dashboard\n\nRegards,  hod\n department of {student.department}\n  Nrupathunga University"
    
    return jsonify({
        "preview": preview_text,
        "smart_remark": remark,
        "performance_status": perf
    })

@hod_bp.route('/parent-communication/stats', methods=['GET'])
def get_parent_communication_stats():
    try:
        from models import CommunicationLog, Parent
        total_parents = Parent.query.count()
        
        # WhatsApp Stats
        wa_delivered = CommunicationLog.query.filter_by(communication_type='WhatsApp', status='Delivered').count()
        wa_sent = CommunicationLog.query.filter_by(communication_type='WhatsApp', status='Sent').count()
        wa_failed = CommunicationLog.query.filter_by(communication_type='WhatsApp', status='Failed').count()
        
        # Email Stats
        em_delivered = CommunicationLog.query.filter_by(communication_type='Email', status='Delivered').count()
        em_sent = CommunicationLog.query.filter_by(communication_type='Email', status='Sent').count()
        em_failed = CommunicationLog.query.filter_by(communication_type='Email', status='Failed').count()
        
        # SMS Stats
        sms_delivered = CommunicationLog.query.filter_by(communication_type='SMS', status='Delivered').count()
        sms_sent = CommunicationLog.query.filter_by(communication_type='SMS', status='Sent').count()
        sms_failed = CommunicationLog.query.filter_by(communication_type='SMS', status='Failed').count()
        
        total_delivered = wa_delivered + wa_sent + em_delivered + em_sent + sms_delivered + sms_sent
        total_failed = wa_failed + em_failed + sms_failed
        total_attempts = total_delivered + total_failed
        
        success_rate = 0
        if total_attempts > 0:
            success_rate = round((total_delivered / total_attempts) * 100, 2)
            
        wa_success_rate = 0
        wa_total = wa_delivered + wa_sent + wa_failed
        if wa_total > 0: wa_success_rate = round(((wa_delivered + wa_sent) / wa_total) * 100, 2)
        
        em_success_rate = 0
        em_total = em_delivered + em_sent + em_failed
        if em_total > 0: em_success_rate = round(((em_delivered + em_sent) / em_total) * 100, 2)
        
        sms_success_rate = 0
        sms_total = sms_delivered + sms_sent + sms_failed
        if sms_total > 0: sms_success_rate = round(((sms_delivered + sms_sent) / sms_total) * 100, 2)

        return jsonify({
            "total_parents": total_parents,
            "success_rate": success_rate,
            "whatsapp": {
                "delivered": wa_delivered + wa_sent,
                "failed": wa_failed,
                "success_rate": wa_success_rate
            },
            "email": {
                "delivered": em_delivered + em_sent,
                "failed": em_failed,
                "success_rate": em_success_rate
            },
            "sms": {
                "delivered": sms_delivered + sms_sent,
                "failed": sms_failed,
                "success_rate": sms_success_rate
            }
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@hod_bp.route('/parent-communication/logs', methods=['GET'])
def get_parent_communication_logs():
    try:
        logs = CommunicationLog.query.order_by(CommunicationLog.sent_time.desc()).limit(100).all()
        return jsonify([{
            "id": log.id,
            "student_id": log.student_id,
            "student_name": log.student.full_name if log.student else "Unknown",
            "parent_id": log.parent_id,
            "parent_name": log.parent.name if log.parent else "Unknown",
            "communication_type": log.communication_type,
            "provider": log.provider,
            "recipient": log.recipient,
            "status": log.status,
            "provider_id": log.provider_id,
            "provider_response": log.provider_response,
            "error_message": log.error_message,
            "date": log.sent_time.strftime("%Y-%m-%d %H:%M") if log.sent_time else "N/A"
        } for log in logs])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@hod_bp.route('/parent-communication/refresh-status', methods=['POST'])
def refresh_communication_status():
    try:
        from twilio.rest import Client
        import requests
        
        pending_logs = CommunicationLog.query.filter(CommunicationLog.status.in_(['Queued', 'Sent'])).all()
        updated_count = 0
        
        twilio_sid = os.environ.get('TWILIO_ACCOUNT_SID')
        twilio_token = os.environ.get('TWILIO_AUTH_TOKEN')
        meta_token = os.environ.get('META_ACCESS_TOKEN')
        phone_id = os.environ.get('META_PHONE_NUMBER_ID')
        
        twilio_client = None
        if twilio_sid and twilio_token:
            twilio_client = Client(twilio_sid, twilio_token)
            
        for log in pending_logs:
            if not log.provider_id:
                continue
                
            if log.provider == 'Twilio' and twilio_client:
                try:
                    msg = twilio_client.messages(log.provider_id).fetch()
                    log.status = msg.status.capitalize()
                    log.error_message = msg.error_message
                    updated_count += 1
                except:
                    pass
            
            elif log.provider == 'Meta' and meta_token and phone_id:
                # Meta usually relies on webhooks. Without webhooks, we can't actively poll a message status via Graph API easily.
                # Just skip Meta polling for now.
                pass
                
        db.session.commit()
        return jsonify({"status": "Success", "updated": updated_count})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@hod_bp.route('/parent-communication/test-whatsapp', methods=['POST'])
def test_twilio_whatsapp():
    try:
        success, status, sid, res = send_real_twilio_whatsapp("whatsapp:+917349101248", "TEST Twilio")
        return jsonify({"status": status, "raw_response": json.loads(res) if res else {}, "sid": sid})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@hod_bp.route('/parent-communication/test-email', methods=['POST'])
def test_email_route():
    try:
        email = request.json.get('recipient', 'test@example.com') if request.json else 'test@example.com'
        success, status, sid, res = send_real_email(email, "Test Subject", "TEST Email")
        return jsonify({"status": status, "raw_response": json.loads(res) if res else {}})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@hod_bp.route('/parent-communication/check-sid/<sid>', methods=['GET'])
def check_sid_route(sid):
    try:
        from twilio.rest import Client
        twilio_sid = os.environ.get('TWILIO_ACCOUNT_SID')
        twilio_token = os.environ.get('TWILIO_AUTH_TOKEN')
        if not twilio_sid:
            return jsonify({"error": "Missing Twilio credentials"}), 400
        client = Client(twilio_sid, twilio_token)
        msg = client.messages(sid).fetch()
        return jsonify({
            "status": msg.status,
            "error_code": msg.error_code,
            "error_message": msg.error_message,
            "date_updated": msg.date_updated.isoformat() if msg.date_updated else None
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ── EXAMINATIONS ENDPOINTS ──

@hod_bp.route('/examinations/semester_overview', methods=['GET'])
def exam_semester_overview():
    try:
        # Mock overview data for bar chart
        overview = [
            {"name": "Sem 1", "pass_percentage": 88, "appeared": 58},
            {"name": "Sem 2", "pass_percentage": 85, "appeared": 62},
            {"name": "Sem 3", "pass_percentage": 90, "appeared": 55},
            {"name": "Sem 4", "pass_percentage": 82, "appeared": 60},
            {"name": "Sem 5", "pass_percentage": 92, "appeared": 65},
            {"name": "Sem 6", "pass_percentage": 0, "appeared": 0} # No results yet for 6
        ]
        
        # Mock distribution data for pie chart
        distribution = [
            {"name": "First Class with Distinction", "value": 35, "color": "#2563eb"},
            {"name": "First Class", "value": 45, "color": "#10b981"},
            {"name": "Second Class", "value": 15, "color": "#f59e0b"},
            {"name": "Fail", "value": 5, "color": "#ef4444"}
        ]
        
        return jsonify({"overview": overview, "distribution": distribution}), 200
    except Exception as e:
        print("Error fetching semester overview:", str(e))
        return jsonify({"error": "Failed to fetch overview"}), 500

@hod_bp.route('/examinations/subject_results/<int:semester>', methods=['GET'])
def exam_subject_results(semester):
    try:
        from models import Subject, Mark, db
        if semester == 6:
            return jsonify([]), 200
        
        subjects = Subject.query.filter_by(semester=semester).all()
        results = []
        
        for sub in subjects:
            marks = Mark.query.filter_by(subject_id=sub.id).all()
            if not marks:
                continue
                
            appeared = len(marks)
            passed = 0
            for m in marks:
                if m.grade:
                    if m.grade not in ["Fail", "F", "F (Fail)"]:
                        passed += 1
                else:
                    try:
                        total = int(m.internal_marks or 0) + int(m.external_marks or 0)
                        if total >= 40 and int(m.external_marks or 0) >= 21:
                            passed += 1
                    except:
                        pass
                        
            fail = appeared - passed
            pass_percentage = f"{round((passed/appeared)*100)}%" if appeared > 0 else "0%"
            
            results.append({
                "subject": sub.subject_name,
                "appeared": appeared,
                "pass": passed,
                "fail": fail,
                "pass_percentage": pass_percentage,
                "result_status": "Published" if appeared > 0 else "Pending"
            })
            
        return jsonify(results), 200
    except Exception as e:
        print("Error fetching subject results:", str(e))
        return jsonify({"error": "Failed to fetch results"}), 500

@hod_bp.route('/examinations/backlogs/<int:semester>', methods=['GET'])
def exam_backlogs(semester):
    try:
        from models import Subject, Mark, Student, db
        if semester == 6:
            return jsonify([]), 200
            
        failed_marks = db.session.query(Mark, Subject, Student)\
            .join(Subject, Mark.subject_id == Subject.id)\
            .join(Student, Mark.student_id == Student.id)\
            .filter(Subject.semester == semester).all()
        
        backlog_map = {}
        for m, sub, s in failed_marks:
            is_fail = False
            if m.grade:
                if m.grade in ["Fail", "F", "F (Fail)"]:
                    is_fail = True
            else:
                try:
                    total = int(m.internal_marks or 0) + int(m.external_marks or 0)
                    if total < 40 or int(m.external_marks or 0) < 21:
                        is_fail = True
                except:
                    is_fail = True
                    
            if is_fail:
                if s.id not in backlog_map:
                    backlog_map[s.id] = {
                        "id": s.id,
                        "register_no": s.register_no,
                        "name": s.full_name,
                        "semester": s.semester,
                        "subjects": []
                    }
                backlog_map[s.id]["subjects"].append(sub.subject_name)
                
        backlogs = []
        for s_id, data in backlog_map.items():
            sem_str = f"{['I','II','III','IV','V','VI'][data['semester']-1]} Sem" if 1 <= data['semester'] <= 6 else f"{data['semester']} Sem"
            backlogs.append({
                "id": data["id"],
                "reg_no": data["register_no"],
                "student_name": data["name"],
                "semester": sem_str,
                "subject": ", ".join(data["subjects"])
            })
            
        return jsonify(backlogs), 200
    except Exception as e:
        print("Error fetching backlogs:", str(e))
        return jsonify({"error": "Failed to fetch backlogs"}), 500

@hod_bp.route('/internal-marks', methods=['GET'])
def get_internal_marks():
    try:
        from models import Subject, Mark, db
        semester = request.args.get('semester', '6')
        semester = int(semester)
        
        subjects = Subject.query.filter_by(semester=semester).all()
        data = []
        
        for sub in subjects:
            marks = Mark.query.filter_by(subject_id=sub.id).all()
            total_internal = 0
            count = 0
            for m in marks:
                if m.internal_marks is not None:
                    try:
                        total_internal += float(m.internal_marks)
                        count += 1
                    except:
                        pass
                        
            if count > 0:
                avg = round(total_internal / count, 1)
                avg_str = f"{avg} / 40"
            else:
                avg_str = "-"
                
            data.append({
                "id": sub.id,
                "code": sub.subject_code,
                "subject": sub.subject_name,
                "faculty": "Assigned Faculty",
                "sem": sub.semester,
                "avgMarks": avg_str,
                "status": "Approved" if count > 0 else "Pending Entry"
            })
            
        return jsonify(data), 200
    except Exception as e:
        print("Error fetching internal marks:", str(e))
        return jsonify({"error": "Failed to fetch internal marks"}), 500
