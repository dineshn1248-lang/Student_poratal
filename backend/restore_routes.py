import os

filepath = 'routes/hod_routes.py'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

missing_routes = """
@hod_bp.route('/parent-communication/logs', methods=['GET'])
def get_parent_communication_logs():
    try:
        logs = CommunicationLog.query.order_by(CommunicationLog.sent_time.desc()).limit(100).all()
        return jsonify([{
            "id": log.id,
            "student_id": log.student_id,
            "student_name": log.student.full_name if log.student else "Unknown",
            "parent_id": log.parent_id,
            "parent_name": log.parent.parent_name if log.parent else "Unknown",
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
"""

if '/parent-communication/logs' not in content:
    content += missing_routes

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Routes restored successfully.")
