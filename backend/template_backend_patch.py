import os
import re

filepath = 'routes/hod_routes.py'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Make sure Notification is imported
if 'Notification' not in content:
    content = content.replace('from models import ', 'from models import Notification, ')

meta_func_logic = """def get_performance_status(att):
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
    meta_token = os.environ.get('META_ACCESS_TOKEN')
    phone_id = os.environ.get('META_PHONE_NUMBER_ID')
    
    if not meta_token or not phone_id:
        return False, "Meta API credentials missing in .env", None, None
        
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
            "type": "template",
            "template": {
                "name": "uucms_parent_academic_update",
                "language": { "code": "en_US" },
                "components": [
                    {
                        "type": "body",
                        "parameters": [
                            { "type": "text", "text": str(student.full_name) },
                            { "type": "text", "text": str(student.register_no) },
                            { "type": "text", "text": str(student.department) },
                            { "type": "text", "text": str(student.semester) },
                            { "type": "text", "text": str(att) },
                            { "type": "text", "text": str(cgpa) },
                            { "type": "text", "text": str(backlogs) },
                            { "type": "text", "text": str(perf) },
                            { "type": "text", "text": str(remark) }
                        ]
                    }
                ]
            }
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
            return False, f"Meta API Error: {err}", None, json.dumps(res_data)
    except Exception as e:
        return False, f"Exception: {str(e)}", None, None"""

def replace_func(content, start_marker, end_marker, new_func):
    start_idx = content.find(start_marker)
    if start_idx == -1: return content
    
    end_idx = content.find(end_marker, start_idx)
    if end_idx == -1:
        old = content[start_idx:]
    else:
        old = content[start_idx:end_idx]
    
    return content.replace(old, new_func + "\n\n")

content = replace_func(content, "def send_real_meta_whatsapp", "@hod_bp.route('/parent-communication/send'", meta_func_logic)


# Update the `send_parent_communication` to extract `custom_remark` from `data` and pass it to Meta.
# Also to create a Notification.

send_logic = """@hod_bp.route('/parent-communication/send', methods=['POST'])
def send_parent_communication():
    data = request.json
    student_id = data.get('student_id')
    custom_remark = data.get('custom_remark')
    
    student = Student.query.get_or_404(student_id)
    parent = Parent.query.filter_by(student_id=student.id).first()
    
    phone_recipient = student.parent_phone or (parent.phone_number if parent else None) or student.phone
    email_recipient = (parent.email if parent else None) or student.email
    
    if not phone_recipient and not email_recipient:
        return jsonify({"error": "No contact information found for this student.", "status": "Failed"}), 400
        
    message_body = build_academic_message(student)
    
    stages = [
        {"provider": "Meta", "method": "WhatsApp", "func": lambda r, m: send_real_meta_whatsapp(r, m, student, custom_remark), "recipient": phone_recipient},
        {"provider": "Twilio", "method": "WhatsApp", "func": lambda r, m: send_real_twilio_whatsapp(r, m), "recipient": phone_recipient},
        {"provider": "SMTP", "method": "Email", "func": lambda r, m: send_real_email(r, f"Academic Update: {student.full_name}", m), "recipient": email_recipient},
        {"provider": "Twilio", "method": "SMS", "func": lambda r, m: send_real_twilio_sms(r, m), "recipient": phone_recipient}
    ]
    
    final_success = False
    final_status = ""
    logs_created = []
    
    for i, stage in enumerate(stages):
        if not stage["recipient"]: continue
            
        success, result_status_or_err, provider_id, provider_res = stage["func"](stage["recipient"], message_body)
            
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
        return jsonify({"status": "Failed", "error": "All communication channels failed."}), 500"""

content = replace_func(content, "@hod_bp.route('/parent-communication/send'", "@hod_bp.route('/parent-communication/send-bulk'", send_logic)

# Preview endpoint
preview_endpoint = """
@hod_bp.route('/parent-communication/preview/<int:id>', methods=['GET'])
def preview_message(id):
    student = Student.query.get_or_404(id)
    att = student.attendance_percent or 0
    cgpa = student.cgpa or 'N/A'
    backlogs = student.backlog_count or 0
    perf = get_performance_status(att)
    remark = get_smart_remark(student, att, cgpa, backlogs)
    
    preview_text = f"Dear Parent of {student.full_name},\\n\\nThis is an academic update from UUCMS - Nrupathunga University.\\n\\nStudent Name: {student.full_name}\\nRegister Number: {student.register_no}\\nDepartment: {student.department}\\nSemester: {student.semester}\\n\\nAttendance: {att}%\\nInternal Marks Average: {cgpa}\\nBacklogs: {backlogs}\\n\\nPerformance Status: {perf}\\n\\nTeacher Remark:\\n{remark}\\n\\nPlease log in to the Parent Portal for detailed academic progress.\\n\\nRegards,\\nHOD\\nDepartment of Computer Applications\\nNrupathunga University"
    
    return jsonify({
        "preview": preview_text,
        "smart_remark": remark,
        "performance_status": perf
    })
"""
if '/parent-communication/preview' not in content:
    content += preview_endpoint


# Bulk enhancements
bulk_logic = """@hod_bp.route('/parent-communication/send-bulk', methods=['POST'])
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
            {"provider": "Twilio", "method": "WhatsApp", "func": lambda r, m: send_real_twilio_whatsapp(r, m), "recipient": phone_recipient},
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
    return jsonify({"status": "Complete", "sent": sent_count, "failed": failed_count})"""

content = replace_func(content, "@hod_bp.route('/parent-communication/send-bulk'", "@hod_bp.route('/parent-communication/meta/test'", bulk_logic)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Template backend logic applied successfully!")
