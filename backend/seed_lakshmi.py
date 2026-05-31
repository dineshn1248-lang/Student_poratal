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

def seed_lakshmi():
    with app.app_context():
        print("[SEED] Starting Lakshmi Nisimappa Chakrasali database seeder...")
        
        # 1. Clean existing records for this student if any
        target_usn = "U24AN23S0245"
        old_students = Student.query.filter(
            (Student.register_no == target_usn) |
            (Student.student_id == target_usn) |
            (Student.full_name.ilike('%lakshmi%'))
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

        # 2. Register the Student
        student = Student(
            register_no=target_usn,
            student_id=target_usn,
            full_name="Lakshmi Nisimappa Chakrasali",
            password_hash=generate_password_hash("Lakshmi@123"),
            department="Computer Applications",
            course="BCA",
            semester=6, # Active in Sem 6
            section="A",
            attendance_percent=84,
            attendance_percentage=84.5,
            fee_pending=10000.0,
            fee_status="Partial",
            total_fee=45000.0,
            pending_fee=10000.0,
            cgpa=7.14,
            backlog_count=0,
            academic_status="Active",
            phone="+919380179909",
            email="lakshmi.c.real@example.com"
        )
        db.session.add(student)
        db.session.commit()
        print(f"[SEED] Student record inserted with ID: {student.id}")

        # 3. Register the Parent
        parent = Parent(
            parent_id=f"parent_{target_usn}",
            token=f"parent-token-{target_usn}",
            student_id=student.id,
            linked_student_id=target_usn,
            name="Nisimappa",
            password_hash=generate_password_hash("Parent@123"),
            phone_number="+919380179909",
            email="parent.lakshmi@example.com"
        )
        db.session.add(parent)
        
        # Link student's parent_id column
        student.parent_id = parent.id
        
        # 4. Insert Fee Card
        fee = Fee(
            student_id=student.id,
            fee_category="Academic Fee",
            total_amount=45000.0,
            total_fee=45000.0,
            paid_amount=35000.0,
            pending_amount=10000.0,
            payment_status="Partial",
            due_date=datetime.now() + timedelta(days=30)
        )
        db.session.add(fee)
        print("[SEED] Parent and Fee records created.")

        # 5. Seed Attendance for Semester 6 (Current Sem)
        sem_6_subjects = [
            {"code": "61601", "name": "Cloud Computing", "credits": 4, "total": 50, "present": 42},
            {"code": "61602", "name": "Mobile Application Development", "credits": 4, "total": 50, "present": 45},
            {"code": "61603", "name": "Cryptography and Network Security", "credits": 4, "total": 50, "present": 40},
            {"code": "63604", "name": "LAB: Mobile Application Development", "credits": 2, "total": 24, "present": 22},
            {"code": "61605", "name": "Major Project Work", "credits": 6, "total": 20, "present": 20}
        ]
        
        for subj in sem_6_subjects:
            # Ensure subject exists
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
            
            # Create exam entries
            exam = Exam(
                student_id=student.id,
                subject=subj["name"],
                exam_date="10 Jun 2026" if subj["code"] == "61601" else ("12 Jun 2026" if subj["code"] == "61602" else "15 Jun 2026"),
                hall_ticket_status="Ready"
            )
            db.session.add(exam)

        # Create Exam Registration
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

        # 6. Add Historical Marksheets (Semesters 1 to 5)
        results_data = [
            # Semester 1
            {"code": "60124", "name": "OE: Digital Electronics", "sem": 1, "credits": 3, "ia": 35, "see": 53, "total": 88, "grade": "O"},
            {"code": "61101", "name": "KANNADA - I", "sem": 1, "credits": 3, "ia": 36, "see": 50, "total": 86, "grade": "O"},
            {"code": "61103", "name": "Language English - I : Conversations - I", "sem": 1, "credits": 3, "ia": 28, "see": 36, "total": 64, "grade": "A+"},
            {"code": "61109", "name": "Fundamentals of Computer", "sem": 1, "credits": 3, "ia": 28, "see": 46, "total": 74, "grade": "A++"},
            {"code": "61110", "name": "Programming in C", "sem": 1, "credits": 3, "ia": 28, "see": 27, "total": 55, "grade": "A"},
            {"code": "61111", "name": "Accountancy / Mathematical Foundation", "sem": 1, "credits": 3, "ia": 35, "see": 40, "total": 75, "grade": "A++"},
            {"code": "70138", "name": "Value Based : Environmental Studies", "sem": 1, "credits": 2, "ia": 30, "see": 37, "total": 67, "grade": "A+"},
            {"code": "63109", "name": "LAB : C Programming", "sem": 1, "credits": 2, "ia": 14, "see": 12, "total": 26, "grade": "B+", "max": 50},
            {"code": "63110", "name": "LAB : Information Technology", "sem": 1, "credits": 2, "ia": 22, "see": 25, "total": 47, "grade": "O", "max": 50},
            {"code": "61113", "name": "Yoga", "sem": 1, "credits": 1, "ia": 20, "see": 0, "total": 20, "grade": "A++", "max": 25},

            # Semester 2
            {"code": "60224", "name": "Electronics OE: Consumer Electronics", "sem": 2, "credits": 3, "ia": 20, "see": 47, "total": 67, "grade": "A+"},
            {"code": "61201", "name": "Kannada-II : Kannada Basha Patrike", "sem": 2, "credits": 3, "ia": 30, "see": 42, "total": 72, "grade": "A++"},
            {"code": "61203", "name": "English-II : Conversations-2", "sem": 2, "credits": 3, "ia": 14, "see": 34, "total": 48, "grade": "B"},
            {"code": "61209", "name": "Data Structures using C", "sem": 2, "credits": 3, "ia": 30, "see": 26, "total": 56, "grade": "A"},
            {"code": "61210", "name": "Object Oriented Concepts using Java", "sem": 2, "credits": 3, "ia": 25, "see": 33, "total": 58, "grade": "A"},
            {"code": "61211", "name": "Discrete Mathematical Structures", "sem": 2, "credits": 3, "ia": 26, "see": 45, "total": 71, "grade": "A++"},
            {"code": "60237", "name": "SEC : Digital Fluency", "sem": 2, "credits": 2, "ia": 19, "see": 15, "total": 34, "grade": "A+", "max": 50},
            {"code": "63209", "name": "Lab : Data Structures", "sem": 2, "credits": 2, "ia": 17, "see": 21, "total": 38, "grade": "A++", "max": 50},
            {"code": "63210", "name": "Lab : Java Lab", "sem": 2, "credits": 2, "ia": 21, "see": 18, "total": 39, "grade": "A++", "max": 50},
            {"code": "60252", "name": "SEC Co-Curriicular Activity : Campus to Community C2C", "sem": 2, "credits": 2, "ia": 13, "see": 0, "total": 13, "grade": "B+", "max": 25},

            # Semester 3
            {"code": "60343", "name": "AEC: India and Indian Constitution", "sem": 3, "credits": 3, "ia": 37, "see": 36, "total": 73, "grade": "A++"},
            {"code": "61301", "name": "KANNADA-III", "sem": 3, "credits": 3, "ia": 34, "see": 50, "total": 84, "grade": "A++"},
            {"code": "61302", "name": "Language English - III", "sem": 3, "credits": 3, "ia": 30, "see": 27, "total": 57, "grade": "A"},
            {"code": "61309", "name": "Database Management Systems", "sem": 3, "credits": 3, "ia": 25, "see": 24, "total": 49, "grade": "B"},
            {"code": "61310", "name": "C# and DOT NET Framework", "sem": 3, "credits": 3, "ia": 26, "see": 34, "total": 60, "grade": "A+"},
            {"code": "61311", "name": "Computer Communication and Networks", "sem": 3, "credits": 3, "ia": 28, "see": 39, "total": 67, "grade": "A+"},
            {"code": "60326", "name": "SEC : Financial Education and Investment Awareness", "sem": 3, "credits": 2, "ia": 17, "see": 18, "total": 35, "grade": "A++", "max": 50},
            {"code": "63309", "name": "LAB: DBMS", "sem": 3, "credits": 2, "ia": 13, "see": 21, "total": 34, "grade": "A+", "max": 50},
            {"code": "63310", "name": "LAB: C# and DOT NET Framework", "sem": 3, "credits": 2, "ia": 20, "see": 17, "total": 37, "grade": "A++", "max": 50},
            {"code": "60338", "name": "SEC Co-Curricular Activity : C2C (Community Service)", "sem": 3, "credits": 2, "ia": 20, "see": 0, "total": 20, "grade": "A++", "max": 25},

            # Semester 4
            {"code": "60454", "name": "OE : Floriculture", "sem": 4, "credits": 3, "ia": 32, "see": 28, "total": 60, "grade": "A+"},
            {"code": "61401", "name": "Kannada - IV : Kannada bBasha Patrike", "sem": 4, "credits": 3, "ia": 38, "see": 46, "total": 84, "grade": "A++"},
            {"code": "61403", "name": "English - IV : Conversations-4", "sem": 4, "credits": 3, "ia": 27, "see": 31, "total": 58, "grade": "A"},
            {"code": "61409", "name": "Python Programming", "sem": 4, "credits": 3, "ia": 32, "see": 33, "total": 65, "grade": "A+"},
            {"code": "61410", "name": "Computer Multimedia and Animation", "sem": 4, "credits": 3, "ia": 25, "see": 21, "total": 46, "grade": "B"},
            {"code": "61411", "name": "Operating Systems Concepts", "sem": 4, "credits": 3, "ia": 25, "see": 28, "total": 53, "grade": "B+"},
            {"code": "60447", "name": "SEC : Artificial Intelligence", "sem": 4, "credits": 2, "ia": 18, "see": 13, "total": 31, "grade": "A+", "max": 50},
            {"code": "63409", "name": "LAB: Python Programming", "sem": 4, "credits": 2, "ia": 20, "see": 22, "total": 42, "grade": "A++", "max": 50},
            {"code": "63410", "name": "LAB: Multimedia and Animation", "sem": 4, "credits": 2, "ia": 22, "see": 23, "total": 45, "grade": "O", "max": 50},
            {"code": "60445", "name": "SEC Co-Curricular Activity : Campus 2 Community (C2C)", "sem": 4, "credits": 2, "ia": 25, "see": 0, "total": 25, "grade": "O", "max": 25},

            # Semester 5
            {"code": "61509", "name": "Design and Analysis of Algorithms", "sem": 5, "credits": 4, "ia": 35, "see": 35, "total": 70, "grade": "A++"},
            {"code": "61510", "name": "Statistical Computing and R Programming", "sem": 5, "credits": 4, "ia": 36, "see": 37, "total": 73, "grade": "A++"},
            {"code": "61511", "name": "Software Engineering", "sem": 5, "credits": 4, "ia": 25, "see": 24, "total": 49, "grade": "B"},
            {"code": "61512", "name": "Elective : Cloud Computing", "sem": 5, "credits": 3, "ia": 25, "see": 48, "total": 73, "grade": "A++"},
            {"code": "61513", "name": "Vocational : Web Content Management System", "sem": 5, "credits": 3, "ia": 28, "see": 37, "total": 65, "grade": "A+"},
            {"code": "60536", "name": "SEC : Cyber Security", "sem": 5, "credits": 3, "ia": 20, "see": 20, "total": 40, "grade": "A++", "max": 50},
            {"code": "63509", "name": "LAB : Design and Analysis of Algorithms Lab", "sem": 5, "credits": 2, "ia": 17, "see": 20, "total": 37, "grade": "A++", "max": 50},
            {"code": "63510", "name": "LAB : R Programming Lab", "sem": 5, "credits": 2, "ia": 21, "see": 21, "total": 42, "grade": "A++", "max": 50}
        ]

        print("[SEED] Seeding historical marksheets...")
        for row in results_data:
            # Ensure subject exists
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
        print("[SEED] Database seeding process complete. Verified Lakshmi Nisimappa Chakrasali indexed across all models!")

if __name__ == "__main__":
    seed_lakshmi()
