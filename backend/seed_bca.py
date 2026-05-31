import os
import random
from app import create_app
from models import db, Student, Mark, Subject, Parent

app = create_app()

# 3 named + 17 random Indian names
student_names = [
    "Lakshmi", "Dinesh", "Chetan",
    "Arjun", "Priya", "Rahul", "Kavya", "Aditya", "Neha", "Vikram",
    "Sneha", "Kiran", "Pooja", "Rohan", "Anjali", "Siddharth", "Meera",
    "Amit", "Swati", "Varun"
]

with app.app_context():
    print("Starting to seed BCA students...")
    
    # Check if we have subjects, if not create dummy ones for BCA
    bca_subjects = Subject.query.filter_by(department='BCA').all()
    if not bca_subjects:
        subs = [
            Subject(subject_code='BCA101', subject_name='Programming in C', department='BCA', semester=1, credits=4),
            Subject(subject_code='BCA102', subject_name='Mathematics I', department='BCA', semester=1, credits=4),
            Subject(subject_code='BCA103', subject_name='Computer Fundamentals', department='BCA', semester=1, credits=3),
            Subject(subject_code='BCA104', subject_name='Digital Electronics', department='BCA', semester=1, credits=3),
            Subject(subject_code='BCA105', subject_name='C Programming Lab', department='BCA', semester=1, credits=2),
            Subject(subject_code='BCA106', subject_name='IT Lab', department='BCA', semester=1, credits=2),
        ]
        db.session.add_all(subs)
        db.session.commit()
        bca_subjects = subs
        print("Created BCA subjects.")

    added_students = 0
    for i, name in enumerate(student_names):
        reg_no = f"U24BCA{1000 + i}"
        
        # Check if student exists
        existing = Student.query.filter_by(register_no=reg_no).first()
        if existing:
            continue
            
        attendance = random.randint(65, 98)
        
        student = Student(
            register_no=reg_no,
            full_name=name,
            department='BCA',
            semester=1,
            section=random.choice(['A', 'B']),
            attendance_percent=attendance,
            fee_pending=random.choice([0.0, 5000.0, 15000.0]),
            fee_status='Paid' if random.random() > 0.3 else 'Pending',
            backlog_count=0,
            academic_status='Active',
            email=f"{name.lower()}@student.nrupathunga.edu",
            phone=f"9{random.randint(100000000, 999999999)}"
        )
        student.set_password("password123")
        db.session.add(student)
        db.session.flush() # To get the student.id
        
        # Add parent
        parent = Parent(
            student_id=student.id,
            parent_id=f"parent_{reg_no}",
            token=f"parent_{reg_no}",
            linked_student_id=reg_no,
            name=f"{name}'s Parent",
            phone_number=f"9{random.randint(100000000, 999999999)}",
            email=f"parent.{name.lower()}@example.com"
        )
        parent.set_password("parent123")
        db.session.add(parent)
        
        # Add marks
        has_backlog = False
        for sub in bca_subjects:
            # 20% chance of getting lower marks
            if random.random() > 0.8:
                internal = random.randint(10, 25)
                external = random.randint(15, 30)
            else:
                internal = random.randint(25, 40)
                external = random.randint(35, 60)
                
            total = internal + external
            is_pass = (external >= 21) and (total >= 40)
            if not is_pass:
                has_backlog = True
                
            mark = Mark(
                student_id=student.id,
                subject_id=sub.id,
                internal_marks=internal,
                external_marks=external
            )
            db.session.add(mark)
            
        if has_backlog:
            student.backlog_count = 1
            
        added_students += 1

    db.session.commit()
    print(f"Successfully seeded {added_students} BCA students with marks and parent records!")
