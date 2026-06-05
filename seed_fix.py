import os

filepath = 'backend/init_db.py'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add Lakshmi to the students
old_str = '("BCA008", "Rahul J", "BCA", 1, 78),'
new_str = '("BCA008", "Rahul J", "BCA", 1, 78),\n            ("BCA009", "Lakshmi Nisimappa Chakrasali", "BCA", 4, 88),'
content = content.replace(old_str, new_str)

# 2. Add Subject and Mark objects just before db.session.commit()
seed_logic = """
        # ── SUBJECTS AND MARKS ─────────────────────────────────────────────
        from models import Subject, Mark
        subjects_data = [
            ("SUB01", "Software Engineering", 4, "BCA", 4),
            ("SUB02", "Database Management Systems", 4, "BCA", 4),
            ("SUB03", "Computer Networks", 4, "BCA", 4),
            ("SUB04", "Python Programming", 4, "BCA", 3),
        ]
        
        added_subjects = []
        for s_code, s_name, sem, dept, cred in subjects_data:
            sub = Subject(subject_code=s_code, subject_name=s_name, semester=sem, department=dept, credits=cred)
            db.session.add(sub)
            added_subjects.append(sub)
        
        db.session.flush()

        # Add marks for all BCA students
        bca_students = Student.query.filter_by(department="BCA").all()
        import random
        for stu in bca_students:
            # Randomize backlog for some
            has_backlog = (stu.attendance_percent < 75)
            
            for sub in added_subjects:
                if has_backlog and random.choice([True, False]):
                    # Fail mark
                    internal = random.randint(10, 20)
                    external = random.randint(10, 20)
                    grade = "F"
                else:
                    # Pass mark
                    internal = random.randint(35, 50)
                    external = random.randint(35, 50)
                    grade = "A" if (internal+external)>85 else ("B" if (internal+external)>70 else "C")
                    
                m = Mark(
                    student_id=stu.id,
                    subject_id=sub.id,
                    internal_marks=str(internal),
                    external_marks=str(external),
                    total_marks=str(internal+external),
                    grade=grade
                )
                db.session.add(m)
        
        db.session.add_all(alerts)
"""

content = content.replace("db.session.add_all(alerts)", seed_logic)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated init_db.py")
