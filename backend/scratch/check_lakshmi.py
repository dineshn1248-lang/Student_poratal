import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))

from app import create_app
from database import db
from models import Student, Attendance, Mark, Parent, Fee

app = create_app()

with app.app_context():
    lakshmi = Student.query.filter_by(register_no='U24AN23S0245').first()
    if lakshmi:
        print(f"Student: {lakshmi.full_name} | USN: {lakshmi.register_no}")
        print(f"Attendance records: {Attendance.query.filter_by(student_id=lakshmi.id).count()}")
        print(f"Marks records: {Mark.query.filter_by(student_id=lakshmi.id).count()}")
        print(f"Parent records: {Parent.query.filter_by(student_id=lakshmi.id).count()}")
        print(f"Fee records: {Fee.query.filter_by(student_id=lakshmi.id).count()}")
    else:
        print("Lakshmi not found.")
