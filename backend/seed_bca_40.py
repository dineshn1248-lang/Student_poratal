import os
import random
from app import create_app
from database import db
from models import Student, Parent, Subject, Mark

app = create_app()

with app.app_context():
    # 1. Migrate Computer Applications to BCA
    old_students = Student.query.filter_by(department='Computer Applications').all()
    for s in old_students:
        s.department = 'BCA'
    db.session.commit()
    
    # 2. Get all BCA students and ensure they are all Sem 6, Section A (for first 20)
    bca_students = Student.query.filter_by(department='BCA').all()
    print(f"Found {len(bca_students)} existing BCA students.")
    
    for i, s in enumerate(bca_students):
        s.semester = 6
        s.section = 'A' if i < 20 else 'B'
        
    db.session.commit()
    
    current_count = len(bca_students)
    target_count = 40
    
    # Create BCA Sem 6 Subjects if they don't exist
    subjects = Subject.query.filter_by(department='BCA', semester=6).all()
    if not subjects:
        sub_names = ["Machine Learning", "Cloud Computing", "Cyber Security", "Major Project"]
        for sn in sub_names:
            sub = Subject(subject_name=sn, subject_code=f"BCA60{sub_names.index(sn)+1}", department='BCA', semester=6)
            db.session.add(sub)
        db.session.commit()
        subjects = Subject.query.filter_by(department='BCA', semester=6).all()

    # Ensure existing BCA students have marks for Semester 6
    for s in bca_students:
        # check if they have marks for 6th sem subjects
        for sub in subjects:
            existing_mark = Mark.query.filter_by(student_id=s.id, subject_id=sub.id).first()
            if not existing_mark:
                m = Mark(
                    student_id=s.id,
                    subject_id=sub.id,
                    internal_marks=str(random.randint(25, 40)),
                    external_marks=str(random.randint(25, 60))
                )
                db.session.add(m)
    db.session.commit()
    
    # 3. Add more students to reach 40
    if current_count < target_count:
        num_to_add = target_count - current_count
        print(f"Adding {num_to_add} new BCA students to reach {target_count}.")
        
        base_reg = 260
        names = [
            "Amit Patel", "Priya Sharma", "Rahul Verma", "Sneha Reddy", "Vikram Singh",
            "Anjali Desai", "Karthik Nair", "Pooja Joshi", "Suresh Kumar", "Divya Menon",
            "Manoj Tiwari", "Kavya Iyer", "Arjun Das", "Megha Nambiar", "Nitin Rao",
            "Swati Pillai", "Rajesh Babu", "Neha Gupta", "Vivek Anand", "Shruti Bhat"
        ]
        
        for i in range(num_to_add):
            reg_no = f"U24AN23S0{base_reg + i}"
            name = names[i % len(names)] + f" {i}"
            
            section = 'A' if (current_count + i) < 20 else 'B'
            
            new_student = Student(
                register_no=reg_no,
                full_name=name,
                department='BCA',
                semester=6,
                section=section,
                email=f"bca{base_reg+i}@student.nrupathunga.edu",
                phone=f"98765{random.randint(10000, 99999)}",
                attendance_percent=random.randint(70, 95),
                fee_status=random.choice(["Paid", "Pending", "Partial"]),
                fee_pending=random.choice([0, 11500, 23000]),
                backlog_count=random.choice([0, 0, 0, 1, 2]),
                academic_status="Regular"
            )
            new_student.set_password('student123')
            db.session.add(new_student)
            db.session.flush() # get id
            
            # add parent
            parent = Parent(
                student_id=new_student.id,
                name=f"{name} Parent",
                relation="Father",
                phone_number=f"99887{random.randint(10000, 99999)}",
                email=f"parent{base_reg+i}@example.com"
            )
            db.session.add(parent)
            
            # add marks for 6th sem subjects
            for sub in subjects:
                m = Mark(
                    student_id=new_student.id,
                    subject_id=sub.id,
                    internal_marks=str(random.randint(25, 40)),
                    external_marks=str(random.randint(25, 60))
                )
                db.session.add(m)
                
        db.session.commit()
        print("Done adding students and assigning marks.")
