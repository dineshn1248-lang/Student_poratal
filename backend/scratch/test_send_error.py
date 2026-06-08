import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))

from app import create_app
from database import db
from models import Student, Parent
import json

app = create_app()

with app.app_context():
    student = Student.query.first()
    payload = {
        "student_id": student.id,
        "custom_remark": "Test",
        "custom_message": "Test Message",
        "channel": "WhatsApp"
    }

with app.test_client() as client:
    response = client.post('/api/hod/parent-communication/send', json=payload)
    print(response.status_code)
    print(response.data.decode('utf-8'))
