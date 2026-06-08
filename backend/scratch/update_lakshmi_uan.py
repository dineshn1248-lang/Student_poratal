import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from app import create_app
from models import db, Student, Parent

app = create_app()
with app.app_context():
    old_usn = "U24AN23S0017"
    new_usn = "U24AN23SO245"
    
    student = Student.query.filter_by(register_no=old_usn).first()
    if student:
        student.register_no = new_usn
        student.student_id = new_usn
        
        parent = Parent.query.filter_by(student_id=student.id).first()
        if parent:
            parent.linked_student_id = new_usn
            parent.parent_id = f"parent_{new_usn}"
            parent.token = f"parent-token-{new_usn}"
        
        db.session.commit()
        print(f"Successfully updated UAN from {old_usn} to {new_usn}")
    else:
        print("Student not found!")
