from app import create_app
from models import Student, Parent, db

app = create_app()

with app.app_context():
    # Find Lakshmi
    lakshmi = Student.query.filter_by(register_no='U24AN23S0245').first()
    if lakshmi:
        print(f"Found Lakshmi: {lakshmi.full_name}")
        lakshmi.phone = '+917349101248'
        lakshmi.parent_phone = '+917349101248'
        
        parent = Parent.query.filter_by(student_id=lakshmi.id).first()
        if parent:
            parent.phone_number = '+917349101248'
            print(f"Updated Parent phone to {parent.phone_number}")
        
        db.session.commit()
        print("Database updated successfully!")
    else:
        print("Lakshmi not found in database.")
