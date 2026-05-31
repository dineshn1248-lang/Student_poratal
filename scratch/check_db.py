import sys
import os
sys.path.append(os.path.join(os.getcwd(), 'backend'))

from app import create_app
from database import db
from models import Student, Mark

app = create_app()

with app.app_context():
    students = Student.query.all()
    print(f"Total Students: {len(students)}")
    for s in students:
        print(f"ID: {s.id}, Name: {s.full_name}, Register: {s.register_no}")
        marks = Mark.query.filter_by(student_id=s.id).all()
        print(f"  Marks Count: {len(marks)}")
        for m in marks:
            if m.subject is None:
                print(f"    ERROR: Mark ID {m.id} has NO subject!")
            else:
                print(f"    Mark ID {m.id}: Subject {m.subject.subject_code}")
