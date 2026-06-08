import os
from app import create_app
from database import db
from models import Student, Attendance, Mark, ExamRegistration, Exam, Placement
import random

app = create_app()

with app.app_context():
    # 1. Update Schema by calling create_all
    db.create_all()

    # 2. Wipe existing data
    db.session.query(Placement).delete()
    db.session.query(ExamRegistration).delete()
    db.session.query(Exam).delete()
    db.session.query(Mark).delete()
    db.session.query(Attendance).delete()
    db.session.query(Student).delete()
    db.session.commit()

    print("Wiped existing student data.")

    # 3. Seed exactly 21 students
    # 16 Passed, 5 Failed
    # Lakshmi is #21 and Failed
    
    first_names = ["Arjun", "Neha", "Rahul", "Priya", "Karthik", "Sneha", "Aditya", "Riya", "Vikram", "Anjali", "Rohan", "Meera", "Siddharth", "Pooja", "Varun", "Shruti", "Sanjay", "Kavya", "Deepak", "Aishwarya"]
    last_names = ["Sharma", "Patil", "Reddy", "Gowda", "Iyer", "Rao", "Menon", "Desai", "Joshi", "Nair"]

    statuses = ['PASSED'] * 16 + ['FAILED'] * 4 # 20 students, the 21st is Lakshmi (Failed)
    random.shuffle(statuses)
    
    students_to_add = []
    
    for i in range(1, 21):
        reg_no = f"U24AN23S{i:03d}"
        full_name = f"{random.choice(first_names)} {random.choice(last_names)}"
        status = statuses[i-1]
        
        s = Student(
            register_no=reg_no,
            student_id=reg_no,
            full_name=full_name,
            email=f"{reg_no.lower()}@college.com",
            department="BCA",
            course="BCA",
            semester=6,
            section="A",
            attendance_percent=random.randint(65, 95) if status == 'PASSED' else random.randint(40, 70),
            cgpa=random.uniform(6.0, 9.5) if status == 'PASSED' else random.uniform(3.0, 4.5),
            backlog_count=0 if status == 'PASSED' else random.randint(1, 4),
            result_status=status
        )
        s.set_password('password123')
        students_to_add.append(s)

    # 21st student: Lakshmi
    lakshmi = Student(
        register_no="U24AN23S021",
        student_id="U24AN23S021",
        full_name="Lakshmi Nisimappa Chakrasali",
        email="lakshmi@college.com",
        department="BCA",
        course="BCA",
        semester=6,
        section="A",
        attendance_percent=55,
        cgpa=3.8,
        backlog_count=2,
        result_status="FAILED"
    )
    lakshmi.set_password('password123')
    students_to_add.append(lakshmi)

    db.session.add_all(students_to_add)
    db.session.commit()

    print("Seeded 21 students.")

    # Seed mock placements for some of the passed students
    passed_students = [s for s in students_to_add if s.result_status == 'PASSED']
    placements_to_add = []
    companies = [("TCS", "4.5 LPA"), ("Infosys", "4.0 LPA"), ("Wipro", "3.5 LPA"), ("Cognizant", "4.0 LPA"), ("Accenture", "4.5 LPA")]
    
    for s in passed_students[:10]: # Place 10 students
        comp = random.choice(companies)
        p = Placement(
            student_id=s.id,
            company_name=comp[0],
            package=comp[1],
            placement_date="2025-05-15"
        )
        placements_to_add.append(p)

    db.session.add_all(placements_to_add)
    db.session.commit()

    print("Seeded placements.")
    print("Database seeding completed successfully.")
