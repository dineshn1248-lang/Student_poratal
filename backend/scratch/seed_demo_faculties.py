import os
import sys
import re

# Add backend directory to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import create_app
from models import db, Faculty

app = create_app()

# Data from HODFaculty.jsx
raw_data = [
    {"code": "BCA101", "name": "Problem Solving Using C", "faculty": "Dr. Ramesh K", "desig": "Professor", "email": "ramesh.k@nu.ac.in", "phone": "9876543210", "semester": "1"},
    {"code": "BCA102", "name": "Mathematics - I", "faculty": "Prof. Kavya N", "desig": "Assistant Professor", "email": "kavya.n@nu.ac.in", "phone": "9876543211", "semester": "1"},
    {"code": "BCA103", "name": "Digital Fundamentals", "faculty": "Prof. Arjun M", "desig": "Associate Professor", "email": "arjun.m@nu.ac.in", "phone": "9876543212", "semester": "1"},
    {"code": "BCA104", "name": "English", "faculty": "Prof. Priya S", "desig": "Assistant Professor", "email": "priya.s@nu.ac.in", "phone": "9876543213", "semester": "1"},
    {"code": "BCA105", "name": "Kannada", "faculty": "Prof. Lokesh B", "desig": "Lecturer", "email": "lokesh.b@nu.ac.in", "phone": "9876543214", "semester": "1"},
    {"code": "BCA106", "name": "Lab: C Programming", "faculty": "Prof. Revathi P", "desig": "Lab Instructor", "email": "revathi.p@nu.ac.in", "phone": "9876543215", "semester": "1"},
    {"code": "BCA107", "name": "Computer Organization", "faculty": "Prof. Mahesh T", "desig": "Assistant Professor", "email": "mahesh.t@nu.ac.in", "phone": "9876543216", "semester": "1"},
    {"code": "BCA108", "name": "Discrete Mathematics", "faculty": "Prof. Sahana R", "desig": "Assistant Professor", "email": "sahana.r@nu.ac.in", "phone": "9876543217", "semester": "1"},
    {"code": "BCA109", "name": "Professional Ethics", "faculty": "Prof. Deepak V", "desig": "Lecturer", "email": "deepak.v@nu.ac.in", "phone": "9876543218", "semester": "1"},
    {"code": "BCA110", "name": "Environmental Studies", "faculty": "Prof. Geetha A", "desig": "Assistant Professor", "email": "geetha.a@nu.ac.in", "phone": "9876543219", "semester": "1"},

    {"code": "BCA201", "name": "Advanced English", "faculty": "Dr. Kavitha", "desig": "Associate Professor", "email": "kavitha@nu.ac.in", "phone": "9876543220", "semester": "2"},
    {"code": "BCA202", "name": "Mathematics - II", "faculty": "Dr. Sharma", "desig": "Professor", "email": "sharma@nu.ac.in", "phone": "9876543221", "semester": "2"},
    {"code": "BCA203", "name": "Data Structures", "faculty": "Prof. Arun Kumar", "desig": "Assistant Professor", "email": "arun@nu.ac.in", "phone": "9876543222", "semester": "2"},
    {"code": "BCA204", "name": "Chemistry", "faculty": "Dr. Smith", "desig": "Associate Professor", "email": "smith@nu.ac.in", "phone": "9876543223", "semester": "2"},
    {"code": "BCA205", "name": "Basic Electronics", "faculty": "Prof. Rajesh", "desig": "Lecturer", "email": "rajesh@nu.ac.in", "phone": "9876543224", "semester": "2"},
    {"code": "BCA206", "name": "Statistics", "faculty": "Dr. Davis", "desig": "Assistant Professor", "email": "davis@nu.ac.in", "phone": "9876543225", "semester": "2"},
    {"code": "BCA207", "name": "Health & Wellness", "faculty": "Prof. Smitha", "desig": "Lecturer", "email": "smitha@nu.ac.in", "phone": "9876543226", "semester": "2"},
    {"code": "BCA208", "name": "Human Rights", "faculty": "Dr. Reddy", "desig": "Associate Professor", "email": "reddy@nu.ac.in", "phone": "9876543227", "semester": "2"},

    {"code": "BCA301", "name": "DBMS", "faculty": "Prof. Sunita", "desig": "Assistant Professor", "email": "sunita@nu.ac.in", "phone": "9876543230", "semester": "3"},
    {"code": "BCA302", "name": "C# and Dot Net", "faculty": "Dr. Ramesh", "desig": "Professor", "email": "ramesh@nu.ac.in", "phone": "9876543231", "semester": "3"},
    {"code": "BCA303", "name": "Computer Networks", "faculty": "Prof. Rajesh", "desig": "Associate Professor", "email": "rajesh.n@nu.ac.in", "phone": "9876543232", "semester": "3"},
    {"code": "BCA304", "name": "Software Engineering", "faculty": "Dr. Kavitha", "desig": "Professor", "email": "kavitha.s@nu.ac.in", "phone": "9876543233", "semester": "3"},
    {"code": "BCA305", "name": "Digital Logic", "faculty": "Prof. Johnson", "desig": "Assistant Professor", "email": "johnson@nu.ac.in", "phone": "9876543234", "semester": "3"},
    {"code": "BCA306", "name": "Kannada III", "faculty": "Dr. Smith", "desig": "Lecturer", "email": "smith.k@nu.ac.in", "phone": "9876543235", "semester": "3"},
    {"code": "BCA307", "name": "Open Elective I", "faculty": "Prof. Davis", "desig": "Assistant Professor", "email": "davis.e@nu.ac.in", "phone": "9876543236", "semester": "3"},
    {"code": "BCA308", "name": "Quantitative Aptitude", "faculty": "Dr. Reddy", "desig": "Associate Professor", "email": "reddy.q@nu.ac.in", "phone": "9876543237", "semester": "3"},

    {"code": "BCA401", "name": "Python", "faculty": "Prof. Kumar", "desig": "Assistant Professor", "email": "kumar@nu.ac.in", "phone": "9876543240", "semester": "4"},
    {"code": "BCA402", "name": "Operating System", "faculty": "Dr. Davis", "desig": "Associate Professor", "email": "davis.o@nu.ac.in", "phone": "9876543241", "semester": "4"},
    {"code": "BCA403", "name": "Design and Analysis of Algorithms", "faculty": "Prof. Sunita", "desig": "Professor", "email": "sunita.d@nu.ac.in", "phone": "9876543242", "semester": "4"},
    {"code": "BCA404", "name": "Web Technologies", "faculty": "Dr. Ramesh", "desig": "Assistant Professor", "email": "ramesh.w@nu.ac.in", "phone": "9876543243", "semester": "4"},
    {"code": "BCA405", "name": "Theory of Computation", "faculty": "Prof. Rajesh", "desig": "Lecturer", "email": "rajesh.t@nu.ac.in", "phone": "9876543244", "semester": "4"},

    {"code": "BCA501", "name": "Cloud Computing", "faculty": "Dr. Smith", "desig": "Professor", "email": "smith.c@nu.ac.in", "phone": "9876543250", "semester": "5"},
    {"code": "BCA502", "name": "Cyber Security", "faculty": "Prof. Johnson", "desig": "Associate Professor", "email": "johnson.c@nu.ac.in", "phone": "9876543251", "semester": "5"},
    {"code": "BCA503", "name": "Machine Learning", "faculty": "Dr. Davis", "desig": "Professor", "email": "davis.m@nu.ac.in", "phone": "9876543252", "semester": "5"},
    {"code": "BCA504", "name": "Mobile Application Development", "faculty": "Prof. Kumar", "desig": "Assistant Professor", "email": "kumar.m@nu.ac.in", "phone": "9876543253", "semester": "5"},

    {"code": "BCA601", "name": "Data Science", "faculty": "Dr. Sharma", "desig": "Professor", "email": "sharma.d@nu.ac.in", "phone": "9876543260", "semester": "6"},
    {"code": "BCA602", "name": "Artificial Intelligence", "faculty": "Prof. Reddy", "desig": "Associate Professor", "email": "reddy.a@nu.ac.in", "phone": "9876543261", "semester": "6"},
    {"code": "BCA603", "name": "Big Data Analytics", "faculty": "Dr. Smith", "desig": "Professor", "email": "smith.b@nu.ac.in", "phone": "9876543262", "semester": "6"},
    {"code": "BCA606", "name": "Software Testing", "faculty": "Prof. Kumar", "desig": "Assistant Professor", "email": "kumar.s@nu.ac.in", "phone": "9876543265", "semester": "6"},
]

def seed_faculty():
    with app.app_context():
        # Clear existing non-default faculty if needed? No, let's just insert or update based on email.
        
        staff_id_counter = 200
        
        for item in raw_data:
            email = item["email"]
            
            existing = Faculty.query.filter_by(email=email).first()
            if existing:
                existing.subject_assigned = item["name"]
                existing.semester = item["semester"]
            else:
                fac = Faculty(
                    staff_id=f"FAC{staff_id_counter}",
                    full_name=item["faculty"],
                    designation=item["desig"],
                    department="Computer Applications",
                    subject_assigned=item["name"],
                    semester=item["semester"],
                    contact_phone=item["phone"],
                    email=email,
                    status="Active",
                    attendance_percent=85
                )
                db.session.add(fac)
                staff_id_counter += 1
                
        db.session.commit()
        print(f"Seeded {len(raw_data)} faculty members into the DB!")

if __name__ == "__main__":
    seed_faculty()
