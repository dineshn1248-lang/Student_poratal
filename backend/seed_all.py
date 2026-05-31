import os
import random
from app import app, db
from models.faculty_model import Faculty, Notification, Staff

def seed_faculty():
    with app.app_context():
        print("Initializing production database v4...")
        db.create_all()
        
        # Clean existing
        db.session.query(Faculty).delete()
        db.session.query(Notification).delete()
        db.session.query(Staff).delete()

        # Seed HOD
        hod = Staff(username='hod@college.com', role='hod', full_name='Dr. K. Ramesh', department='Computer Applications')
        hod.set_password('hod123')
        db.session.add(hod)

        # 10 Faculty Records as per SPEC
        faculty_names = [
            ("Dr. K. Ramesh", "Professor & HOD", "Data Structures"),
            ("Prof. L. Priya", "Associate Professor", "Database Systems"),
            ("Prof. S. Arjun", "Assistant Professor", "Web Technologies"),
            ("Prof. M. Kavya", "Assistant Professor", "Software Engineering"),
            ("Prof. R. Mohan", "Assistant Professor", "Computer Networks"),
            ("Prof. T. Revathi", "Assistant Professor", "Operating Systems"),
            ("Mr. P. Lokesh", "Lab Instructor", "Programming Lab"),
            ("Prof. A. Sneha", "Assistant Professor", "Cloud Computing"),
            ("Prof. V. Nithin", "Assistant Professor", "Cyber Security"),
            ("Prof. R. Deepa", "Assistant Professor", "Machine Learning")
        ]

        for i, (name, desig, sub) in enumerate(faculty_names):
            f = Faculty(
                staff_id=f"F{i+1:03d}",
                full_name=name,
                designation=desig,
                department="Computer Applications",
                subject_assigned=sub,
                semester=random.choice(["II", "IV", "VI", "VIII"]),
                contact_phone=f"987654321{i}",
                email=f"{name.lower().replace(' ', '').replace('.', '')}@college.edu",
                attendance_percent=random.randint(85, 98),
                status="Active" if i != 5 else "On Leave",
                leave_status="None" if i != 5 else "Sick Leave",
                classes_today=random.randint(1, 4),
                pending_marks=random.randint(0, 10)
            )
            db.session.add(f)

        # Seed Notifications
        notifs = [
            Notification(title="Faculty Meeting", message="Meeting at 3PM today in HOD cabin."),
            Notification(title="Marks Entry", message="Please complete IA2 marks entry by tomorrow."),
            Notification(title="System Maintenance", message="Portal will be down at midnight.")
        ]
        db.session.add_all(notifs)

        db.session.commit()
        print("Database v4 seeded successfully with 10 faculty members!")

if __name__ == "__main__":
    seed_faculty()
