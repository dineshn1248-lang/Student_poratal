import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))

from app import create_app
from database import db
from models import Student, Parent

app = create_app()

with app.app_context():
    # Find Chetan Gowda
    students = Student.query.filter(Student.full_name.ilike('%chetan%')).all()
    for s in students:
        s.parent_phone = '+917349101248'
        db.session.commit()
        
        parent = Parent.query.filter_by(student_id=s.id).first()
        if parent:
            parent.phone_number = '+917349101248'
            db.session.commit()
            
    print("Phone number successfully updated to +917349101248!")
