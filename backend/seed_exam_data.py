import random
from app import create_app
from database import db
from models import Student, ExamRegistration, Revaluation, Subject
from datetime import datetime, timedelta

app = create_app()

with app.app_context():
    # 1. Seed ExamRegistration for all V Sem students
    students = Student.query.filter_by(semester=5).all()
    for s in students:
        reg = ExamRegistration.query.filter_by(student_id=s.id).first()
        if not reg:
            reg = ExamRegistration(student_id=s.id, semester=5, exam_type='Regular')
            db.session.add(reg)
        
        reg.registration_status = 'Registered' if s.attendance_percent >= 75 else random.choice(['Registered', 'Not Eligible'])
        reg.hall_ticket_status = 'Generated' if reg.registration_status == 'Registered' else 'Pending'
        
    db.session.commit()
    
    # 2. Seed Revaluation Requests
    failed_students = Student.query.filter(Student.backlog_count > 0).all()
    for s in failed_students:
        rev = Revaluation.query.filter_by(student_id=s.id).first()
        if not rev:
            subjects = ["Data Structures", "OS", "DBMS", "Computer Networks"]
            rev = Revaluation(
                student_id=s.id,
                subject_name=random.choice(subjects),
                current_marks=random.randint(20, 39),
                request_date=datetime.utcnow() - timedelta(days=random.randint(1, 15)),
                status=random.choice(['Pending', 'Pending', 'Approved', 'Rejected'])
            )
            db.session.add(rev)
            
    db.session.commit()
    print("Successfully seeded exam registration and revaluation data!")
