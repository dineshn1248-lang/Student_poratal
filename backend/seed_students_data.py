import random
from app import create_app
from database import db
from models import Student, Parent

app = create_app()

with app.app_context():
    students = Student.query.all()
    
    for s in students:
        # Give them a random CGPA between 5.5 and 9.5 if they don't have one
        if not s.cgpa or s.cgpa == 0.0:
            s.cgpa = round(random.uniform(5.5, 9.5), 2)
            
        # Give them a parent record if they don't have one
        parent = Parent.query.filter_by(student_id=s.id).first()
        if not parent:
            # Generate a realistic sounding parent name based on student name if possible
            last_name = s.full_name.split()[-1] if ' ' in s.full_name else 'Kumar'
            parent_name = f"{random.choice(['Mr.', 'Mrs.'])} {random.choice(['Ravi', 'Suresh', 'Anita', 'Sunita', 'Rajesh', 'Priya'])} {last_name}"
            
            # Generate random phone
            phone = f"98{random.randint(10000000, 99999999)}"
            email = f"parent.{s.register_no.lower()}@gmail.com"
            
            parent = Parent(
                student_id=s.id,
                name=parent_name,
                phone_number=phone,
                email=email,
                linked_student_id=s.register_no
            )
            db.session.add(parent)
            
            # Update student model with parent phone just in case it's used
            s.parent_phone = phone
            
    db.session.commit()
    print("Successfully seeded parent data and CGPAs for all students!")
