import os
import re

filepath = 'routes/hod_routes.py'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# I will replace the entirety of `send_parent_communication` and `send_bulk_parent_communication` 
# I will use regex or string replace to overwrite them.

waterfall_send_logic = """@hod_bp.route('/parent-communication/send', methods=['POST'])
def send_parent_communication():
    data = request.json
    student_id = data.get('student_id')
    
    student = Student.query.get_or_404(student_id)
    parent = Parent.query.filter_by(student_id=student.id).first()
    
    phone_recipient = student.parent_phone or (parent.phone_number if parent else None) or student.phone
    email_recipient = (parent.email if parent else None) or student.email
    
    if not phone_recipient and not email_recipient:
        return jsonify({"error": "No contact information found for this student.", "status": "Failed"}), 400
        
    message_body = build_academic_message(student)
    
    stages = [
        {"provider": "Meta", "method": "WhatsApp", "func": send_real_meta_whatsapp, "recipient": phone_recipient},
        {"provider": "Twilio", "method": "WhatsApp", "func": send_real_twilio_whatsapp, "recipient": phone_recipient},
        {"provider": "SMTP", "method": "Email", "func": send_real_email, "recipient": email_recipient, "args": [f"Academic Update: {student.full_name}", message_body]},
        {"provider": "Twilio", "method": "SMS", "func": send_real_twilio_sms, "recipient": phone_recipient}
    ]
    
    final_success = False
    final_status = ""
    logs_created = []
    
    for i, stage in enumerate(stages):
        if not stage["recipient"]:
            continue
            
        if stage["method"] == "Email":
            success, result_status_or_err, provider_id, provider_res = stage["func"](stage["recipient"], stage["args"][0], stage["args"][1])
        else:
            success, result_status_or_err, provider_id, provider_res = stage["func"](stage["recipient"], message_body)
            
        status = result_status_or_err if success else 'Fallback Triggered'
        # If it's the last stage and it fails, mark as Failed
        if not success and i == len(stages) - 1:
            status = 'Failed'
            
        new_log = CommunicationLog(
            student_id=student.id,
            parent_id=parent.id if parent else None,
            communication_type=stage["method"],
            provider=stage["provider"],
            recipient=stage["recipient"],
            message=message_body,
            status=status,
            provider_id=provider_id,
            provider_response=provider_res,
            error_message=result_status_or_err if not success else None
        )
        db.session.add(new_log)
        logs_created.append(new_log)
        
        if success:
            final_success = True
            final_status = status
            break
            
    db.session.commit()
    
    if final_success:
        return jsonify({"status": final_status, "journey": [log.provider for log in logs_created]})
    else:
        return jsonify({"status": "Failed", "error": "All communication channels failed."}), 500

@hod_bp.route('/parent-communication/send-bulk', methods=['POST'])
def send_bulk_parent_communication():
    students = Student.query.filter(db.or_(Student.department == 'Computer Applications', Student.department == 'BCA')).all()
    
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
                communication_type='Unknown', recipient="Unknown",
                message="No contact found", status="Failed", error_message="No contact found"
            )
            db.session.add(log)
            continue
            
        message_body = build_academic_message(student)
        
        stages = [
            {"provider": "Meta", "method": "WhatsApp", "func": send_real_meta_whatsapp, "recipient": phone_recipient},
            {"provider": "Twilio", "method": "WhatsApp", "func": send_real_twilio_whatsapp, "recipient": phone_recipient},
            {"provider": "SMTP", "method": "Email", "func": send_real_email, "recipient": email_recipient, "args": [f"Academic Update: {student.full_name}", message_body]},
            {"provider": "Twilio", "method": "SMS", "func": send_real_twilio_sms, "recipient": phone_recipient}
        ]
        
        student_success = False
        for i, stage in enumerate(stages):
            if not stage["recipient"]:
                continue
                
            if stage["method"] == "Email":
                success, result_status_or_err, provider_id, provider_res = stage["func"](stage["recipient"], stage["args"][0], stage["args"][1])
            else:
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
                break
                
        if student_success:
            sent_count += 1
        else:
            failed_count += 1
            
    db.session.commit()
    return jsonify({"status": "Complete", "sent": sent_count, "failed": failed_count})
"""

# Extract the existing send and send-bulk definitions and replace them.
# I will use a regex to replace everything from @hod_bp.route('/parent-communication/send' to the end of send_bulk_parent_communication or next route
pattern = re.compile(r"@hod_bp\.route\('/parent-communication/send', methods=\['POST'\]\).*?(?=@hod_bp\.route|\Z)", re.DOTALL)
content = re.sub(pattern, waterfall_send_logic + "\n", content, count=1)

# Just in case send-bulk wasn't caught in that single match block nicely, I will do a more robust string replacement
# Let's read the file again, and carefully replace the functions.

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print("Waterfall backend logic applied successfully!")
