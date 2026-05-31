from app import create_app
from models import Student, Parent, db

app = create_app()

with app.app_context():
    students = Student.query.all()
    for s in students:
        s.phone = '+917349101248'
        s.parent_phone = '+917349101248'
        
    parents = Parent.query.all()
    for p in parents:
        p.phone_number = '+917349101248'
        
    db.session.commit()
    print(f"Updated {len(students)} students and {len(parents)} parents to use +917349101248")
