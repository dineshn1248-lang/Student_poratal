import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import app
from database import db
from models import Student, Parent

with app.app_context():
    students = Student.query.filter(Student.full_name.ilike('%chetan%')).all()
    for s in students:
        print(f'ID:{s.id} | Name:{s.full_name} | RegNo:{s.register_no} | Phone:{s.phone} | ParentPhone:{s.parent_phone} | ParentID:{s.parent_id}')
        parent = Parent.query.filter_by(student_id=s.id).first()
        if parent:
            print(f'  Parent: {parent.name} | Phone: {parent.phone_number} | Email: {parent.email}')
        else:
            print('  No parent linked')
