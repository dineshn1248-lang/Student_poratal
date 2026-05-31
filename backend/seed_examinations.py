from app import create_app
from database import db
from models import Student, ExamRegistration, ApprovalRequest
import random
from datetime import datetime, timedelta

def seed_examinations():
    app = create_app()
    with app.app_context():
        print("Seeding examination records...")
        
        students = Student.query.filter_by(department='Computer Applications').all()
        if not students:
            print("No students found. Run seed_hod_students.py first.")
            return

        ExamRegistration.query.delete()
        ApprovalRequest.query.delete()
        
        exam_types = ['Regular', 'Supplementary']
        reg_statuses = ['Registered', 'Pending']
        ht_statuses = ['Generated', 'Not Generated']
        im_statuses = ['Submitted', 'Pending']
        el_statuses = ['Eligible', 'Short Attendance', 'Marks Pending']
        app_statuses = ['Approved', 'Pending', 'Rejected']
        
        request_types = ['Attendance shortage approval', 'Late exam registration approval', 'Internal marks exception approval']

        for student in students:
            # Create Exam Registration
            is_registered = random.random() > 0.15
            reg = ExamRegistration(
                student_id=student.id,
                semester=student.semester,
                exam_type=random.choice(exam_types),
                registration_status='Registered' if is_registered else 'Pending',
                hall_ticket_status='Generated' if is_registered and random.random() > 0.2 else 'Not Generated',
                internal_marks_status='Submitted' if random.random() > 0.2 else 'Pending',
                eligibility_status=random.choice(el_statuses) if not is_registered else 'Eligible',
                approval_status='Approved' if is_registered else random.choice(app_statuses),
                updated_at=datetime.utcnow() - timedelta(days=random.randint(0, 5))
            )
            db.session.add(reg)
            
            # Create some Approval Requests (mocking about 25% students have requests)
            if random.random() > 0.75:
                req = ApprovalRequest(
                    student_id=student.id,
                    request_type=random.choice(request_types),
                    reason="Due to medical emergency" if random.random() > 0.5 else "Server downtime during registration",
                    status='Pending' if random.random() > 0.3 else random.choice(['Approved', 'Rejected']),
                    created_at=datetime.utcnow() - timedelta(days=random.randint(1, 10))
                )
                db.session.add(req)
                
        db.session.commit()
        print(f"Successfully seeded exam data for {len(students)} students.")

if __name__ == "__main__":
    seed_examinations()
