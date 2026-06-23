import os
import sys
import random

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '.')))

from app import create_app
from models import Student, Mark, db

app = create_app()

def delete_students():
    with app.app_context():
        # Exclude 'Lakshmi Nisimappa Chakrasali', 'Chethan Kumar K', and any FAILED students
        passed_students = Student.query.filter(
            Student.result_status == 'PASS',
            Student.full_name != 'Lakshmi Nisimappa Chakrasali',
            Student.full_name != 'Chethan Kumar K'
        ).all()
        
        # We need to delete exactly 20 students.
        print(f"Total passed candidates available to delete: {len(passed_students)}")
        
        if len(passed_students) >= 20:
            to_delete = random.sample(passed_students, 20)
            
            from sqlalchemy import text
            db.session.execute(text("PRAGMA foreign_keys=OFF;"))
            for student in to_delete:
                db.session.execute(text(f"DELETE FROM students WHERE id = {student.id}"))
            db.session.commit()
            db.session.execute(text("PRAGMA foreign_keys=ON;"))
            print(f"Deleted {len(to_delete)} students successfully.")
        else:
            print("Not enough passed students to delete 20.")

if __name__ == "__main__":
    delete_students()
