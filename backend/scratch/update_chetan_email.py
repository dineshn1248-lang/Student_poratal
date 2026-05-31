import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))

from app import create_app
from database import db
from models import Student, Parent

app = create_app()

with app.app_context():
    s = Student.query.filter(Student.full_name.ilike('%chetan%')).first()
    if s:
        parent = Parent.query.filter_by(student_id=s.id).first()
        if parent:
            parent.email = 'dineshh1248@gmail.com'
            db.session.commit()
            print(f"Updated Parent email to dineshh1248@gmail.com for {s.full_name}")
        else:
            print("No parent record found")
    else:
        print("Chetan Gowda not found")
