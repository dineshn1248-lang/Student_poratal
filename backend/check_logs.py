from app import create_app
from models import CommunicationLog, Student, db

app = create_app()
with app.app_context():
    logs = CommunicationLog.query.order_by(CommunicationLog.id.desc()).limit(5).all()
    print("Latest 5 Communication Logs:")
    for log in logs:
        student = Student.query.get(log.student_id)
        name = student.full_name if student else "Unknown"
        print(f"To: {name} ({log.recipient}) | Method: {log.method} | Status: {log.status} | Error: {log.error_message}")
