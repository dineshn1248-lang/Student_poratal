import re

with open('routes/hod_routes.py', 'r', encoding='utf-8') as f:
    content = f.read()

check_sid_route = """
@hod_bp.route('/parent-communication/check-sid/<sid>', methods=['GET'])
def check_twilio_sid(sid):
    account_sid = os.environ.get('TWILIO_ACCOUNT_SID')
    auth_token = os.environ.get('TWILIO_AUTH_TOKEN')
    
    if not account_sid or not auth_token:
        return jsonify({"error": "Twilio credentials missing"}), 500
        
    try:
        client = Client(account_sid, auth_token)
        msg = client.messages(sid).fetch()
        return jsonify({
            "sid": msg.sid,
            "status": msg.status,
            "error_code": msg.error_code,
            "error_message": msg.error_message,
            "date_updated": str(msg.date_updated)
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500
"""

if '/parent-communication/check-sid' not in content:
    content += "\n" + check_sid_route

with open('routes/hod_routes.py', 'w', encoding='utf-8') as f:
    f.write(content)
print("Added check-sid route successfully!")
