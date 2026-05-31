# ─────────────────────────────────────────────────────────────────────────────
# add_student.py  –  Add a single student to the database with active records
# Usage: Run "python add_student.py" inside the backend/ folder.
# ─────────────────────────────────────────────────────────────────────────────

import os
import sys
from werkzeug.security import generate_password_hash
from datetime import datetime, timedelta

# Add current directory to path
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

from app import create_app
from database import db
from models import Student, Attendance, Fee, Mark, Subject, Parent

app = create_app()

# ════════════════════════════════════════════════════
#  EDIT THIS SECTION – Fill in the new student details
# ════════════════════════════════════════════════════
NEW_STUDENT = {
    "register_no":          "NU2026002",             # Login Register No
    "student_id":           "NU2026002",             # Login Student ID
    "full_name":            "Priya Sen",             # Student Name
    "password":             "student123",            # Password
    "department":           "BCA",
    "course":               "BCA",
    "semester":             4,                       # Current Semester
    "section":              "A",
    "attendance_percentage":82.5,                    # Overall Attendance
    "fee_pending":          12500.0,                 # Pending Fees
    "total_fee":            45000.0,                 # Total Fees
    "pending_fee":          12500.0,
    "fee_status":           "Partial",
    "cgpa":                 8.90,                    # Current CGPA
    "backlog_count":        0,
    "academic_status":      "Active",
    "phone":                "9876543210",
    "email":                "priya.sen@example.com",
}
# ════════════════════════════════════════════════════

def add_student_record():
    with app.app_context():
        # 1. Check if register number or email already exists
        existing = Student.query.filter((Student.register_no == NEW_STUDENT["register_no"]) | (Student.email == NEW_STUDENT["email"])).first()
        if existing:
            print(f"\n[ERROR] Student with register_no '{NEW_STUDENT['register_no']}' or email '{NEW_STUDENT['email']}' already exists!")
            print(f"        Name: {existing.full_name} | Department: {existing.department}")
            return

        # 2. Insert Student
        student = Student(
            register_no          = NEW_STUDENT["register_no"],
            student_id           = NEW_STUDENT["student_id"],
            full_name            = NEW_STUDENT["full_name"],
            password_hash        = generate_password_hash(NEW_STUDENT["password"]),
            department           = NEW_STUDENT["department"],
            course               = NEW_STUDENT["course"],
            semester             = NEW_STUDENT["semester"],
            section              = NEW_STUDENT["section"],
            attendance_percentage= NEW_STUDENT["attendance_percentage"],
            fee_pending          = NEW_STUDENT["fee_pending"],
            total_fee            = NEW_STUDENT["total_fee"],
            pending_fee          = NEW_STUDENT["pending_fee"],
            fee_status           = NEW_STUDENT["fee_status"],
            cgpa                 = NEW_STUDENT["cgpa"],
            backlog_count        = NEW_STUDENT["backlog_count"],
            academic_status      = NEW_STUDENT["academic_status"],
            phone                = NEW_STUDENT["phone"],
            email                = NEW_STUDENT["email"],
        )
        db.session.add(student)
        db.session.flush() # Fetch student.id

        # 3. Create Fee record
        fee = Fee(
            student_id=student.id,
            fee_category="Academic",
            total_amount=NEW_STUDENT["total_fee"],
            paid_amount=NEW_STUDENT["total_fee"] - NEW_STUDENT["fee_pending"],
            pending_amount=NEW_STUDENT["fee_pending"],
            payment_status=NEW_STUDENT["fee_status"],
            due_date=datetime.now() + timedelta(days=30)
        )
        db.session.add(fee)

        # 4. Create Parent account
        parent = Parent(
            token=f"parent_token_{student.id}",
            student_id=student.id,
            linked_student_id=student.student_id,
            name=f"Parent of {student.full_name}",
            password_hash=generate_password_hash("parent123"),
            phone_number="9000000099",
            email=f"parent.sen@example.com"
        )
        db.session.add(parent)

        # 5. Populate Subject-specific Attendance & Marks
        subjects = Subject.query.filter_by(department=NEW_STUDENT["department"], semester=NEW_STUDENT["semester"]).all()
        if not subjects:
            # Fallback subjects if department/semester subjects don't exist yet
            subjects = Subject.query.limit(3).all()

        for idx, sub in enumerate(subjects):
            # Seed Attendance breakdown
            present = 32 if idx == 0 else (26 if idx == 1 else 30)
            total = 40
            att = Attendance(
                student_id=student.id,
                subject=sub.subject_name,
                semester=NEW_STUDENT["semester"],
                section=NEW_STUDENT["section"],
                present_days=present,
                total_days=total,
                absent_days=total - present,
                percentage=(present / total) * 100,
                status="Eligible" if (present / total) >= 0.75 else "Warning"
            )
            db.session.add(att)

            # Seed Marks
            marks_val = 88 if idx == 0 else (68 if idx == 1 else 82)
            grade_val = "A+" if marks_val >= 90 else ("A" if marks_val >= 80 else ("B" if marks_val >= 60 else "C"))
            mark = Mark(
                student_id=student.id,
                subject_id=sub.id,
                exam_type="Internal IA1",
                marks_obtained=marks_val,
                max_marks=100,
                grade=grade_val
            )
            db.session.add(mark)

        db.session.commit()

        print(f"\n[SUCCESS] New student created successfully!")
        print(f"==================================================")
        print(f"Name:        {NEW_STUDENT['full_name']}")
        print(f"Register No:  {NEW_STUDENT['register_no']}")
        print(f"Password:     {NEW_STUDENT['password']}")
        print(f"Department:   {NEW_STUDENT['department']} (Semester {NEW_STUDENT['semester']})")
        print(f"Attendance:   {NEW_STUDENT['attendance_percentage']}%")
        print(f"Fee Status:   {NEW_STUDENT['fee_status']} (Rs. {NEW_STUDENT['fee_pending']} pending)")
        print(f"Current CGPA: {NEW_STUDENT['cgpa']}")
        print(f"==================================================")
        print(f"Try logging in on the portal using USN '{NEW_STUDENT['register_no']}' and password '{NEW_STUDENT['password']}'!")

if __name__ == "__main__":
    add_student_record()
