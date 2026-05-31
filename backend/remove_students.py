from app import app, db
from models import Student

REMOVE_LIST = [
    "NUB21BCA002",  # Priya Sharma
    "NUB21BCA003",  # Ajay Nayak
    "NUB21BCA004",  # Sneha Patil
    "NUB21BCA005",  # Kiran Gowda
    "NUB22MCA001",  # Asha Rao
    "NUB22MCA002",  # Deepa Nair
    "NUB22MCA003",  # Rahul Menon
    "NUB21BBA001",  # Kiran Patil
    "NUB21BBA002",  # Meena Kulkarni
    "NUB21BSC001",  # Suresh Hebbar
    "NUB21BSC002",  # Anitha Bhat
]

def remove_students():
    with app.app_context():
        removed = 0
        not_found = []
        for reg in REMOVE_LIST:
            student = Student.query.filter_by(register_no=reg).first()
            if student:
                db.session.delete(student)
                print(f"  Removed: {reg}  ({student.name})")
                removed += 1
            else:
                not_found.append(reg)
        db.session.commit()
        print(f"\n[OK] Removed {removed} student(s).")
        if not_found:
            print(f"[NOT FOUND] {', '.join(not_found)}")

if __name__ == "__main__":
    remove_students()
