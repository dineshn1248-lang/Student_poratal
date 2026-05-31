import re

with open('routes/hod_routes.py', 'r', encoding='utf-8') as f:
    content = f.read()

test_email_route = """
@hod_bp.route('/parent-communication/test-email', methods=['POST'])
def test_email_diagnostic():
    recipient = "test@example.com" # Default test email, ideally this should be configurable
    data = request.json
    if data and data.get('recipient'):
        recipient = data.get('recipient')
        
    message_body = "TEST MESSAGE from UUCMS Nrupathunga University Parent Portal Email Diagnostics."
    
    smtp_email = os.environ.get('SMTP_EMAIL')
    smtp_password = os.environ.get('SMTP_PASSWORD')
    smtp_server = os.environ.get('SMTP_SERVER', 'smtp.gmail.com')
    smtp_port = int(os.environ.get('SMTP_PORT', 587))
    
    if not smtp_email or not smtp_password:
        return jsonify({"status": "Failed", "error": "SMTP credentials missing in .env"}), 500
        
    try:
        msg = MIMEMultipart()
        msg['From'] = smtp_email
        msg['To'] = recipient
        msg['Subject'] = "Diagnostic Test: Parent Portal"
        msg.attach(MIMEText(message_body, 'plain'))
        
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(smtp_email, smtp_password)
        server.send_message(msg)
        server.quit()
        
        raw_response = {
            "server": smtp_server,
            "port": smtp_port,
            "sender": smtp_email,
            "recipient": recipient,
            "status": "250 OK (Message Accepted by SMTP Server)"
        }
        
        return jsonify({"status": "Diagnostic Complete", "raw_response": raw_response})
    except Exception as e:
        return jsonify({"status": "Exception Thrown", "error": str(e)}), 500
"""

if '/parent-communication/test-email' not in content:
    content += "\n" + test_email_route

with open('routes/hod_routes.py', 'w', encoding='utf-8') as f:
    f.write(content)
print("Added Test Email route successfully!")
