import os
import sys
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash

# Add current directory to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '.')))

from app import create_app
from database import db
from models import Student, Parent, Fee, Attendance, Mark, Subject, Exam, ExamRegistration, CommunicationLog
import random

app = create_app()

def seed_student_files(student, parent_name, parent_phone, parent_email):
    # Check if already has parent to avoid duplicate
    parent = Parent.query.filter_by(student_id=student.id).first()
    if not parent:
        parent = Parent(
            parent_id=f"parent_{student.register_no}",
            token=f"parent-token-{student.register_no}",
            student_id=student.id,
            linked_student_id=student.register_no,
            name=parent_name,
            password_hash=generate_password_hash("Parent@123"),
            phone_number=parent_phone,
            email=parent_email
        )
        db.session.add(parent)
        db.session.flush()
        student.parent_id = parent.id
    
    fee = Fee.query.filter_by(student_id=student.id).first()
    if not fee:
        fee = Fee(
            student_id=student.id,
            fee_category="Academic Fee",
            total_amount=45000.0,
            total_fee=45000.0,
            paid_amount=35000.0 if student.result_status == 'FAILED' else 45000.0,
            pending_amount=10000.0 if student.result_status == 'FAILED' else 0.0,
            payment_status="Partial" if student.result_status == 'FAILED' else "Paid",
            due_date=datetime.now() + timedelta(days=30)
        )
        db.session.add(fee)
        
    sem_6_subjects = [
        {"code": "61601", "name": "Cloud Computing", "credits": 4, "total": 50},
        {"code": "61602", "name": "Mobile Application Development", "credits": 4, "total": 50},
        {"code": "61603", "name": "Cryptography and Network Security", "credits": 4, "total": 50},
        {"code": "63604", "name": "LAB: Mobile Application Development", "credits": 2, "total": 24},
        {"code": "61605", "name": "Major Project Work", "credits": 6, "total": 20}
    ]
    
    # Generate Attendance if empty
    if Attendance.query.filter_by(student_id=student.id).count() == 0:
        base_present = 25 if student.result_status == 'FAILED' else 42
        for subj in sem_6_subjects:
            subject_obj = Subject.query.filter_by(subject_code=subj["code"]).first()
            if not subject_obj:
                subject_obj = Subject(
                    subject_code=subj["code"],
                    subject_name=subj["name"],
                    department="Computer Applications",
                    semester=6,
                    credits=subj["credits"]
                )
                db.session.add(subject_obj)
                db.session.flush()
                
            present = base_present + random.randint(0, 5)
            if present > subj["total"]: present = subj["total"]
            att_percentage = (present / subj["total"]) * 100
            
            att = Attendance(
                student_id=student.id,
                subject=subj["name"],
                semester=6,
                section="A",
                present_days=present,
                total_days=subj["total"],
                absent_days=subj["total"] - present,
                attendance_percentage=att_percentage,
                percentage=att_percentage,
                status="Eligible" if att_percentage >= 75 else "Warning"
            )
            db.session.add(att)
            
            exam = Exam(
                student_id=student.id,
                subject=subj["name"],
                exam_date="10 Jun 2026",
                hall_ticket_status="Ready"
            )
            db.session.add(exam)

        exam_reg = ExamRegistration(
            student_id=student.id,
            semester=6,
            exam_type="Regular",
            registration_status="Registered",
            hall_ticket_status="Generated",
            eligibility_status="Eligible" if student.result_status == 'PASSED' else "Not Eligible",
            approval_status="Approved" if student.result_status == 'PASSED' else "Pending"
        )
        db.session.add(exam_reg)

    if Mark.query.filter_by(student_id=student.id).count() == 0:
        results_data = [
            {"code": "60124", "name": "OE: Digital Electronics", "sem": 1, "credits": 3},
            {"code": "61101", "name": "KANNADA - I", "sem": 1, "credits": 3},
            {"code": "61103", "name": "Language English - I : Conversations - I", "sem": 1, "credits": 3},
            {"code": "61109", "name": "Fundamentals of Computer", "sem": 1, "credits": 3},
            {"code": "61110", "name": "Programming in C", "sem": 1, "credits": 3},
            {"code": "61111", "name": "Accountancy / Mathematical Foundation", "sem": 1, "credits": 3},
        ]
        
        for row in results_data:
            sub = Subject.query.filter_by(subject_code=row["code"]).first()
            if not sub:
                sub = Subject(
                    subject_code=row["code"],
                    subject_name=row["name"],
                    department="Computer Applications",
                    semester=row["sem"],
                    credits=row["credits"]
                )
                db.session.add(sub)
                db.session.flush()
                
            ia = random.randint(30, 40) if student.result_status == 'PASSED' else random.randint(10, 20)
            see = random.randint(35, 60) if student.result_status == 'PASSED' else random.randint(15, 30)
            total = ia + see
            grade = "O" if total > 85 else "A" if total > 70 else "B" if total > 50 else "F"
            
            mark = Mark(
                student_id=student.id,
                subject_id=sub.id,
                exam_type="Final",
                marks_obtained=total,
                max_marks=100,
                grade=grade,
                internal_marks=ia,
                external_marks=see
            )
            db.session.add(mark)
            
    db.session.commit()
    print(f"-> Missing files seeded successfully for {student.full_name}!")

def main():
    with app.app_context():
        # 1. Seed Lakshmi Files
        lakshmi = Student.query.filter(Student.register_no == 'U24AN23S021').first()
        if lakshmi:
            print(f"Found {lakshmi.full_name}, seeding files...")
            seed_student_files(lakshmi, "Nisimappa", "+919380179909", "parent.lakshmi@example.com")
        
        # 2. Check and add Chetan Kumar .K
        chetan = Student.query.filter(Student.full_name.ilike('%chetan%')).first()
        if not chetan:
            print("Chetan not found, adding him...")
            chetan = Student(
                register_no="U24AN23S0139",
                student_id="U24AN23S0139",
                full_name="Chetan kumar .K",
                password_hash=generate_password_hash("Chetan@123"),
                department="Computer Applications",
                course="BCA",
                semester=6, 
                section="A",
                attendance_percent=80,
                cgpa=7.5,
                backlog_count=0,
                academic_status="Active",
                result_status="PASSED",
                phone="+917619589291",
                email="chetankumar@college.com"
            )
            db.session.add(chetan)
            db.session.commit()
            print("Chetan added.")
        
        print(f"Found {chetan.full_name}, seeding files...")
        seed_student_files(chetan, "K", "+917619589291", "parent.chetan@example.com")
        
        print("Done!")

if __name__ == '__main__':
    main()
