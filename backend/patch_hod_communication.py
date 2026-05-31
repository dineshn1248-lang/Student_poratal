import re

with open('routes/hod_routes.py', 'r', encoding='utf-8') as f:
    content = f.read()

start_idx = content.find("@hod_bp.route('/parent-communication/send'")
logs_idx = content.find("@hod_bp.route('/parent-communication/logs'")
if logs_idx != -1:
    next_route_idx = content.find("@hod_bp.route", logs_idx + 10)
    end_idx = next_route_idx if next_route_idx != -1 else len(content)
else:
    end_idx = len(content)

new_routes = """
import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from twilio.rest import Client
import json
from models import db, Student, Parent, CommunicationLog
from datetime import datetime

def build_academic_message(student):
    att = student.attendance_percent or 0
    backlogs = student.backlog_count or 0
    cgpa = student.cgpa or 'N/A'
    
    return (
        f"Dear Parent of {student.full_name},\\n\\n"
        f"This is an academic update from UUCMS - Nrupathunga University.\\n\\n"
        f"Student Name: {student.full_name}\\n"
        f"Register Number: {student.register_no}\\n"
        f"Department: {student.department}\\n"
        f"Semester: {student.semester} Semester\\n\\n"
        f"Attendance: {att}%\\n"
        f"Internal Marks Average: {cgpa}\\n"
        f"Backlogs: {backlogs}\\n\\n"
        f"Please log in to the Parent Portal to view detailed progress.\\n\\n"
        f"Regards,\\n"
        f"HOD\\n"
        f"Department of {student.department}\\n"
        f"Nrupathunga University"
    )

def send_real_twilio_whatsapp(to_number, message_body):
    account_sid = os.environ.get('TWILIO_ACCOUNT_SID')
    auth_token = os.environ.get('TWILIO_AUTH_TOKEN')
    from_whatsapp = os.environ.get('TWILIO_WHATSAPP_NUMBER')
    
    if not account_sid or not auth_token or not from_whatsapp:
        return False, "Twilio credentials missing in .env", None, None
        
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
            return False, f"Twilio API Error: {message.error_message}", message.sid, json.dumps(msg_data)
            
        return True, status_capitalized, message.sid, json.dumps(msg_data)
    except Exception as e:
        return False, str(e), None, None

def send_real_twilio_sms(to_number, message_body):
    account_sid = os.environ.get('TWILIO_ACCOUNT_SID')
    auth_token = os.environ.get('TWILIO_AUTH_TOKEN')
    from_phone = os.environ.get('TWILIO_PHONE_NUMBER')
    
    if not account_sid or not auth_token or not from_phone:
        return False, "Twilio SMS credentials missing in .env", None, None
        
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
            return False, f"Twilio SMS Error: {message.error_message}", message.sid, json.dumps(msg_data)
            
        return True, status_capitalized, message.sid, json.dumps(msg_data)
    except Exception as e:
        return False, str(e), None, None

def send_real_email(to_email, subject, message_body):
    smtp_email = os.environ.get('SMTP_EMAIL')
    smtp_password = os.environ.get('SMTP_PASSWORD')
    smtp_server = os.environ.get('SMTP_SERVER', 'smtp.gmail.com')
    smtp_port = int(os.environ.get('SMTP_PORT', 587))
    
    if not smtp_email or not smtp_password:
        return False, "SMTP credentials missing in .env", None, None
        
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
        return False, str(e), None, None

@hod_bp.route('/parent-communication/send', methods=['POST'])
def send_parent_communication():
    data = request.json
    student_id = data.get('student_id')
    method = data.get('method')
    
    student = Student.query.get_or_404(student_id)
    parent = Parent.query.filter_by(student_id=student.id).first()
    
    if method == 'Email':
        recipient = (parent.email if parent else None) or student.email
    else:
        recipient = student.parent_phone or (parent.phone_number if parent else None) or student.phone
        
    if not recipient:
        return jsonify({"error": f"No {method} contact found for this student.", "status": "Failed"}), 400
        
    message_body = build_academic_message(student)
    
    success = False
    result_status_or_err = ""
    provider_id = None
    provider_res = None
    
    if method == 'WhatsApp':
        success, result_status_or_err, provider_id, provider_res = send_real_twilio_whatsapp(recipient, message_body)
    elif method == 'SMS':
        success, result_status_or_err, provider_id, provider_res = send_real_twilio_sms(recipient, message_body)
    elif method == 'Email':
        success, result_status_or_err, provider_id, provider_res = send_real_email(recipient, f"Academic Update: {student.full_name}", message_body)
    else:
        return jsonify({"error": "Invalid method", "status": "Failed"}), 400
        
    status = result_status_or_err if success else 'Failed'
    
    new_log = CommunicationLog(
        student_id=student.id,
        parent_id=parent.id if parent else None,
        communication_type=method,
        recipient=recipient,
        message=message_body,
        status=status,
        provider_id=provider_id,
        provider_response=provider_res,
        error_message=result_status_or_err if not success else None
    )
    db.session.add(new_log)
    db.session.commit()
    
    if success:
        return jsonify({"status": status, "recipient": recipient, "provider_id": provider_id})
    else:
        return jsonify({"status": "Failed", "error": result_status_or_err}), 500

@hod_bp.route('/parent-communication/send-bulk', methods=['POST'])
def send_bulk_parent_communication():
    data = request.json
    method = data.get('method')
    if method not in ['WhatsApp', 'SMS', 'Email']:
        return jsonify({"error": "Invalid method"}), 400
        
    students = Student.query.filter(db.or_(Student.department == 'Computer Applications', Student.department == 'BCA')).all()
    
    sent_count = 0
    failed_count = 0
    
    for student in students:
        parent = Parent.query.filter_by(student_id=student.id).first()
        if method == 'Email':
            recipient = (parent.email if parent else None) or student.email
        else:
            recipient = student.parent_phone or (parent.phone_number if parent else None) or student.phone
            
        if not recipient:
            failed_count += 1
            log = CommunicationLog(
                student_id=student.id, parent_id=parent.id if parent else None,
                communication_type=method, recipient="Unknown",
                message="No contact found", status="Failed", error_message="No contact found"
            )
            db.session.add(log)
            continue
            
        message_body = build_academic_message(student)
        
        if method == 'WhatsApp':
            success, result_status_or_err, provider_id, provider_res = send_real_twilio_whatsapp(recipient, message_body)
        elif method == 'SMS':
            success, result_status_or_err, provider_id, provider_res = send_real_twilio_sms(recipient, message_body)
        else:
            success, result_status_or_err, provider_id, provider_res = send_real_email(recipient, f"Academic Update: {student.full_name}", message_body)
            
        status = result_status_or_err if success else 'Failed'
        if success:
            sent_count += 1
        else:
            failed_count += 1
            
        log = CommunicationLog(
            student_id=student.id, parent_id=parent.id if parent else None,
            communication_type=method, recipient=recipient, message=message_body,
            status=status, provider_id=provider_id, provider_response=provider_res,
            error_message=result_status_or_err if not success else None
        )
        db.session.add(log)
        
    db.session.commit()
    return jsonify({"status": "Completed", "sent": sent_count, "failed": failed_count})

@hod_bp.route('/parent-communication/logs', methods=['GET'])
def get_parent_communication_logs():
    logs = CommunicationLog.query.order_by(CommunicationLog.sent_time.desc()).all()
    result = []
    for log in logs:
        student = Student.query.get(log.student_id)
        parent = Parent.query.get(log.parent_id) if log.parent_id else None
        
        result.append({
            "id": log.id,
            "date": log.sent_time.strftime("%d %b %Y, %I:%M %p") if log.sent_time else "",
            "student_name": student.full_name if student else "Unknown",
            "register_no": student.register_no if student else "Unknown",
            "parent_name": parent.name if parent else "Unknown",
            "communication_type": log.communication_type,
            "recipient": log.recipient,
            "status": log.status,
            "provider_id": log.provider_id,
            "provider_response": log.provider_response,
            "error_message": log.error_message,
            "retry_count": log.retry_count
        })
    return jsonify(result)

@hod_bp.route('/parent-communication/refresh-status', methods=['POST'])
def refresh_communication_status():
    account_sid = os.environ.get('TWILIO_ACCOUNT_SID')
    auth_token = os.environ.get('TWILIO_AUTH_TOKEN')
    if not account_sid or not auth_token:
        return jsonify({"error": "Twilio credentials missing"}), 500
        
    logs = CommunicationLog.query.filter(CommunicationLog.status.in_(['Queued', 'Sent'])).all()
    updated_count = 0
    try:
        client = Client(account_sid, auth_token)
        for log in logs:
            if log.provider_id and log.communication_type in ['WhatsApp', 'SMS']:
                try:
                    msg = client.messages(log.provider_id).fetch()
                    new_status = msg.status.capitalize()
                    
                    msg_data = {
                        "sid": msg.sid,
                        "status": msg.status,
                        "error_code": msg.error_code,
                        "error_message": msg.error_message
                    }
                    if msg.status in ['undelivered', 'failed']:
                        log.status = 'Failed'
                        log.error_message = msg.error_message or "Undelivered by Twilio"
                    else:
                        log.status = new_status
                        
                    log.provider_response = json.dumps(msg_data)
                    updated_count += 1
                except Exception as e:
                    print(f"Error fetching status for {log.provider_id}: {e}")
        db.session.commit()
        return jsonify({"status": "Completed", "updated": updated_count})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@hod_bp.route('/parent-communication/test-whatsapp', methods=['POST'])
def test_whatsapp_diagnostic():
    # Dedicated endpoint to test +917349101248 to dump raw JSON response
    recipient = "+917349101248"
    message_body = "TEST MESSAGE from UUCMS Nrupathunga University Parent Portal Diagnostics."
    
    account_sid = os.environ.get('TWILIO_ACCOUNT_SID')
    auth_token = os.environ.get('TWILIO_AUTH_TOKEN')
    from_whatsapp = os.environ.get('TWILIO_WHATSAPP_NUMBER')
    
    if not account_sid or not auth_token or not from_whatsapp:
        return jsonify({"status": "Failed", "error": "Twilio credentials missing in .env"}), 500
        
    try:
        client = Client(account_sid, auth_token)
        to_number_fmt = f"whatsapp:{recipient}"
        
        message = client.messages.create(
            body=message_body,
            from_=from_whatsapp,
            to=to_number_fmt
        )
        
        raw_response = {
            "sid": message.sid,
            "status": message.status,
            "date_created": str(message.date_created),
            "date_updated": str(message.date_updated),
            "date_sent": str(message.date_sent),
            "account_sid": message.account_sid,
            "to": message.to,
            "from_": message.from_,
            "body": message.body,
            "num_segments": message.num_segments,
            "num_media": message.num_media,
            "direction": message.direction,
            "api_version": message.api_version,
            "price": message.price,
            "price_unit": message.price_unit,
            "error_code": message.error_code,
            "error_message": message.error_message,
            "uri": message.uri,
            "subresource_uris": message.subresource_uris
        }
        
        return jsonify({"status": "Diagnostic Complete", "raw_response": raw_response})
    except Exception as e:
        return jsonify({"status": "Exception Thrown", "error": str(e)}), 500
"""

new_content = content[:start_idx] + new_routes + "\n" + content[end_idx:]

with open('routes/hod_routes.py', 'w', encoding='utf-8') as f:
    f.write(new_content)
print("Patched hod_routes.py successfully!")
