import os
from app import create_app
from models import db, Student, Subject, Mark

def seed_manasa():
    app = create_app()
    with app.app_context():
        # Check if student exists
        student = Student.query.filter_by(register_no='U24AN23S0274').first()
        if not student:
            print("Creating student Manasa T V...")
            student = Student(
                student_id='U24AN23S0274',
                register_no='U24AN23S0274',
                full_name='Manasa T V',
                email='manasa@example.com',
                password_hash='pbkdf2:sha256:600000$dummy$hash',
                department='BCA',
                semester=6,  # Currently studying in 6th Sem
                section='A',
                attendance_percent=88.5,
                fee_pending=0,
                academic_status='Excellent',
                backlog_count=0,
                cgpa=7.23
            )
            db.session.add(student)
            db.session.commit()

        # V Semester Subjects from image
        subjects_data = [
            ("61509", "Design and Analysis of Algorithms", 5, 4, 100),
            ("61510", "Statistical Computing and R Programming", 5, 4, 100),
            ("61511", "Software Engineering", 5, 4, 100),
            ("61512", "Elective : Cloud Computing", 5, 3, 100),
            ("61513", "Vocational : Web Content Management System", 5, 3, 100),
            ("60536", "SEC : Cyber Security", 5, 2, 50),
            ("63509", "LAB : Design and Analysis of Algorithms Lab", 5, 2, 50),
            ("63510", "LAB : R Programming Lab", 5, 2, 50),
        ]

        # Insert subjects if they don't exist
        for code, name, sem, cred, max_m in subjects_data:
            subj = Subject.query.filter_by(subject_code=code).first()
            if not subj:
                subj = Subject(
                    subject_code=code,
                    subject_name=name,
                    semester=sem,
                    department='BCA',
                    credits=cred
                )
                db.session.add(subj)
        db.session.commit()

        # Insert V Semester Marks for Manasa
        marks_data = [
            ("61509", 28, 35, "A+"),
            ("61510", 29, 38, "A+"),
            ("61511", 21, 23, "C"),
            ("61512", 45, 30, "A++"),
            ("61513", 46, 35, "A++"),
            ("60536", 18, 20, "A++"),
            ("63509", 14, 18, "A+"),
            ("63510", 16, 22, "A++"),
        ]

        print("Adding Semester 5 marks...")
        for code, ext, int_m, grade in marks_data:
            subj = Subject.query.filter_by(subject_code=code).first()
            if subj:
                # Check if mark exists
                existing_mark = Mark.query.filter_by(student_id=student.id, subject_id=subj.id).first()
                if existing_mark:
                    existing_mark.internal_marks = int_m
                    existing_mark.external_marks = ext
                    existing_mark.grade = grade
                else:
                    new_mark = Mark(
                        student_id=student.id,
                        subject_id=subj.id,
                        internal_marks=int_m,
                        external_marks=ext,
                        grade=grade
                    )
                    db.session.add(new_mark)
        
        # Add some mock passing marks for Semesters 1 to 4 to establish history
        # just using dummy subjects for those semesters
        print("Adding history for Sem 1 to 4...")
        for s in range(1, 5):
            subj_code = f"MOCK{s}01"
            subj = Subject.query.filter_by(subject_code=subj_code).first()
            if not subj:
                subj = Subject(subject_code=subj_code, subject_name=f"Semester {s} Core", semester=s, department='BCA', credits=4)
                db.session.add(subj)
                db.session.commit()
            
            existing = Mark.query.filter_by(student_id=student.id, subject_id=subj.id).first()
            if not existing:
                mk = Mark(student_id=student.id, subject_id=subj.id, internal_marks=35, external_marks=45, grade="A+")
                db.session.add(mk)
        
        db.session.commit()
        print("Successfully added Manasa T V's details and marks!")

if __name__ == '__main__':
    seed_manasa()
