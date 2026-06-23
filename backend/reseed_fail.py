import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '.')))

from app import create_app
from models import Student, Mark, Subject, db

app = create_app()

def calculate_grade(marks):
    if marks >= 90: return 'O'
    if marks >= 80: return 'A++'
    if marks >= 70: return 'A+'
    if marks >= 60: return 'A'
    if marks >= 55: return 'B+'
    if marks >= 50: return 'B'
    if marks >= 40: return 'C'
    return 'F'

def calculate_grade_points(grade):
    pts = {'O': 10, 'A++': 9, 'A+': 8, 'A': 7, 'B+': 6, 'B': 5.5, 'C': 5, 'F': 0}
    return pts.get(grade, 0)

def reseed_failed_students():
    with app.app_context():
        # Specifically targeting Anjali Sharma and other students with backlogs
        target_students = Student.query.filter(
            db.or_(
                Student.register_no == "U24AN23S007",
                Student.backlog_count > 0,
                Student.academic_status == "Backlog"
            )
        ).all()
        
        sem_subjects = {
            1: [("61109", "Fundamentals of Computer", 3), ("61110", "Programming in C", 3), ("61111", "Mathematical Foundation", 3)],
            2: [("61209", "Data Structures using C", 3), ("61210", "Object Oriented Concepts using Java", 3), ("61211", "Discrete Mathematical Structures", 3)],
            3: [("61309", "Database Management Systems", 3), ("61310", "C# and DOT NET Framework", 3), ("61311", "Computer Communication and Networks", 3)],
            4: [("61409", "Python Programming", 3), ("61410", "Computer Multimedia and Animation", 3), ("61411", "Operating Systems Concepts", 3)],
            5: [("61509", "Design and Analysis of Algorithms", 4), ("61510", "Statistical Computing and R Programming", 4), ("61511", "Software Engineering", 4)]
        }

        for student in target_students:
            Mark.query.filter_by(student_id=student.id).delete()
            db.session.commit()

            total_credit_points = 0
            total_credits = 0
            
            for sem, subjects in sem_subjects.items():
                for code, name, credits in subjects:
                    sub = Subject.query.filter_by(subject_code=code).first()
                    
                    # Default: Pass
                    ia_marks = 30
                    see_marks = 40
                    
                    # Logic to fail subjects in SEMESTER 1 so the user sees it immediately on the first tab
                    if student.register_no == "U24AN23S007":
                        if code in ["61109", "61110"]: # Fails Fundamentals and C in Sem 1
                            see_marks = 15 # Failed
                    else:
                        if code in ["61109"]: # Fails Fundamentals in Sem 1
                            see_marks = 18

                    total = ia_marks + see_marks
                    grade = calculate_grade(total)
                    if see_marks < 20: 
                        grade = 'F'
                        
                    mark = Mark(
                        student_id=student.id,
                        subject_id=sub.id,
                        exam_type="Final",
                        marks_obtained=total,
                        max_marks=100,
                        grade=grade,
                        internal_marks=ia_marks,
                        external_marks=see_marks
                    )
                    db.session.add(mark)
                    
                    if grade != 'F':
                        pts = calculate_grade_points(grade)
                        total_credit_points += (pts * credits)
                    total_credits += credits

            if total_credits > 0:
                student.cgpa = round(total_credit_points / total_credits, 2)
            
            student.academic_status = "Backlog"
            student.backlog_count = 2 if student.register_no == "U24AN23S007" else 1
            # Update student result_status so overall it shows as FAILED if they have backlogs
            student.result_status = "FAILED"
            db.session.add(student)

        db.session.commit()
        print("[SEED] Successfully re-seeded to fail students in Semester 1.")

if __name__ == "__main__":
    reseed_failed_students()
