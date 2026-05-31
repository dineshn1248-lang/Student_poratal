import os
import sys
import random
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash

# Add the current directory to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '.')))

from app import app
from database import db
from models import Student, Parent, Fee, Attendance, Mark, Subject, Staff, Department, ExamRegistration

def seed_data():
    with app.app_context():
        print("Cleaning old student data...")
        # Delete dependent records first
        Attendance.query.delete()
        Mark.query.delete()
        Fee.query.delete()
        Parent.query.delete()
        ExamRegistration.query.delete()
        Student.query.delete()
        db.session.commit()

        departments = ["BCA", "MCA", "BBA", "BCS"]
        academic_statuses = ["Regular", "Backlog", "Detained"]
        fee_statuses = ["Paid", "Pending", "Partial"]
        result_statuses = ["Pass", "Fail", "Revaluation"]
        sections = ["A", "B"]

        # Ensure we have subjects for each department
        subjects = Subject.query.all()
        if not subjects:
            print("No subjects found. Please run init_db.py first or add subjects.")
            return

        print("Seeding 20 realistic students...")
        
        names = [
            "Arjun Reddy", "Priya Sharma", "Rahul Verma", "Sneha Kapoor", 
            "Vikram Singh", "Ananya Iyer", "Karthik Raja", "Deepa Nair",
            "Siddharth Rao", "Meghana Bhat", "Rohan Das", "Pooja Hegde",
            "Manjunath K", "Sushma Swamy", "Varun Teja", "Keerthi Suresh",
            "Abhishek G", "Nandini M", "Yashwanth S", "Bhavana R"
        ]

        for i in range(20):
            dept = random.choice(departments)
            status = random.choice(academic_statuses)
            # Weighted random for fee status
            f_status = random.choices(["Paid", "Pending", "Partial"], weights=[70, 15, 15])[0]
            
            usn = f"21{dept}{str(1001 + i)[-3:]}"
            name = names[i]
            
            student = Student(
                register_no=usn,
                name=name,
                password_hash=generate_password_hash("password123"),
                phone_number=f"98765{random.randint(10000, 99999)}",
                email=f"{name.lower().replace(' ', '.')}@example.com",
                department=dept,
                section=random.choice(sections),
                attendance_percentage=random.randint(45, 95),
                academic_status=status,
                current_semester=random.randint(1, 6),
                batch_year="2021-2024"
            )
            db.session.add(student)
            db.session.flush() # Get student.id

            # Create Fee record
            total_fee = 45000.00 if dept in ["BCA", "MCA"] else 35000.00
            paid_amt = total_fee if f_status == "Paid" else (total_fee / 2 if f_status == "Partial" else 0)
            
            fee = Fee(
                student_id=student.id,
                fee_category="Academic",
                total_amount=total_fee,
                paid_amount=paid_amt,
                pending_amount=total_fee - paid_amt,
                payment_status=f_status,
                payment_date=datetime.now() - timedelta(days=random.randint(1, 30)) if f_status != "Pending" else None,
                due_date=datetime.now() + timedelta(days=30)
            )
            db.session.add(fee)

            # Create some attendance records
            dept_subjects = [s for s in subjects if s.department == dept]
            if dept_subjects:
                for sub in dept_subjects[:3]:
                    for d in range(10):
                        att = Attendance(
                            student_id=student.id,
                            subject_id=sub.id,
                            date=datetime.now() - timedelta(days=d),
                            status="Present" if random.random() > 0.15 else "Absent"
                        )
                        db.session.add(att)

            # Create Mark record (Result Status)
            if dept_subjects:
                sub = dept_subjects[0]
                res_status = random.choice(["Pass", "Fail"])
                marks = random.randint(40, 95) if res_status == "Pass" else random.randint(15, 34)
                
                mark = Mark(
                    student_id=student.id,
                    subject_id=sub.id,
                    exam_type="Final",
                    marks_obtained=marks,
                    max_marks=100,
                    grade="A" if marks > 80 else ("B" if marks > 60 else ("C" if marks > 40 else "F"))
                )
                db.session.add(mark)

            # Create Exam Registration
            reg = ExamRegistration(
                student_id=student.id,
                exam_type="Regular" if status == "Regular" else "Backlog",
                semester=student.current_semester,
                subjects="All",
                fee_status="Paid" if f_status == "Paid" else "Pending",
                approval_status="Approved" if random.random() > 0.2 else "Pending"
            )
            db.session.add(reg)

        db.session.commit()
        print("Successfully seeded 20 students with related records.")

if __name__ == "__main__":
    seed_data()
