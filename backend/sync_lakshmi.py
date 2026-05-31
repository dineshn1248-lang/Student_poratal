import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '.')))

from app import create_app
from database import db
from models import Student, Attendance, Exam, Subject

def sync_lakshmi_strings():
    app = create_app()
    with app.app_context():
        student = Student.query.filter_by(register_no="U24AN23S0245").first()
        if not student:
            return
            
        sem6_subjects = ["php", "logical resonging", "data science", "artifisial intteligence", "degital marketing", "project lab", "php lab"]
        
        # We need to map her old Sem 6 attendance records to the new names
        att_records = Attendance.query.filter_by(student_id=student.id, semester=6).all()
        for idx, att in enumerate(att_records):
            if idx < len(sem6_subjects):
                att.subject = sem6_subjects[idx]
        
        # If there are missing attendance records, let's create them so all 7 show up!
        if len(att_records) < len(sem6_subjects):
            for i in range(len(att_records), len(sem6_subjects)):
                new_att = Attendance(
                    student_id=student.id,
                    subject=sem6_subjects[i],
                    semester=6,
                    section="A",
                    present_days=40,
                    total_days=50,
                    absent_days=10,
                    attendance_percentage=80.0,
                    percentage=80.0,
                    status="Eligible"
                )
                db.session.add(new_att)

        # Update exams similarly
        exam_records = Exam.query.filter_by(student_id=student.id).all()
        for idx, ex in enumerate(exam_records):
            if idx < len(sem6_subjects):
                ex.subject = sem6_subjects[idx]
        
        if len(exam_records) < len(sem6_subjects):
            for i in range(len(exam_records), len(sem6_subjects)):
                new_ex = Exam(
                    student_id=student.id,
                    subject=sem6_subjects[i],
                    exam_date="18 Jun 2026",
                    hall_ticket_status="Ready"
                )
                db.session.add(new_ex)

        db.session.commit()
        print("Attendance and Exam strings synced!")

if __name__ == "__main__":
    sync_lakshmi_strings()
