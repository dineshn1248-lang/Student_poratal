import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))

from app import create_app
from database import db
from models import Student, Parent

app = create_app()

with app.app_context():
    lakshmi = Student.query.filter(Student.register_no == 'U24AN23S0245').first()
    if lakshmi:
        lakshmi.phone = "+919380179909"
        lakshmi.parent_phone = "+919380179909"
        parent_l = Parent.query.filter_by(student_id=lakshmi.id).first()
        if parent_l:
            parent_l.phone_number = "+919380179909"
        db.session.commit()
        print("Updated Lakshmi's phone.")

    chetan = Student.query.filter(Student.register_no == 'U24AN23S0248').first()
    if chetan:
        chetan.phone = "+917349101248"
        chetan.parent_phone = "+917349101248"
        parent_c = Parent.query.filter_by(student_id=chetan.id).first()
        if parent_c:
            parent_c.phone_number = "+917349101248"
        db.session.commit()
        print("Updated Chetan's phone.")
