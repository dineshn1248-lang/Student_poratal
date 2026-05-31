import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '.')))

from app import create_app
from database import db
from models import Subject, Faculty

def seed_user_subjects():
    app = create_app()
    with app.app_context():
        user_subjects = {
            1: ["kannada", "english", "programming C", "digital electronic", "accontancy", "fundamental computer", "evs", "lab C", "lab information technology"],
            2: ["consumer electronic", "kannada", "english", "data structure using C", "object oriented concept using java", "discreite mathametical structure", "digital fluency", "lab data structure", "lab java"],
            3: ["kannada", "english", "DBMS", "C# and dot net", "indian constution", "lab java", "lab C#", "computer communication network", "financial education and investmaent"],
            4: ["kannada", "english", "python", "computer multimeda animation", "operating system concept", "floriculture this OE", "artificial intteligence", "lab python", "lab multimedia animation"],
            5: ["ADA", "R programming", "software engineear", "cloud computing", "web content management system", "cyber security", "lab ada", "lab R programming"],
            6: ["php", "logical resonging", "data science", "artifisial intteligence", "degital marketing", "project lab", "php lab"]
        }
        
        print("Updating subjects and assigning faculties...")
        
        for sem, subjects in user_subjects.items():
            # Get existing subjects for this semester sorted by ID
            existing_subs = Subject.query.filter_by(semester=sem, department="Computer Applications").order_by(Subject.id).all()
            
            for idx, subj_name in enumerate(subjects):
                # Update existing subject if it exists, or create a new one
                if idx < len(existing_subs):
                    sub = existing_subs[idx]
                    sub.subject_name = subj_name
                else:
                    code = f"6{sem}00{idx+1}"
                    sub = Subject(subject_code=code, subject_name=subj_name, department="Computer Applications", semester=sem, credits=3)
                    db.session.add(sub)
                    db.session.flush() # get ID
                
                # Check if a faculty is assigned to this exact subject
                fac = Faculty.query.filter_by(subject_assigned=subj_name).first()
                if not fac:
                    staff_id_val = f"FAC{sem}{idx+1}{sub.id}"
                    # Just an extra check to avoid duplicate staff_id
                    existing_fac = Faculty.query.filter_by(staff_id=staff_id_val).first()
                    if not existing_fac:
                        fac_name = f"Prof. {subj_name.split()[0].capitalize()}"
                        new_fac = Faculty(
                            staff_id=staff_id_val,
                            full_name=fac_name,
                            designation="Assistant Professor",
                            department="Computer Applications",
                            subject_assigned=subj_name,
                            semester=f"Semester {sem}",
                            contact_phone="9876543210",
                            email=f"{staff_id_val.lower()}@college.edu"
                        )
                        db.session.add(new_fac)
        
        db.session.commit()
        print("Subjects updated and mapped to faculties successfully!")

if __name__ == "__main__":
    seed_user_subjects()
