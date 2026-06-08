import sys, os
from datetime import datetime, timedelta
import random

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))

from app import create_app
from database import db
from models import Student, Parent, Attendance, Mark, Subject, Fee, Notification
from werkzeug.security import generate_password_hash

app = create_app()

with app.app_context():
    # Check if Likhitha already exists
    likhitha = Student.query.filter_by(register_no='U24AN23S0451').first()
    if not likhitha:
        likhitha = Student(
            register_no='U24AN23S0451',
            full_name='Likhitha V.',
            department='Computer Applications (BCA)',
            semester=4,
            section='A',
            email='likhitha.v@student.uucms.edu',
            phone='+919000000000',
            password_hash=generate_password_hash('Demo123!'),
            academic_status='Active',
            result_status='PASSED',
            attendance_percent=88,
            attendance_percentage=88.5,
            cgpa=7.43,
            backlog_count=0
        )
        db.session.add(likhitha)
        db.session.commit()
        print(f"Added Student: Likhitha V. (ID: {likhitha.id})")
    else:
        print("Likhitha already exists. Updating...")
        likhitha.result_status = 'PASSED'
        likhitha.attendance_percent = 88.5
        likhitha.cgpa = 7.43
        likhitha.backlog_count = 0
        db.session.commit()

    # Create Parent
    parent = Parent.query.filter_by(student_id=likhitha.id).first()
    if not parent:
        parent = Parent(
            student_id=likhitha.id,
            name='Venkatesh',
            phone_number='+918000000000',
            email='parent.likhitha@example.com',
            password_hash=generate_password_hash('Parent123!')
        )
        db.session.add(parent)
        db.session.commit()
        print("Added Parent for Likhitha.")

    # Get Subjects
    subjects = Subject.query.filter_by(department='Computer Applications (BCA)', semester=4).all()
    if not subjects:
        sub_names = ['Advanced Java', 'Software Engineering', 'Database Admin', 'Web Tech', 'Project', 'Lab']
        for i, s_name in enumerate(sub_names):
            sub = Subject(
                subject_code=f'BCA40{i+1}',
                subject_name=s_name,
                department='Computer Applications (BCA)',
                semester=4,
                credits=4
            )
            db.session.add(sub)
            subjects.append(sub)
        db.session.commit()

    # Create Attendance
    att_count = Attendance.query.filter_by(student_id=likhitha.id).count()
    if att_count == 0:
        for sub in subjects:
            total_classes = 40
            attended = int(40 * 0.885)
            att = Attendance(
                student_id=likhitha.id,
                subject=sub.subject_name,
                semester=4,
                section='A',
                present_days=attended,
                total_days=total_classes,
                absent_days=total_classes - attended,
                attendance_percentage=88.5,
                percentage=88.5,
                status='Eligible'
            )
            db.session.add(att)
        db.session.commit()
        print("Added Attendance for Likhitha.")

    # Create Marks
    marks_count = Mark.query.filter_by(student_id=likhitha.id).count()
    if marks_count == 0:
        for sub in subjects:
            m = Mark(
                student_id=likhitha.id,
                subject_id=sub.id,
                exam_type='Final',
                internal_marks=random.randint(35, 45),
                external_marks=random.randint(65, 80),
                marks_obtained=random.randint(70, 95),
                max_marks=100,
                grade='A'
            )
            db.session.add(m)
        db.session.commit()
        print("Added Marks for Likhitha.")

    # Create Fees
    fee = Fee.query.filter_by(student_id=likhitha.id).first()
    if not fee:
        f = Fee(
            student_id=likhitha.id,
            fee_category='Tuition Fee',
            total_amount=50000,
            total_fee=50000,
            paid_amount=50000,
            pending_amount=0,
            payment_status='Paid',
            due_date=datetime.utcnow() + timedelta(days=30)
        )
        db.session.add(f)
        db.session.commit()
        print("Added Fee for Likhitha.")
        
    print("Likhitha Data Setup Complete! SGPA=7.15, CGPA=7.43")
