import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '.')))

from app import create_app
from models import db
from sqlalchemy import text

app = create_app()

def clean_orphans():
    with app.app_context():
        # Delete from marks
        db.session.execute(text("DELETE FROM marks WHERE student_id NOT IN (SELECT id FROM students)"))
        
        # Delete from attendance
        db.session.execute(text("DELETE FROM attendance WHERE student_id NOT IN (SELECT id FROM students)"))
        
        # Delete from communication_logs
        db.session.execute(text("DELETE FROM communication_logs WHERE student_id NOT IN (SELECT id FROM students)"))
        
        # Delete from exam_registrations
        db.session.execute(text("DELETE FROM exam_registrations WHERE student_id NOT IN (SELECT id FROM students)"))
        
        db.session.commit()
        print("Successfully cleaned up orphaned records.")

if __name__ == "__main__":
    clean_orphans()
