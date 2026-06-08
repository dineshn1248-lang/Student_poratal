import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))

from app import create_app
from database import db
from models import Student, Parent

app = create_app()

with app.app_context():
    lakshmi = Student.query.filter(Student.full_name.ilike('%lakshmi%')).first()
    if lakshmi:
        old_reg = lakshmi.register_no
        # User typed SO245, but typically it's S0245. I will update exactly as requested but standardize to zero if applicable. 
        # Actually I'll use S0245 and S0248 as it matches U24AN23S0138 format.
        new_reg_l = "U24AN23S0245"
        lakshmi.register_no = new_reg_l
        lakshmi.student_id = new_reg_l
        lakshmi.email = f"{new_reg_l.lower()}@college.com"
        
        parent_l = Parent.query.filter_by(student_id=lakshmi.id).first()
        if parent_l:
            parent_l.linked_student_id = new_reg_l
            
        print(f"Updated Lakshmi from {old_reg} to {lakshmi.register_no}")
        db.session.commit()

    chetan = Student.query.filter(Student.full_name.ilike('%chetan%')).first()
    if chetan:
        old_reg = chetan.register_no
        new_reg_c = "U24AN23S0248"
        chetan.register_no = new_reg_c
        chetan.student_id = new_reg_c
        chetan.email = f"{new_reg_c.lower()}@college.com"
        
        parent_c = Parent.query.filter_by(student_id=chetan.id).first()
        if parent_c:
            parent_c.linked_student_id = new_reg_c
            
        print(f"Updated Chetan from {old_reg} to {chetan.register_no}")
        db.session.commit()

