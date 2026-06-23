import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '.')))

from app import create_app
from models import db, Student, ExamRegistration
import random

app = create_app()

def add_hall_tickets():
    with app.app_context():
        # Find eligible students in semesters 1-5
        eligible_students = Student.query.filter(Student.attendance_percent >= 75, Student.semester != 6).all()
        
        count = 0
        for student in eligible_students:
            # Check if registration exists
            reg = ExamRegistration.query.filter_by(student_id=student.id).first()
            if not reg:
                reg = ExamRegistration(
                    student_id=student.id,
                    semester=student.semester,
                    exam_type='Regular',
                    registration_status='Registered',
                    hall_ticket_status='Generated',
                    eligibility_status='Eligible',
                    approval_status='Approved'
                )
                db.session.add(reg)
            else:
                reg.hall_ticket_status = 'Generated'
            count += 1
            
        db.session.commit()
        print(f"Generated hall tickets for {count} students.")

if __name__ == "__main__":
    add_hall_tickets()
