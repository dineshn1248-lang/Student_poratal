import re
import os

filepath = 'routes/hod_routes.py'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add requests if missing
if 'import requests' not in content:
    content = content.replace('import json', 'import json\nimport requests')

# 2. Add send_real_meta_whatsapp function
meta_func = """
def send_real_meta_whatsapp(recipient, message_body):
    meta_token = os.environ.get('META_ACCESS_TOKEN')
    phone_id = os.environ.get('META_PHONE_NUMBER_ID')
    
    if not meta_token or not phone_id:
        return False, "Meta API credentials missing in .env", None, None
        
    url = f"https://graph.facebook.com/v19.0/{phone_id}/messages"
    headers = {
        "Authorization": f"Bearer {meta_token}",
        "Content-Type": "application/json"
    }
    
    # Strip non-digits from recipient but keep the +, Meta expects pure country code + number without 'whatsapp:' prefix
    raw_number = ''.join(c for c in recipient if c.isdigit() or c == '+')
    if raw_number.startswith('+'):
        raw_number = raw_number[1:] # Meta Graph API usually expects the number without the +
        
    payload = {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": raw_number,
        "type": "text",
        "text": {
            "preview_url": False,
            "body": message_body
        }
    }
    
    try:
        response = requests.post(url, headers=headers, json=payload)
        res_data = response.json()
        
        if response.status_code in [200, 201]:
            # Meta returns a messages array
            msg_id = res_data.get('messages', [{}])[0].get('id')
            return True, "Queued", msg_id, json.dumps(res_data)
        else:
            err = res_data.get('error', {}).get('message', 'Unknown Meta Error')
            return False, f"Meta API Error: {err}", None, json.dumps(res_data)
    except Exception as e:
        return False, f"Exception: {str(e)}", None, None
"""
if 'def send_real_meta_whatsapp' not in content:
    # insert before send_parent_communication
    content = content.replace("@hod_bp.route('/parent-communication/send'", meta_func + "\n@hod_bp.route('/parent-communication/send'")


# 3. Add meta-test endpoint
meta_test_endpoint = """
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
"""
if '/parent-communication/meta/test' not in content:
    content = content + "\n" + meta_test_endpoint


# 4. Patch send route
old_send_logic = """
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
"""

new_send_logic = """
    actual_provider = 'Twilio'
    if method == 'WhatsApp': # defaults to Twilio
        success, result_status_or_err, provider_id, provider_res = send_real_twilio_whatsapp(recipient, message_body)
    elif method == 'Meta WhatsApp':
        actual_provider = 'Meta'
        success, result_status_or_err, provider_id, provider_res = send_real_meta_whatsapp(recipient, message_body)
    elif method == 'SMS':
        success, result_status_or_err, provider_id, provider_res = send_real_twilio_sms(recipient, message_body)
    elif method == 'Email':
        actual_provider = 'SMTP'
        success, result_status_or_err, provider_id, provider_res = send_real_email(recipient, f"Academic Update: {student.full_name}", message_body)
    else:
        return jsonify({"error": "Invalid method", "status": "Failed"}), 400
        
    status = result_status_or_err if success else 'Failed'
    
    new_log = CommunicationLog(
        student_id=student.id,
        parent_id=parent.id if parent else None,
        communication_type='WhatsApp' if 'WhatsApp' in method else method,
        provider=actual_provider,
        recipient=recipient,
        message=message_body,
        status=status,
        provider_id=provider_id,
        provider_response=provider_res,
        error_message=result_status_or_err if not success else None
    )
"""
content = content.replace(old_send_logic, new_send_logic)


# 5. Patch send-bulk route
old_bulk_logic = """
        if method == 'WhatsApp':
            success, result_status_or_err, provider_id, provider_res = send_real_twilio_whatsapp(recipient, message_body)
        elif method == 'SMS':
            success, result_status_or_err, provider_id, provider_res = send_real_twilio_sms(recipient, message_body)
        else:
            success, result_status_or_err, provider_id, provider_res = send_real_email(recipient, f"Academic Update: {student.full_name}", message_body)
            
        status = result_status_or_err if success else 'Failed'
        
        log = CommunicationLog(
            student_id=student.id, parent_id=parent.id if parent else None,
            communication_type=method, recipient=recipient, message=message_body,
            status=status, provider_id=provider_id, provider_response=provider_res,
            error_message=result_status_or_err if not success else None
        )
"""

new_bulk_logic = """
        actual_provider = 'Twilio'
        if method == 'WhatsApp':
            success, result_status_or_err, provider_id, provider_res = send_real_twilio_whatsapp(recipient, message_body)
        elif method == 'Meta WhatsApp':
            actual_provider = 'Meta'
            success, result_status_or_err, provider_id, provider_res = send_real_meta_whatsapp(recipient, message_body)
        elif method == 'SMS':
            success, result_status_or_err, provider_id, provider_res = send_real_twilio_sms(recipient, message_body)
        else:
            actual_provider = 'SMTP'
            success, result_status_or_err, provider_id, provider_res = send_real_email(recipient, f"Academic Update: {student.full_name}", message_body)
            
        status = result_status_or_err if success else 'Failed'
        
        log = CommunicationLog(
            student_id=student.id, parent_id=parent.id if parent else None,
            communication_type='WhatsApp' if 'WhatsApp' in method else method, 
            provider=actual_provider,
            recipient=recipient, message=message_body,
            status=status, provider_id=provider_id, provider_response=provider_res,
            error_message=result_status_or_err if not success else None
        )
"""
content = content.replace(old_bulk_logic, new_bulk_logic)
content = content.replace("if method not in ['WhatsApp', 'SMS', 'Email']:", "if method not in ['WhatsApp', 'Meta WhatsApp', 'SMS', 'Email']:")


with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Patched hod_routes.py successfully!")
