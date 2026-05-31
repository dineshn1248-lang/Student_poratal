from app import create_app
from models import db, Student, Subject

app = create_app()

with app.app_context():
    # Update students
    bca_students = Student.query.filter_by(department='BCA').all()
    for s in bca_students:
        s.semester = 5
        
    # Update subjects
    bca_subjects = Subject.query.filter_by(department='BCA').all()
    for sub in bca_subjects:
        sub.semester = 5
        
    db.session.commit()
    print("Updated BCA students and subjects to semester 5.")
