import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))

from app import create_app
from database import db
from models import Student, Parent

app = create_app()

with app.app_context():
    # Find Lakshmi
    students = Student.query.filter(Student.full_name.ilike('%lakshmi%')).all()
    if not students:
        print("No student found with name 'lakshmi'")
    
    for s in students:
        s.parent_phone = '+919380179909'
        db.session.commit()
        
        parent = Parent.query.filter_by(student_id=s.id).first()
        if parent:
            parent.phone_number = '+919380179909'
            db.session.commit()
            print(f"Updated parent phone for student: {s.full_name} ({s.register_no})")
        else:
            print(f"Updated parent_phone for student {s.full_name}, but no linked Parent record found.")
