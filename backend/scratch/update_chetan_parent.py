import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))

from app import create_app
from database import db
from models import Student, Parent

app = create_app()

with app.app_context():
    # Find Chetan Gowda
    students = Student.query.filter(Student.full_name.ilike('%chetan%')).all()
    print(f"Found {len(students)} student(s) matching 'chetan'")
    for s in students:
        print(f'ID:{s.id} | Name:{s.full_name} | RegNo:{s.register_no} | Phone:{s.phone} | ParentPhone:{s.parent_phone} | ParentID:{s.parent_id}')
        parent = Parent.query.filter_by(student_id=s.id).first()
        if parent:
            print(f'  Parent: {parent.name} | Phone: {parent.phone_number} | Email: {parent.email}')
        else:
            print('  No parent linked')

    # Update parent phone number
    for s in students:
        # Update parent_phone on student record
        s.parent_phone = '7349101248'
        db.session.commit()
        print(f"Updated parent_phone on student {s.full_name} to 7349101248")

        # Also update Parent table if exists
        parent = Parent.query.filter_by(student_id=s.id).first()
        if parent:
            parent.phone_number = '7349101248'
            db.session.commit()
            print(f"Updated Parent table phone_number to 7349101248")
    
    print("Done!")
