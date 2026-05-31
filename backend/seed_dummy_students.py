import os
import sys
from werkzeug.security import generate_password_hash

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '.')))

from app import create_app
from database import db
from models import Student, Parent

def seed_dummy_students():
    app = create_app()
    with app.app_context():
        # Start register numbers from 246 since Lakshmi is 245
        base_reg = 246
        
        first_names = ["Arun", "Bhavya", "Chetan", "Deepa", "Eshwar", "Farhan", "Gowri", "Harish", "Isha", "Karthik", "Lavanya", "Manjunath", "Nandini", "Omkar", "Pooja", "Rahul", "Sneha", "Tarun", "Varun"]
        last_names = ["Kumar", "Sharma", "Gowda", "Patil", "Reddy", "Iyer", "Rao", "Nair", "Hegde", "Bhat", "Desai", "Joshi", "Naidu", "Menon", "Verma", "Singh", "Das", "Sen", "Nath"]
        
        for i in range(19):
            first = first_names[i]
            last = last_names[i]
            full_name = f"{first} {last}"
            reg_no = f"U24AN23S0{base_reg + i}"
            username = reg_no
            email = f"{first.lower()}.{last.lower()}@nrupathunga.edu.in"
            password = f"{first}@123"
            
            # Check if student already exists
            existing_student = Student.query.filter_by(register_no=reg_no).first()
            if existing_student:
                continue

            print(f"Adding {full_name} ({reg_no})...")

            # Create Student
            import random
            cgpa = round(random.uniform(6.0, 9.5), 2)
            att_percent = random.randint(65, 98)
            backlog = random.choice([0, 0, 0, 0, 1, 2, 3]) # Bias towards 0
            fee_pending = random.choice([0, 0, 0, 5000, 10000, 23000])
            fee_status = "Paid" if fee_pending == 0 else "Pending"
            
            new_student = Student(
                student_id=username,
                full_name=full_name,
                register_no=reg_no,
                password_hash=generate_password_hash(password),
                email=email,
                phone=f"98765{random.randint(10000, 99999)}",
                semester=6,
                section="A",
                course="BCA",
                department="Computer Applications",
                attendance_percent=att_percent,
                fee_pending=fee_pending,
                fee_status=fee_status,
                backlog_count=backlog,
                cgpa=cgpa,
                academic_status="Good" if cgpa > 7.0 and backlog == 0 else "Warning"
            )
            db.session.add(new_student)
            db.session.flush()

            # Create Parent
            parent_id = f"parent_{reg_no}"
            parent_name = f"{last} (Parent)"
            new_parent = Parent(
                parent_id=parent_id,
                student_id=new_student.id,
                linked_student_id=reg_no,
                name=parent_name,
                email=f"parent.{first.lower()}@gmail.com",
                phone_number=f"99887{random.randint(10000, 99999)}",
                password_hash=generate_password_hash("Parent@123")
            )
            db.session.add(new_parent)

        db.session.commit()
        print("Successfully added 19 dummy students!")

if __name__ == "__main__":
    seed_dummy_students()
