import datetime
import random
from app import app
from database import db
from models import Student, Parent, Subject, Mark, Attendance, Fee, Announcement, Notification

def seed_student_data():
    with app.app_context():
        print("Cleaning up student data...")
        db.session.query(Mark).delete()
        db.session.query(Attendance).delete()
        db.session.query(Fee).delete()
        db.session.query(Parent).delete()
        db.session.query(Student).delete()
        db.session.commit()

        departments = ["Computer Applications", "Computer Science", "Business Administration"]
        sections = ["A", "B"]
        semesters = [2, 4, 6]
        courses = {"Computer Applications": "BCA", "Computer Science": "BCS", "Business Administration": "BBA"}

        subjects_data = db.session.query(Subject).all()
        if not subjects_data:
            print("No subjects found. Please run main seeder first.")
            return

        print("Seeding students...")
        for i in range(1, 21):
            dept = random.choice(departments)
            course = courses[dept]
            sem = random.choice(semesters)
            section = random.choice(sections)
            
            student = Student(
                register_no=f"UAN2026{1000 + i}",
                name=f"Student {i}",
                dob=datetime.date(2004 + random.randint(0, 2), random.randint(1, 12), random.randint(1, 28)),
                gender=random.choice(["Male", "Female"]),
                blood_group=random.choice(["A+", "O+", "B+", "AB+"]),
                email=f"student{i}@university.com",
                phone_number=f"98765432{i:02d}",
                address=f"Street {i}, Nrupathunga University Area, Bangalore",
                department=dept,
                course=course,
                current_semester=sem,
                section=section,
                batch_year="2024-2027",
                admission_year=2024,
                category=random.choice(["GM", "OBC", "SC", "ST"]),
                attendance_percentage=random.randint(65, 95),
                academic_status="Regular" if random.random() > 0.15 else "Backlog",
                sgpa=random.uniform(7.0, 9.5),
                cgpa=random.uniform(7.0, 9.2)
            )
            student.set_password("password123")
            db.session.add(student)
            db.session.flush()

            # Parent
            parent = Parent(
                token=f"parent_token_{student.id}",
                student_id=student.id,
                name=f"Parent of {student.name}",
                relation=random.choice(["Father", "Mother"]),
                phone_number=f"90000000{i:02d}",
                email=f"parent{i}@email.com",
                occupation=random.choice(["Business", "Engineer", "Teacher", "Doctor"])
            )
            db.session.add(parent)

            # Fees
            total_fee = random.choice([45000, 55000, 65000])
            paid = random.choice([total_fee, total_fee - 5000, total_fee - 10000, 0])
            fee = Fee(
                student_id=student.id,
                fee_category="Academic",
                total_amount=total_fee,
                paid_amount=paid,
                pending_amount=total_fee - paid,
                payment_status="Paid" if paid == total_fee else ("Partial" if paid > 0 else "Pending"),
                due_date=datetime.datetime.now() + datetime.timedelta(days=30)
            )
            db.session.add(fee)

            # Marks & Attendance for each subject in their semester
            dept_subjects = [s for s in subjects_data if s.department == dept and s.semester == sem]
            for sub in dept_subjects:
                # Marks
                mark = Mark(
                    student_id=student.id,
                    subject_id=sub.id,
                    exam_type="Final",
                    marks_obtained=random.randint(30, 95),
                    max_marks=100,
                    grade="A" # Placeholder
                )
                db.session.add(mark)

                # Attendance Records (last 10 classes)
                for d in range(10):
                    att = Attendance(
                        student_id=student.id,
                        subject_id=sub.id,
                        date=datetime.date.today() - datetime.timedelta(days=d),
                        status=random.choice(["Present", "Present", "Present", "Absent"])
                    )
                    db.session.add(att)

        db.session.commit()
        print("Success: 20 Students seeded.")

if __name__ == "__main__":
    seed_student_data()
