import os
import sys

# Add current directory to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '.')))

from app import create_app
from database import db
from models import Student, Fee

def update_fees():
    app = create_app()
    with app.app_context():
        student = Student.query.filter_by(register_no="U24AN23S0245").first()
        if student:
            # Update student record
            student.total_fee = 23000.0
            student.pending_fee = 0.0
            student.fee_pending = 0.0
            
            # Update fee record
            fee = Fee.query.filter_by(student_id=student.id).first()
            if fee:
                fee.total_amount = 23000.0
                fee.total_fee = 23000.0
                fee.pending_amount = 0.0
                fee.paid_amount = 23000.0
            
            db.session.commit()
            print("Successfully updated BCA fees to 23K (23000) for Lakshmi.")
        else:
            print("Student not found.")

if __name__ == "__main__":
    update_fees()
