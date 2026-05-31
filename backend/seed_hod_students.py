from app import create_app
from database import db
from models import Student
import random

def seed_students():
    app = create_app()
    with app.app_context():
        # Clear existing Computer Applications students to avoid duplication in this context
        # Actually, let's just add them if they don't exist
        
        names = [
            "Rahul Kumar", "Sneha R", "Ajay Prakash", "Priya Sharma", "Kiran Patil",
            "Deepa Nair", "Arjun M", "Lokesh K", "Pooja S", "Nithin R",
            "Suresh Raina", "Megha Shetty", "Vikram Singh", "Anjali Rao", "Karthik G",
            "Rashmi Desai", "Manjunath B", "Shwetha P", "Varun Teja", "Sahana M"
        ]
        
        department = "Computer Applications"
        semesters = [4, 6] # Matching image's IV Sem and VI Sem
        sections = ["A", "B"]
        statuses = ["Active", "Active", "Active", "Warning", "Detained"]
        fee_statuses = ["Paid", "Partial", "Pending"]

        print(f"Seeding {len(names)} students for {department}...")

        for i, name in enumerate(names):
            reg_no = f"CA23B{101 + i}"
            
            # Check if student already exists
            existing = Student.query.filter_by(register_no=reg_no).first()
            if existing:
                existing.full_name = name
                existing.department = department
                existing.semester = 4 if i < 5 else 6 # Matching image logic
                existing.section = "A" if i % 2 == 0 else "B"
                existing.attendance_percent = [92, 85, 62, 91, 78, 58, 88, 73, 95, 81][i % 10]
                existing.backlog_count = [0, 1, 2, 0, 1, 3, 0, 2, 0, 1][i % 10]
                existing.academic_status = ["Active", "Active", "Warning", "Active", "Active", "Detained", "Active", "Warning", "Active", "Active"][i % 10]
                existing.fee_status = ["Paid", "Partial", "Pending", "Paid", "Partial", "Pending", "Paid", "Partial", "Paid", "Pending"][i % 10]
                existing.fee_pending = 0 if existing.fee_status == "Paid" else (5000 if existing.fee_status == "Partial" else 15000)
                continue

            student = Student(
                register_no=reg_no,
                full_name=name,
                department=department,
                semester=4 if i < 5 else 6,
                section="A" if i % 2 == 0 else "B",
                attendance_percent=[92, 85, 62, 91, 78, 58, 88, 73, 95, 81][i % 10],
                backlog_count=[0, 1, 2, 0, 1, 3, 0, 2, 0, 1][i % 10],
                academic_status=["Active", "Active", "Warning", "Active", "Active", "Detained", "Active", "Warning", "Active", "Active"][i % 10],
                fee_status=["Paid", "Partial", "Pending", "Paid", "Partial", "Pending", "Paid", "Partial", "Paid", "Pending"][i % 10],
                fee_pending=0,
                email=f"{name.lower().replace(' ', '.')}@example.com",
                phone=f"98765{random.randint(10000, 99999)}"
            )
            student.fee_pending = 0 if student.fee_status == "Paid" else (5000 if student.fee_status == "Partial" else 15000)
            
            # Set fee status based on pending amount
            if student.fee_pending == 0:
                student.fee_status = "Paid"
            elif student.fee_pending < 10000:
                student.fee_status = "Partial"
            else:
                student.fee_status = "Pending"

            student.set_password("student123")
            db.session.add(student)

        db.session.commit()
        print("Seeding completed successfully!")

if __name__ == "__main__":
    seed_students()
