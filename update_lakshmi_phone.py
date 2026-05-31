import sys
import os

# Ensure we can import from backend
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))

from backend.app import create_app
from backend.models import Student, Parent, db

app = create_app()

with app.app_context():
    # Find Lakshmi
    lakshmi = Student.query.filter_by(register_no='U24AN23S0245').first()
    if lakshmi:
        print(f"Found Lakshmi: {lakshmi.full_name}")
        # Update student phone (just in case)
        lakshmi.phone = '+917349101248'
        lakshmi.parent_phone = '+917349101248'
        
        # Update parent record
        parent = Parent.query.filter_by(student_id=lakshmi.id).first()
        if parent:
            parent.phone_number = '+917349101248'
            print(f"Updated Parent phone to {parent.phone_number}")
        
        db.session.commit()
        print("Database updated successfully!")
    else:
        print("Lakshmi not found in database.")
