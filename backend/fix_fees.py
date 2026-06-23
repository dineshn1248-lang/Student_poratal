from app import create_app
from models import Student, db

app = create_app()
with app.app_context():
    students = Student.query.all()
    for s in students:
        s.fee_status = 'Paid'
        s.fee_pending = 0.0
    
    db.session.commit()
    print(f"Successfully updated fee status to Paid for all {len(students)} students.")
