import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))

from app import create_app
from database import db
from models import CommunicationLog

app = create_app()

with app.app_context():
    log = CommunicationLog.query.order_by(CommunicationLog.id.desc()).first()
    if log:
        print(f"Log ID: {log.id}")
        print(f"Channel: {log.communication_type}")
        print(f"Status: {log.status}")
        print(f"Error Message: {log.error_message}")
        print(f"Provider Response: {log.provider_response}")
        print(f"Recipient: {log.recipient}")
    else:
        print("No logs found.")
