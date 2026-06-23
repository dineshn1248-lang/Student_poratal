from app import app, db
from models import CommunicationLog

with app.app_context():
    logs = CommunicationLog.query.order_by(CommunicationLog.id.desc()).limit(5).all()
    if not logs:
        print("No logs found.")
    for c in logs:
        print(f"ID: {c.id}, Method: {c.communication_type}, Status: {c.status}, Error: {c.error_message}")
