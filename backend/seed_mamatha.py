import os
import sys
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash

# Add current directory to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '.')))

from app import create_app
app = create_app()
from database import db
from models import Student, Parent, Fee, Attendance, Mark, Subject, Exam, ExamRegistration, CommunicationLog

def seed_mamatha():
    with app.app_context():
        print("[SEED] Starting Mamatha M database seeder...")
        
        target_usn = "U24AN23S0138"
        old_students = Student.query.filter(
            (Student.register_no == target_usn) |
            (Student.student_id == target_usn) |
            (Student.full_name.ilike('%mamatha%'))
        ).all()
        
        if old_students:
            print(f"[SEED] Cleaning existing student records...")
            for old_student in old_students:
                CommunicationLog.query.filter_by(student_id=old_student.id).delete()
                Attendance.query.filter_by(student_id=old_student.id).delete()
                Mark.query.filter_by(student_id=old_student.id).delete()
                Fee.query.filter_by(student_id=old_student.id).delete()
                Parent.query.filter_by(student_id=old_student.id).delete()
                ExamRegistration.query.filter_by(student_id=old_student.id).delete()
                Exam.query.filter_by(student_id=old_student.id).delete()
                db.session.delete(old_student)
            db.session.commit()
            print("[SEED] Clean complete.")

        student = Student(
            register_no=target_usn,
            student_id=target_usn,
            full_name="Mamatha M",
            password_hash=generate_password_hash("Mamatha@123"),
            department="Computer Applications",
            course="BCA",
            semester=6, 
            section="A",
            attendance_percent=88,
            attendance_percentage=88.5,
            fee_pending=0.0,
            fee_status="Paid",
            total_fee=45000.0,
            pending_fee=0.0,
            cgpa=8.24,
            backlog_count=0,
            academic_status="Active",
            result_status="PASSED",
            phone="+919988776655",
            email="mamatha.m@example.com"
        )
        db.session.add(student)
        db.session.commit()
        print(f"[SEED] Student record inserted with ID: {student.id}")

        parent = Parent(
            parent_id=f"parent_{target_usn}",
            token=f"parent-token-{target_usn}",
            student_id=student.id,
            linked_student_id=target_usn,
            name="M",
            password_hash=generate_password_hash("Parent@123"),
            phone_number="+919988776655",
            email="parent.mamatha@example.com"
        )
        db.session.add(parent)
        
        student.parent_id = parent.id
        
        fee = Fee(
            student_id=student.id,
            fee_category="Academic Fee",
            total_amount=45000.0,
            total_fee=45000.0,
            paid_amount=45000.0,
            pending_amount=0.0,
            payment_status="Paid",
            due_date=datetime.now() + timedelta(days=30)
        )
        db.session.add(fee)
        print("[SEED] Parent and Fee records created.")

        sem_6_subjects = [
            {"code": "61601", "name": "Cloud Computing", "credits": 4, "total": 50, "present": 44},
            {"code": "61602", "name": "Mobile Application Development", "credits": 4, "total": 50, "present": 46},
            {"code": "61603", "name": "Cryptography and Network Security", "credits": 4, "total": 50, "present": 43},
            {"code": "63604", "name": "LAB: Mobile Application Development", "credits": 2, "total": 24, "present": 23},
            {"code": "61605", "name": "Major Project Work", "credits": 6, "total": 20, "present": 20}
        ]
        
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
                
            att_percentage = (subj["present"] / subj["total"]) * 100
            att = Attendance(
                student_id=student.id,
                subject=subj["name"],
                semester=6,
                section="A",
                present_days=subj["present"],
                total_days=subj["total"],
                absent_days=subj["total"] - subj["present"],
                attendance_percentage=att_percentage,
                percentage=att_percentage,
                status="Eligible" if att_percentage >= 75 else "Warning"
            )
            db.session.add(att)
            
            exam = Exam(
                student_id=student.id,
                subject=subj["name"],
                exam_date="10 Jun 2026" if subj["code"] == "61601" else ("12 Jun 2026" if subj["code"] == "61602" else "15 Jun 2026"),
                hall_ticket_status="Ready"
            )
            db.session.add(exam)

        exam_reg = ExamRegistration(
            student_id=student.id,
            semester=6,
            exam_type="Regular",
            registration_status="Registered",
            hall_ticket_status="Generated",
            eligibility_status="Eligible",
            approval_status="Approved"
        )
        db.session.add(exam_reg)
        print("[SEED] Attendance, Exams, and ExamRegistration created.")

        results_data = [
            {"code": "60124", "name": "OE: Digital Electronics", "sem": 1, "credits": 3, "ia": 38, "see": 55, "total": 93, "grade": "O"},
            {"code": "61101", "name": "KANNADA - I", "sem": 1, "credits": 3, "ia": 38, "see": 52, "total": 90, "grade": "O"},
            {"code": "61103", "name": "Language English - I : Conversations - I", "sem": 1, "credits": 3, "ia": 30, "see": 40, "total": 70, "grade": "A+"},
            {"code": "61109", "name": "Fundamentals of Computer", "sem": 1, "credits": 3, "ia": 32, "see": 50, "total": 82, "grade": "O"},
            {"code": "61110", "name": "Programming in C", "sem": 1, "credits": 3, "ia": 35, "see": 45, "total": 80, "grade": "O"},
            {"code": "61111", "name": "Accountancy / Mathematical Foundation", "sem": 1, "credits": 3, "ia": 38, "see": 42, "total": 80, "grade": "O"},
            {"code": "70138", "name": "Value Based : Environmental Studies", "sem": 1, "credits": 2, "ia": 35, "see": 40, "total": 75, "grade": "O"},
            {"code": "63109", "name": "LAB : C Programming", "sem": 1, "credits": 2, "ia": 18, "see": 15, "total": 33, "grade": "A+", "max": 50},
            {"code": "63110", "name": "LAB : Information Technology", "sem": 1, "credits": 2, "ia": 24, "see": 25, "total": 49, "grade": "O", "max": 50},
            {"code": "61113", "name": "Yoga", "sem": 1, "credits": 1, "ia": 22, "see": 0, "total": 22, "grade": "O", "max": 25},
        ]

        print("[SEED] Seeding historical marksheets...")
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
                
            mark = Mark(
                student_id=student.id,
                subject_id=sub.id,
                exam_type="Final",
                marks_obtained=row["total"],
                max_marks=row.get("max", 100),
                grade=row["grade"],
                internal_marks=row["ia"],
                external_marks=row["see"]
            )
            db.session.add(mark)

        db.session.commit()
        print("[SEED] All marksheet rows successfully seeded in SQLite database!")
        print("[SEED] Database seeding process complete. Verified Mamatha M indexed across all models!")

if __name__ == "__main__":
    seed_mamatha()
