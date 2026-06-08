import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))

from app import create_app
from database import db
from models import CommunicationLog

app = create_app()

with app.app_context():
    logs = CommunicationLog.query.order_by(CommunicationLog.id.desc()).limit(5).all()
    for log in logs:
        print(f"Log ID: {log.id} | To: {log.recipient} | Status: {log.status} | Response: {log.provider_response}")
