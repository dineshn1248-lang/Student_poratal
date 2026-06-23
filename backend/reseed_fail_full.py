import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '.')))

from app import create_app
from models import Student, Mark, Subject, db

app = create_app()

def calculate_grade_points(grade):
    pts = {'O': 10, 'A++': 9, 'A+': 8, 'A': 7, 'B+': 6, 'B': 5.5, 'C': 5, 'F': 0}
    return pts.get(grade, 0)

def reseed_failed_students_full():
    with app.app_context():
        # Specifically targeting Anjali Sharma and other students with backlogs
        target_students = Student.query.filter(
            db.or_(
                Student.register_no == "U24AN23S007",
                Student.backlog_count > 0,
                Student.academic_status == "Backlog"
            )
        ).all()
        
        results_data = [
            # Semester 1
            {"code": "60124", "name": "OE: Digital Electronics", "sem": 1, "credits": 3, "ia": 35, "see": 53, "total": 88, "grade": "O"},
            {"code": "61101", "name": "KANNADA - I", "sem": 1, "credits": 3, "ia": 36, "see": 50, "total": 86, "grade": "O"},
            {"code": "61103", "name": "Language English - I : Conversations - I", "sem": 1, "credits": 3, "ia": 28, "see": 36, "total": 64, "grade": "A+"},
            {"code": "61109", "name": "Fundamentals of Computer", "sem": 1, "credits": 3, "ia": 28, "see": 46, "total": 74, "grade": "A++"},
            {"code": "61110", "name": "Programming in C", "sem": 1, "credits": 3, "ia": 28, "see": 27, "total": 55, "grade": "A"},
            {"code": "61111", "name": "Accountancy / Mathematical Foundation", "sem": 1, "credits": 3, "ia": 35, "see": 40, "total": 75, "grade": "A++"},
            {"code": "70138", "name": "Value Based : Environmental Studies", "sem": 1, "credits": 2, "ia": 30, "see": 37, "total": 67, "grade": "A+"},
            {"code": "63109", "name": "LAB : C Programming", "sem": 1, "credits": 2, "ia": 14, "see": 12, "total": 26, "grade": "B+", "max": 50},
            {"code": "63110", "name": "LAB : Information Technology", "sem": 1, "credits": 2, "ia": 22, "see": 25, "total": 47, "grade": "O", "max": 50},
            {"code": "61113", "name": "Yoga", "sem": 1, "credits": 1, "ia": 20, "see": 0, "total": 20, "grade": "A++", "max": 25},

            # Semester 2
            {"code": "60224", "name": "Electronics OE: Consumer Electronics", "sem": 2, "credits": 3, "ia": 20, "see": 47, "total": 67, "grade": "A+"},
            {"code": "61201", "name": "Kannada-II : Kannada Basha Patrike", "sem": 2, "credits": 3, "ia": 30, "see": 42, "total": 72, "grade": "A++"},
            {"code": "61203", "name": "English-II : Conversations-2", "sem": 2, "credits": 3, "ia": 14, "see": 34, "total": 48, "grade": "B"},
            {"code": "61209", "name": "Data Structures using C", "sem": 2, "credits": 3, "ia": 30, "see": 26, "total": 56, "grade": "A"},
            {"code": "61210", "name": "Object Oriented Concepts using Java", "sem": 2, "credits": 3, "ia": 25, "see": 33, "total": 58, "grade": "A"},
            {"code": "61211", "name": "Discrete Mathematical Structures", "sem": 2, "credits": 3, "ia": 26, "see": 45, "total": 71, "grade": "A++"},
            {"code": "60237", "name": "SEC : Digital Fluency", "sem": 2, "credits": 2, "ia": 19, "see": 15, "total": 34, "grade": "A+", "max": 50},
            {"code": "63209", "name": "Lab : Data Structures", "sem": 2, "credits": 2, "ia": 17, "see": 21, "total": 38, "grade": "A++", "max": 50},
            {"code": "63210", "name": "Lab : Java Lab", "sem": 2, "credits": 2, "ia": 21, "see": 18, "total": 39, "grade": "A++", "max": 50},
            {"code": "60252", "name": "SEC Co-Curriicular Activity : Campus to Community C2C", "sem": 2, "credits": 2, "ia": 13, "see": 0, "total": 13, "grade": "B+", "max": 25},

            # Semester 3
            {"code": "60343", "name": "AEC: India and Indian Constitution", "sem": 3, "credits": 3, "ia": 37, "see": 36, "total": 73, "grade": "A++"},
            {"code": "61301", "name": "KANNADA-III", "sem": 3, "credits": 3, "ia": 34, "see": 50, "total": 84, "grade": "A++"},
            {"code": "61302", "name": "Language English - III", "sem": 3, "credits": 3, "ia": 30, "see": 27, "total": 57, "grade": "A"},
            {"code": "61309", "name": "Database Management Systems", "sem": 3, "credits": 3, "ia": 25, "see": 24, "total": 49, "grade": "B"},
            {"code": "61310", "name": "C# and DOT NET Framework", "sem": 3, "credits": 3, "ia": 26, "see": 34, "total": 60, "grade": "A+"},
            {"code": "61311", "name": "Computer Communication and Networks", "sem": 3, "credits": 3, "ia": 28, "see": 39, "total": 67, "grade": "A+"},
            {"code": "60326", "name": "SEC : Financial Education and Investment Awareness", "sem": 3, "credits": 2, "ia": 17, "see": 18, "total": 35, "grade": "A++", "max": 50},
            {"code": "63309", "name": "LAB: DBMS", "sem": 3, "credits": 2, "ia": 13, "see": 21, "total": 34, "grade": "A+", "max": 50},
            {"code": "63310", "name": "LAB: C# and DOT NET Framework", "sem": 3, "credits": 2, "ia": 20, "see": 17, "total": 37, "grade": "A++", "max": 50},
            {"code": "60338", "name": "SEC Co-Curricular Activity : C2C (Community Service)", "sem": 3, "credits": 2, "ia": 20, "see": 0, "total": 20, "grade": "A++", "max": 25},

            # Semester 4
            {"code": "60454", "name": "OE : Floriculture", "sem": 4, "credits": 3, "ia": 32, "see": 28, "total": 60, "grade": "A+"},
            {"code": "61401", "name": "Kannada - IV : Kannada bBasha Patrike", "sem": 4, "credits": 3, "ia": 38, "see": 46, "total": 84, "grade": "A++"},
            {"code": "61403", "name": "English - IV : Conversations-4", "sem": 4, "credits": 3, "ia": 27, "see": 31, "total": 58, "grade": "A"},
            {"code": "61409", "name": "Python Programming", "sem": 4, "credits": 3, "ia": 32, "see": 33, "total": 65, "grade": "A+"},
            {"code": "61410", "name": "Computer Multimedia and Animation", "sem": 4, "credits": 3, "ia": 25, "see": 21, "total": 46, "grade": "B"},
            {"code": "61411", "name": "Operating Systems Concepts", "sem": 4, "credits": 3, "ia": 25, "see": 28, "total": 53, "grade": "B+"},
            {"code": "60447", "name": "SEC : Artificial Intelligence", "sem": 4, "credits": 2, "ia": 18, "see": 13, "total": 31, "grade": "A+", "max": 50},
            {"code": "63409", "name": "LAB: Python Programming", "sem": 4, "credits": 2, "ia": 20, "see": 22, "total": 42, "grade": "A++", "max": 50},
            {"code": "63410", "name": "LAB: Multimedia and Animation", "sem": 4, "credits": 2, "ia": 22, "see": 23, "total": 45, "grade": "O", "max": 50},
            {"code": "60445", "name": "SEC Co-Curricular Activity : Campus 2 Community (C2C)", "sem": 4, "credits": 2, "ia": 25, "see": 0, "total": 25, "grade": "O", "max": 25},

            # Semester 5
            {"code": "61509", "name": "Design and Analysis of Algorithms", "sem": 5, "credits": 4, "ia": 35, "see": 35, "total": 70, "grade": "A++"},
            {"code": "61510", "name": "Statistical Computing and R Programming", "sem": 5, "credits": 4, "ia": 36, "see": 37, "total": 73, "grade": "A++"},
            {"code": "61511", "name": "Software Engineering", "sem": 5, "credits": 4, "ia": 25, "see": 24, "total": 49, "grade": "B"},
            {"code": "61512", "name": "Elective : Cloud Computing", "sem": 5, "credits": 3, "ia": 25, "see": 48, "total": 73, "grade": "A++"},
            {"code": "61513", "name": "Vocational : Web Content Management System", "sem": 5, "credits": 3, "ia": 28, "see": 37, "total": 65, "grade": "A+"},
            {"code": "60536", "name": "SEC : Cyber Security", "sem": 5, "credits": 3, "ia": 20, "see": 20, "total": 40, "grade": "A++", "max": 50},
            {"code": "63509", "name": "LAB : Design and Analysis of Algorithms Lab", "sem": 5, "credits": 2, "ia": 17, "see": 20, "total": 37, "grade": "A++", "max": 50},
            {"code": "63510", "name": "LAB : R Programming Lab", "sem": 5, "credits": 2, "ia": 21, "see": 21, "total": 42, "grade": "A++", "max": 50}
        ]

        for row in results_data:
            sub = Subject.query.filter_by(subject_code=row["code"]).first()
            if not sub:
                sub = Subject(subject_code=row["code"], subject_name=row["name"], department="Computer Applications", semester=row["sem"], credits=row["credits"])
                db.session.add(sub)
        db.session.commit()

        for student in target_students:
            Mark.query.filter_by(student_id=student.id).delete()
            db.session.commit()

            total_credit_points = 0
            total_credits = 0
            
            for row in results_data:
                sub = Subject.query.filter_by(subject_code=row["code"]).first()
                
                ia_marks = row["ia"]
                see_marks = row["see"]
                total = row["total"]
                grade = row["grade"]
                
                # Logic to fail subjects in SEMESTER 1 so the user sees it immediately on the first tab
                if student.register_no == "U24AN23S007":
                    if row["code"] in ["61109", "61110"]: # Fails Fundamentals and C in Sem 1
                        see_marks = 15 # Failed
                        total = ia_marks + see_marks
                        grade = 'F'
                else:
                    if row["code"] in ["61109"]: # Fails Fundamentals in Sem 1
                        see_marks = 18
                        total = ia_marks + see_marks
                        grade = 'F'
                        
                mark = Mark(
                    student_id=student.id,
                    subject_id=sub.id,
                    exam_type="Final",
                    marks_obtained=total,
                    max_marks=row.get("max", 100),
                    grade=grade,
                    internal_marks=ia_marks,
                    external_marks=see_marks
                )
                db.session.add(mark)
                
                if grade != 'F':
                    pts = calculate_grade_points(grade)
                    total_credit_points += (pts * row["credits"])
                total_credits += row["credits"]

            if total_credits > 0:
                student.cgpa = round(total_credit_points / total_credits, 2)
            
            student.academic_status = "Backlog"
            student.backlog_count = 2 if student.register_no == "U24AN23S007" else 1
            student.result_status = "FAILED"
            db.session.add(student)

        db.session.commit()
        print("[SEED] Successfully re-seeded full 5 semesters with fails in Semester 1.")

if __name__ == "__main__":
    reseed_failed_students_full()
