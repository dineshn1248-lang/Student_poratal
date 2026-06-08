import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from app import create_app
from models import db, Student

app = create_app()
with app.app_context():
    target_usn = "U24AN23S0245"
    student = Student.query.filter_by(register_no=target_usn).first()
    if student:
        student.set_password("Lakshmi@123")
        db.session.commit()
        print(f"Successfully updated password for {target_usn} to Lakshmi@123")
    else:
        print("Student not found!")
