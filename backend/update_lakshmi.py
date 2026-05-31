from app import create_app
from models import db, Student, Parent

app = create_app()

with app.app_context():
    lakshmi = Student.query.filter_by(full_name='Lakshmi', department='BCA').first()
    if lakshmi:
        lakshmi.full_name = "Lakshmi Nasimappa Chakarasli"
        
        # update parent too
        parent = Parent.query.filter_by(student_id=lakshmi.id).first()
        if parent:
            parent.name = "Lakshmi Nasimappa Chakarasli's Parent"
            
        db.session.commit()
        print("Updated Lakshmi's full name.")
    else:
        print("Lakshmi not found.")
