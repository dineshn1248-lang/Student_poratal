import os
import sys
import json

# Add backend directory to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import create_app
from models import db, Student, Subject, Mark

app = create_app()

sem_data = {
    "I": {
        "published_date": "19-05-25 AT 11:03",
        "sgpa": 7.65,
        "cgpa": 7.65,
        "result": "PASS",
        "subjects": [
            {"code": "60124", "name": "OE : Digital Electronics", "credits": 3, "ia": 35, "see": 53, "total": 88, "grade": "O", "points": 9, "status": "Pass"},
            {"code": "61101", "name": "KANNADA - I", "credits": 3, "ia": 36, "see": 50, "total": 86, "grade": "O", "points": 9, "status": "Pass"},
            {"code": "61103", "name": "Language English - I : Conversations - I", "credits": 3, "ia": 28, "see": 36, "total": 64, "grade": "A+", "points": 6.5, "status": "Pass"},
            {"code": "61109", "name": "Fundamentals of Computer", "credits": 3, "ia": 28, "see": 46, "total": 74, "grade": "A++", "points": 7.5, "status": "Pass"},
            {"code": "61110", "name": "Programming in C", "credits": 3, "ia": 28, "see": 27, "total": 55, "grade": "A", "points": 6, "status": "Pass"},
            {"code": "61111", "name": "Accountancy / Mathematical Foundation", "credits": 3, "ia": 35, "see": 40, "total": 75, "grade": "A++", "points": 8, "status": "Pass"},
            {"code": "70138", "name": "Value Based : Environmental Studies", "credits": 2, "ia": 30, "see": 37, "total": 67, "grade": "A+", "points": 7, "status": "Pass"},
            {"code": "63109", "name": "LAB : C Programming", "credits": 2, "ia": 14, "see": 12, "total": 26, "grade": "B+", "points": 5.5, "status": "Pass"},
            {"code": "63110", "name": "LAB : Information Technology", "credits": 2, "ia": 22, "see": 25, "total": 47, "grade": "O", "points": 9.5, "status": "Pass"},
            {"code": "61113", "name": "Yoga", "credits": 1, "ia": 20, "see": 0, "total": 20, "grade": "A++", "points": 8.5, "status": "Pass"}
        ]
    },
    "II": {
        "published_date": "13-11-24 AT 12:45",
        "sgpa": 6.69,
        "cgpa": 7.17,
        "result": "PASS",
        "subjects": [
            {"code": "60224", "name": "Electronics OE : Consumer Electronics", "credits": 3, "ia": 20, "see": 47, "total": 67, "grade": "A+", "points": 7, "status": "Pass"},
            {"code": "61201", "name": "Kannada-II : Kannada Basha Patrike", "credits": 3, "ia": 30, "see": 42, "total": 72, "grade": "A++", "points": 7.5, "status": "Pass"},
            {"code": "61203", "name": "English-II : Conversations-2", "credits": 3, "ia": 14, "see": 34, "total": 48, "grade": "B", "points": 5, "status": "Pass"},
            {"code": "61209", "name": "Data Structures using C", "credits": 3, "ia": 30, "see": 26, "total": 56, "grade": "A", "points": 6, "status": "Pass"},
            {"code": "61210", "name": "Object Oriented Concepts using Java", "credits": 3, "ia": 25, "see": 33, "total": 58, "grade": "A", "points": 6, "status": "Pass"},
            {"code": "61211", "name": "Discrete Mathematical Structures", "credits": 3, "ia": 26, "see": 45, "total": 71, "grade": "A++", "points": 7.5, "status": "Pass"},
            {"code": "60237", "name": "SEC : Digital Fluency", "credits": 2, "ia": 19, "see": 15, "total": 34, "grade": "A+", "points": 7, "status": "Pass"},
            {"code": "63209", "name": "Lab : Data Structures", "credits": 2, "ia": 17, "see": 21, "total": 38, "grade": "A++", "points": 8, "status": "Pass"},
            {"code": "63210", "name": "Lab : Java Lab", "credits": 2, "ia": 21, "see": 18, "total": 39, "grade": "A++", "points": 8, "status": "Pass"},
            {"code": "60252", "name": "SEC Co-Curricular Activity : Campus to Community C2C", "credits": 2, "ia": 13, "see": 0, "total": 13, "grade": "B+", "points": 5.5, "status": "Pass"}
        ]
    },
    "III": {
        "published_date": "10-04-25 AT 10:00",
        "sgpa": 7.50,
        "cgpa": 7.25,
        "result": "PASS",
        "subjects": [
            {"code": "61301", "name": "DBMS", "credits": 4, "ia": 35, "see": 50, "total": 85, "grade": "O", "points": 9, "status": "Pass"},
            {"code": "61302", "name": "C# and Dot Net", "credits": 4, "ia": 32, "see": 45, "total": 77, "grade": "A++", "points": 8, "status": "Pass"},
            {"code": "61303", "name": "Computer Networks", "credits": 3, "ia": 28, "see": 42, "total": 70, "grade": "A+", "points": 7, "status": "Pass"},
            {"code": "61304", "name": "Software Engineering", "credits": 3, "ia": 25, "see": 35, "total": 60, "grade": "A", "points": 6.5, "status": "Pass"},
            {"code": "61305", "name": "Digital Logic", "credits": 3, "ia": 30, "see": 40, "total": 70, "grade": "A+", "points": 7, "status": "Pass"},
            {"code": "63309", "name": "LAB : DBMS", "credits": 2, "ia": 20, "see": 25, "total": 45, "grade": "O", "points": 9.5, "status": "Pass"}
        ]
    },
    "IV": {
        "published_date": "21-08-25 AT 16:46",
        "sgpa": 7.1,
        "cgpa": 7.12,
        "result": "PASS",
        "subjects": [
            {"code": "60454", "name": "OE : Floriculture", "credits": 3, "ia": 32, "see": 28, "total": 60, "grade": "A+", "points": 6.5, "status": "Pass"},
            {"code": "61401", "name": "Kannada - IV : Kannada bBasha Patrike", "credits": 3, "ia": 38, "see": 46, "total": 84, "grade": "A++", "points": 8.5, "status": "Pass"},
            {"code": "61403", "name": "English - IV : Conversations-4", "credits": 3, "ia": 27, "see": 31, "total": 58, "grade": "A", "points": 6, "status": "Pass"},
            {"code": "61409", "name": "Python Programming", "credits": 3, "ia": 32, "see": 33, "total": 65, "grade": "A+", "points": 7, "status": "Pass"},
            {"code": "61410", "name": "Computer Multimedia and Animation", "credits": 3, "ia": 25, "see": 21, "total": 46, "grade": "B", "points": 5, "status": "Pass"},
            {"code": "61411", "name": "Operating Systems Concepts", "credits": 3, "ia": 25, "see": 28, "total": 53, "grade": "B+", "points": 5.5, "status": "Pass"},
            {"code": "60447", "name": "SEC : Artificial Intelligence", "credits": 2, "ia": 18, "see": 13, "total": 31, "grade": "A+", "points": 6.5, "status": "Pass"},
            {"code": "63409", "name": "LAB: Python Programming", "credits": 2, "ia": 20, "see": 22, "total": 42, "grade": "A++", "points": 8.5, "status": "Pass"},
            {"code": "63410", "name": "LAB: Multimedia and Animation", "credits": 2, "ia": 22, "see": 23, "total": 45, "grade": "O", "points": 9.5, "status": "Pass"},
            {"code": "60445", "name": "SEC Co-Curriicular Activity: Campus 2 Community (C2C)", "credits": 2, "ia": 25, "see": 0, "total": 25, "grade": "O", "points": 10, "status": "Pass"}
        ]
    },
    "V": {
        "published_date": "28-02-26 AT 11:44",
        "sgpa": 7.24,
        "cgpa": 7.14,
        "result": "PASS",
        "subjects": [
            {"code": "61509", "name": "Design and Analysis of Algorithms", "credits": 4, "ia": 35, "see": 35, "total": 70, "grade": "A++", "points": 7.5, "status": "Pass"},
            {"code": "61510", "name": "Statistical Computing and R Programming", "credits": 4, "ia": 36, "see": 37, "total": 73, "grade": "A++", "points": 7.5, "status": "Pass"},
            {"code": "61511", "name": "Software Engineering", "credits": 4, "ia": 25, "see": 24, "total": 49, "grade": "B", "points": 5, "status": "Pass"},
            {"code": "61512", "name": "Elective : Cloud Computing", "credits": 3, "ia": 25, "see": 48, "total": 73, "grade": "A++", "points": 7.5, "status": "Pass"},
            {"code": "61513", "name": "Vocational : Web Content Management System", "credits": 3, "ia": 28, "see": 37, "total": 65, "grade": "A+", "points": 7, "status": "Pass"},
            {"code": "60536", "name": "SEC : Cyber Security", "credits": 3, "ia": 20, "see": 20, "total": 40, "grade": "A++", "points": 8.5, "status": "Pass"},
            {"code": "63509", "name": "LAB : Design and Analysis of Algorithms Lab", "credits": 2, "ia": 17, "see": 20, "total": 37, "grade": "A++", "points": 7.5, "status": "Pass"},
            {"code": "63510", "name": "LAB : R Programming Lab", "credits": 2, "ia": 21, "see": 21, "total": 42, "grade": "A++", "points": 8.5, "status": "Pass"}
        ]
    }
}

with app.app_context():
    student = Student.query.filter(Student.full_name.ilike('%Meera%')).first()
    if not student:
        # Create Meera if she does not exist
        print(f"Meera Gowda not found! Creating her...")
        student = Student(
            register_no="U24AN23S0888",
            full_name="Meera Gowda",
            department="Computer Applications",
            course="BCA",
            semester=6,
            section="A"
        )
        student.set_password('password123')
        db.session.add(student)
        db.session.flush()
        
    print(f"Found student: {student.full_name} ({student.register_no})")
    
    # Clear old marks for these semesters
    for sem in sem_data.keys():
        # Convert "I" -> 1, "II" -> 2, etc.
        sem_num_map = {"I": 1, "II": 2, "III": 3, "IV": 4, "V": 5}
        sem_num = sem_num_map.get(sem, 1)
        
        subjects_in_sem = Subject.query.filter_by(semester=sem_num).all()
        sub_ids = [s.id for s in subjects_in_sem]
        if sub_ids:
            Mark.query.filter(Mark.student_id == student.id, Mark.subject_id.in_(sub_ids)).delete(synchronize_session=False)

    for sem, data in sem_data.items():
        sem_num = sem_num_map.get(sem, 1)
        
        for sub_data in data["subjects"]:
            # Ensure subject exists
            subject = Subject.query.filter_by(subject_code=sub_data["code"]).first()
            if not subject:
                subject = Subject(
                    subject_name=sub_data["name"],
                    subject_code=sub_data["code"],
                    semester=sem_num,
                    credits=sub_data["credits"],
                    department="Computer Applications"
                )
                db.session.add(subject)
                db.session.flush()
                
            # Create Mark
            mark = Mark(
                student_id=student.id,
                subject_id=subject.id,
                exam_type="Regular",
                marks_obtained=sub_data["total"],
                max_marks=100 if "LAB" not in sub_data["name"].upper() else 50 if "Yoga" not in sub_data["name"] else 25,
                grade=sub_data["grade"],
                internal_marks=sub_data["ia"],
                external_marks=sub_data["see"]
            )
            db.session.add(mark)
            
    db.session.commit()
    print("Marks for Meera Gowda updated successfully for Sem 1-5!")
