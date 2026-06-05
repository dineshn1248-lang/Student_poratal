import os
import datetime
from app import create_app
from database import db
from models import Staff, Student, Parent, Subject, Mark, Announcement, Timetable, Attendance, Revaluation, Department, ExamRegistration, SpecialApproval, Fee, FeeApproval, Notification, Exam

from flask import current_app

def init_db(app=None):
    if app is None:
        from app import create_app
        app = create_app()
        
    with app.app_context():
        basedir = os.path.abspath(os.path.dirname(__file__))
        if not os.path.exists(os.path.join(basedir, 'instance')):
            os.makedirs(os.path.join(basedir, 'instance'))

        db.drop_all()
        db.create_all()
        print("Seeding database with EXACT demo credentials...")

        # ── DEPARTMENTS ──────────────────────────────────────────────────────
        dept_bca = Department(department_name="BCA", total_sections=2)
        dept_bcs = Department(department_name="BCS", total_sections=2)
        dept_bba = Department(department_name="BBA", total_sections=2)
        dept_mca = Department(department_name="MCA", total_sections=1)
        db.session.add_all([dept_bca, dept_bcs, dept_bba, dept_mca])
        db.session.flush()

        # ── STAFF (Requested Demo Credentials) ──────────────────────────────
        
        # HOD
        hod = Staff(username='hod@college.com', role='hod', name='Dr. K. Ramesh', department='BCA', email='hod@college.com')
        hod.set_password('hod123')
        
        # Faculty
        faculty = Staff(username='faculty@college.com', role='faculty', name='Prof. Suresh K', department='BCA', email='faculty@college.com')
        faculty.set_password('faculty123')
        
        # Principal
        principal = Staff(username='principal@college.com', role='principal', name='Dr. Nagaraj R', department='Administration', email='principal@college.com')
        principal.set_password('principal123')
        
        # Extra faculty for variety
        fac2 = Staff(username='fac_bcs1', role='faculty', name='Dr. Sriram B', department='BCS', email='sriram@college.com')
        fac2.set_password('faculty123')

        db.session.add_all([hod, faculty, principal, fac2])
        db.session.flush()

        # Link HOD
        dept_bca.hod_id = hod.id
        
        # ── STUDENTS (Exact 20 Split) ────────────────────────────────────────
        # BCA = 8, BCS = 5, BBA = 4, MCA = 3
        students_data = [
            ("BCA001", "Dinesh N", "BCA", 4, 85), ("BCA002", "Priya S", "BCA", 4, 72),
            ("BCA003", "Ajay K", "BCA", 2, 90), ("BCA004", "Sneha P", "BCA", 2, 65),
            ("BCA005", "Kiran G", "BCA", 6, 88), ("BCA006", "Aarav V", "BCA", 6, 74),
            ("BCA007", "Megha R", "BCA", 1, 80), ("BCA008", "Rahul J", "BCA", 1, 78),
            ("BCA009", "Lakshmi Nisimappa Chakrasali", "BCA", 4, 88),
            ("BCS001", "Vikram S", "BCS", 4, 82), ("BCS002", "Ananya K", "BCS", 2, 89),
            ("BCS003", "Bhavya G", "BCS", 6, 68), ("BCS004", "Abhishek M", "BCS", 1, 77),
            ("BCS005", "Deepa N", "BCS", 4, 91),
            ("BBA001", "Rohan D", "BBA", 2, 75), ("BBA002", "Suman R", "BBA", 4, 84),
            ("BBA003", "Kavita T", "BBA", 1, 60), ("BBA004", "Arjun L", "BBA", 6, 83),
            ("MCA001", "Sanjana T", "MCA", 2, 88), ("MCA002", "Asha R", "MCA", 2, 55),
            ("MCA003", "Karthik B", "MCA", 2, 92),
        ]

        fee_map = {"BCA": 23000, "BCS": 18000, "BBA": 15000, "MCA": 28000}

        for reg, name, dept, sem, att in students_data:
            # Setup first student as official demo student
            is_demo = (reg == "BCA001")
            actual_reg = "NU2026001" if is_demo else reg
            
            stu = Student(
                register_no=actual_reg,
                student_id=actual_reg,
                full_name=name,
                department=dept,
                course=dept,
                semester=sem,
                attendance_percent=att,
                attendance_percentage=float(att),
                academic_status="Regular" if att >= 75 else "Backlog",
                section="A",
                total_fee=45000.0 if is_demo else float(fee_map[dept]),
                pending_fee=15000.0 if is_demo else float(fee_map[dept]),
                fee_pending=15000.0 if is_demo else float(fee_map[dept]),
                fee_status="Pending",
                cgpa=8.5 if is_demo else 7.8
            )
            
            if is_demo:
                stu.set_password("student123")
            else:
                stu.set_password("pass123")
                
            db.session.add(stu)
            db.session.flush()

            # Seed parent for the demo student
            if is_demo:
                parent = Parent(
                    parent_id="PAR2026001",
                    token="par_token_1",
                    student_id=stu.id,
                    linked_student_id="NU2026001",
                    name="Narayana Swamy",
                    phone_number="9876543211",
                    email="parent@college.com"
                )
                parent.set_password("parent123")
                db.session.add(parent)
                db.session.flush()
                stu.parent_id = parent.id
                
                # Seed specific subject-wise attendance for demo
                att_se = Attendance(student_id=stu.id, subject="Software Engineering", semester=4, section="A", present_days=36, total_days=40, attendance_percentage=90.0, percentage=90.0, status="Eligible")
                att_db = Attendance(student_id=stu.id, subject="Database Management Systems", semester=4, section="A", present_days=34, total_days=40, attendance_percentage=85.0, percentage=85.0, status="Eligible")
                att_cn = Attendance(student_id=stu.id, subject="Computer Networks", semester=4, section="A", present_days=28, total_days=40, attendance_percentage=70.0, percentage=70.0, status="Warning")
                db.session.add_all([att_se, att_db, att_cn])
                
                # Seed specific exams for demo
                ex_se = Exam(student_id=stu.id, subject="Software Engineering", exam_date="10 Jun 2026", hall_ticket_status="Ready")
                ex_db = Exam(student_id=stu.id, subject="Database Management Systems", exam_date="12 Jun 2026", hall_ticket_status="Ready")
                ex_cn = Exam(student_id=stu.id, subject="Computer Networks", exam_date="15 Jun 2026", hall_ticket_status="Ready")
                db.session.add_all([ex_se, ex_db, ex_cn])

            fee = Fee(
                student_id=stu.id,
                fee_category="Academic Fee",
                total_amount=45000.0 if is_demo else float(fee_map[dept]),
                total_fee=45000.0 if is_demo else float(fee_map[dept]),
                paid_amount=30000.0 if is_demo else 0.0,
                pending_amount=15000.0 if is_demo else float(fee_map[dept]),
                payment_status="Pending",
                due_date=datetime.datetime.now() + datetime.timedelta(days=15)
            )
            db.session.add(fee)

        # ── NOTIFICATIONS ──────────────────────────────────────────────────
        alerts = [
            Notification(recipient_role='HOD', department='BCA', title='Attendance Warning', message='3 students have less than 75% attendance', type='Attendance', priority='High'),
            Notification(recipient_role='HOD', department='BCA', title='Marks Pending', message='Internal marks not submitted for 2 subjects', type='Marks', priority='Medium'),
            Notification(recipient_role='HOD', department='BCA', title='Backlog Alert', message='6 students have backlog in multiple subjects', type='Backlog', priority='High'),
        ]
        
        # ── SUBJECTS AND MARKS ─────────────────────────────────────────────
        from models import Subject, Mark
        subjects_data = [
            ("SUB01", "Software Engineering", 4, "BCA", 4),
            ("SUB02", "Database Management Systems", 4, "BCA", 4),
            ("SUB03", "Computer Networks", 4, "BCA", 4),
            ("SUB04", "Python Programming", 4, "BCA", 3),
        ]
        
        added_subjects = []
        for s_code, s_name, sem, dept, cred in subjects_data:
            sub = Subject(subject_code=s_code, subject_name=s_name, semester=sem, department=dept, credits=cred)
            db.session.add(sub)
            added_subjects.append(sub)
        
        db.session.flush()

        # Add marks for all BCA students
        bca_students = Student.query.filter_by(department="BCA").all()
        import random
        for stu in bca_students:
            # Randomize backlog for some
            has_backlog = (stu.attendance_percent < 75)
            
            for sub in added_subjects:
                if has_backlog and random.choice([True, False]):
                    # Fail mark
                    internal = random.randint(10, 20)
                    external = random.randint(10, 20)
                    grade = "F"
                else:
                    # Pass mark
                    internal = random.randint(35, 50)
                    external = random.randint(35, 50)
                    grade = "A" if (internal+external)>85 else ("B" if (internal+external)>70 else "C")
                    
                m = Mark(
                    student_id=stu.id,
                    subject_id=sub.id,
                    internal_marks=float(internal),
                    external_marks=float(external),
                    marks_obtained=float(internal+external), max_marks=100.0,
                    grade=grade
                )
                db.session.add(m)
        
        db.session.add_all(alerts)


        db.session.commit()
        print("\n[OK] Database re-seeded with EXACT demo accounts.")

if __name__ == '__main__':
    init_db()
