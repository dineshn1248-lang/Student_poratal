import json
from app import create_app
from database import db
from models import Student, Attendance, Mark, ExamRegistration, Exam

app = create_app()

def row2dict(row):
    d = {}
    for column in row.__table__.columns:
        val = getattr(row, column.name)
        if hasattr(val, 'isoformat'):
            d[column.name] = val.isoformat()
        else:
            d[column.name] = val
    return d

with app.app_context():
    # Export Students
    students = [row2dict(s) for s in Student.query.all()]
    with open('backup_students.json', 'w') as f:
        json.dump(students, f, indent=2)

    # Export Attendance
    attendance = [row2dict(a) for a in Attendance.query.all()]
    with open('backup_attendance.json', 'w') as f:
        json.dump(attendance, f, indent=2)

    # Export Marks
    marks = [row2dict(m) for m in Mark.query.all()]
    with open('backup_marks.json', 'w') as f:
        json.dump(marks, f, indent=2)

    # Export Exams
    exams = [row2dict(e) for e in Exam.query.all()]
    with open('backup_exams.json', 'w') as f:
        json.dump(exams, f, indent=2)

    # Export Exam Registrations
    exam_regs = [row2dict(er) for er in ExamRegistration.query.all()]
    with open('backup_exam_registrations.json', 'w') as f:
        json.dump(exam_regs, f, indent=2)

    print("Successfully exported existing data to backup_*.json files.")
