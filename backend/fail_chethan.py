import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '.')))

from app import create_app
from models import Student, Mark, db

app = create_app()

def fail_chethan():
    with app.app_context():
        # Find Chethan Kumar K
        chethan = Student.query.filter_by(full_name='Chetan kumar .K').first()
        if not chethan:
            print("Student not found.")
            return

        print(f"Found student: {chethan.full_name}")

        # Find one subject to fail, let's pick the first subject
        mark_to_fail = Mark.query.filter_by(student_id=chethan.id).first()
        if mark_to_fail:
            print(f"Failing subject ID: {mark_to_fail.subject_id}")
            mark_to_fail.internal_marks = 15
            mark_to_fail.external_marks = 15
            mark_to_fail.marks_obtained = 30
            mark_to_fail.grade = 'F'
            
            # Update student overall status
            chethan.result_status = 'FAILED'
            chethan.backlog_count = 1
            
            db.session.commit()
            print("Successfully updated Chethan Kumar to have 1 failed subject.")
        else:
            print("No marks found for Chethan.")

if __name__ == "__main__":
    fail_chethan()
