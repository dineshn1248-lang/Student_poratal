from app import create_app
from models import Student, Parent, db

app = create_app()

with app.app_context():
    lakshmi = Student.query.filter_by(register_no='U24AN23S0245').first()
    if lakshmi:
        lakshmi.phone = '+919380179909'
        lakshmi.parent_phone = '+919380179909'
        
        parent = Parent.query.filter_by(student_id=lakshmi.id).first()
        if parent:
            parent.phone_number = '+919380179909'
            
        db.session.commit()
        print("Restored Lakshmi's phone number to +919380179909 in the database.")
