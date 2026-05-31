from app import create_app
from database import db
from models import Student, Attendance
import random
from datetime import datetime, timedelta

def seed_attendance():
    app = create_app()
    with app.app_context():
        print("Seeding attendance records...")
        
        students = Student.query.filter_by(department='Computer Applications').all()
        
        if not students:
            print("No students found. Run seed_hod_students.py first.")
            return

        # Clear existing attendance
        Attendance.query.delete()
        
        total_days = 90
        
        for student in students:
            # Generate realistic attendance
            # Eligible (75%+), Warning (65-75), Critical (<65)
            if random.random() > 0.3:
                present = random.randint(70, 85)
                absent = random.randint(2, 10)
                leave = random.randint(0, 5)
            else:
                present = random.randint(40, 60)
                absent = random.randint(20, 30)
                leave = random.randint(5, 10)
            
            actual_total = present + absent + leave
            percentage = round((present / actual_total) * 100, 1)
            
            if percentage >= 75:
                status = 'Eligible'
            elif percentage >= 65:
                status = 'Warning'
            else:
                status = 'Critical'
                
            attendance = Attendance(
                student_id=student.id,
                semester=student.semester,
                section=student.section,
                present_days=present,
                absent_days=absent,
                leave_days=leave,
                attendance_percentage=percentage,
                status=status,
                last_updated=datetime.utcnow() - timedelta(days=random.randint(0, 5))
            )
            db.session.add(attendance)
            
        db.session.commit()
        print(f"Successfully seeded attendance for {len(students)} students.")

if __name__ == "__main__":
    seed_attendance()
