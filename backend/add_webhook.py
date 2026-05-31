import re

with open('routes/hod_routes.py', 'r', encoding='utf-8') as f:
    content = f.read()

webhook_route = """
@hod_bp.route('/parent-communication/webhook', methods=['POST'])
def twilio_webhook():
    # Twilio sends form-urlencoded data to webhooks
    data = request.form
    message_sid = data.get('MessageSid')
    message_status = data.get('MessageStatus')
    error_code = data.get('ErrorCode')
    error_message = data.get('ErrorMessage')
    
    if message_sid:
        log = CommunicationLog.query.filter_by(provider_id=message_sid).first()
        if log:
            log.status = message_status.capitalize() if message_status else 'Unknown'
            if error_message:
                log.error_message = error_message
                log.status = 'Failed'
            elif message_status in ['failed', 'undelivered']:
                log.status = 'Failed'
            
            # Update the provider response JSON
            import json
            try:
                existing_res = json.loads(log.provider_response) if log.provider_response else {}
            except:
                existing_res = {}
            
            existing_res['webhook_status'] = message_status
            existing_res['webhook_error_code'] = error_code
            existing_res['webhook_error_message'] = error_message
            log.provider_response = json.dumps(existing_res)
            
            db.session.commit()
            
    return '', 200
"""

# Append the webhook route just before the end of the file or after refresh-status
if '/parent-communication/webhook' not in content:
    content += "\n" + webhook_route

with open('routes/hod_routes.py', 'w', encoding='utf-8') as f:
    f.write(content)
print("Added Webhook successfully!")
