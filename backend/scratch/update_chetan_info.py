import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))

from app import create_app
from database import db
from models import Student, Parent

app = create_app()

with app.app_context():
    # Find Chetan Gowda
    students = Student.query.filter(Student.full_name.ilike('%chetan%gowda%')).all()
    if not students:
        # Fallback to just chetan if not found
        students = Student.query.filter(Student.full_name.ilike('%chetan%')).all()

    for s in students:
        old_name = s.full_name
        s.full_name = 'Chetan kumar .K'
        s.parent_phone = '+917619589291'
        db.session.commit()
        
        parent = Parent.query.filter_by(student_id=s.id).first()
        if parent:
            parent.phone_number = '+917619589291'
            db.session.commit()
            print(f"Updated {old_name} -> {s.full_name}, Phone: {s.parent_phone}")
        else:
            print(f"Updated {old_name} -> {s.full_name}, Phone: {s.parent_phone} (No parent record)")
