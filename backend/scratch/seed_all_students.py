import sys, os, re, random
from datetime import datetime, timedelta

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))

from app import create_app
from database import db
from models import Student, Parent, Attendance, Mark, Subject, Fee
from werkzeug.security import generate_password_hash

app = create_app()

jsx_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'src', 'pages', 'hod', 'HODAttendance.jsx')
with open(jsx_path, 'r') as f:
    content = f.read()

# Match lines like: { id: 1, regNo: 'U24AN23S001', name: 'Dinesh N', sem: 'I Sem', sec: 'A', present: 35, absent: 5, leave: 2, percent: 87.50 },
pattern = r"regNo:\s*'([^']+)',\s*name:\s*'([^']+)',\s*sem:\s*'([^']+)'"
matches = re.findall(pattern, content)

roman_to_int = {'I Sem': 1, 'II Sem': 2, 'III Sem': 3, 'IV Sem': 4, 'V Sem': 5, 'VI Sem': 6}

with app.app_context():
    subjects_cache = {}
    
    for reg_no, name, sem_str in matches:
        sem = roman_to_int.get(sem_str, 1)
        
        # Check if student exists
        student = Student.query.filter_by(register_no=reg_no).first()
        if not student:
            student = Student(
                register_no=reg_no,
                full_name=name,
                department='Computer Applications (BCA)',
                semester=sem,
                section='A',
                email=f"{name.replace(' ', '.').lower()}@student.uucms.edu",
                phone=f"+91{random.randint(7000000000, 9999999999)}",
                password_hash=generate_password_hash('Demo123!'),
                academic_status='Active',
                result_status='PASSED',
                attendance_percent=random.randint(70, 95),
                attendance_percentage=random.uniform(70.0, 95.0),
                cgpa=round(random.uniform(6.0, 9.5), 2),
                backlog_count=0
            )
            db.session.add(student)
            db.session.commit()
            print(f"Added Student: {name} ({reg_no})")
        else:
            print(f"Student {reg_no} already exists.")
            
        # Parent
        parent = Parent.query.filter_by(student_id=student.id).first()
        if not parent:
            parent = Parent(
                student_id=student.id,
                name=f"{name.split(' ')[0]}'s Parent",
                phone_number=f"+91{random.randint(7000000000, 9999999999)}",
                email=f"parent.{reg_no.lower()}@example.com",
                password_hash=generate_password_hash('Parent123!')
            )
            db.session.add(parent)
            db.session.commit()
            
        # Subjects
        if sem not in subjects_cache:
            subjects = Subject.query.filter_by(department='Computer Applications (BCA)', semester=sem).all()
            if not subjects:
                sub_names = [f'Subject 1 Sem {sem}', f'Subject 2 Sem {sem}', f'Subject 3 Sem {sem}', f'Subject 4 Sem {sem}', f'Subject 5 Sem {sem}']
                for i, s_name in enumerate(sub_names):
                    sub = Subject(
                        subject_code=f'BCA{sem}0{i+1}',
                        subject_name=s_name,
                        department='Computer Applications (BCA)',
                        semester=sem,
                        credits=4
                    )
                    db.session.add(sub)
                    subjects.append(sub)
                db.session.commit()
            subjects_cache[sem] = subjects
        
        subjects = subjects_cache[sem]
        
        # Attendance
        att_count = Attendance.query.filter_by(student_id=student.id).count()
        if att_count == 0:
            for sub in subjects:
                total_classes = 40
                attended = random.randint(28, 38)
                att = Attendance(
                    student_id=student.id,
                    subject=sub.subject_name,
                    semester=sem,
                    section='A',
                    present_days=attended,
                    total_days=total_classes,
                    absent_days=total_classes - attended,
                    attendance_percentage=(attended/total_classes)*100,
                    percentage=(attended/total_classes)*100,
                    status='Eligible'
                )
                db.session.add(att)
            db.session.commit()

        # Marks
        marks_count = Mark.query.filter_by(student_id=student.id).count()
        if marks_count == 0:
            for sub in subjects:
                m = Mark(
                    student_id=student.id,
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
            
        # Fees
        fee = Fee.query.filter_by(student_id=student.id).first()
        if not fee:
            f = Fee(
                student_id=student.id,
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

print("Mass seeding complete! Synchronized completely.")
