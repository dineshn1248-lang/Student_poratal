from app import create_app
from models import db, Student

app = create_app()

with app.app_context():
    ca_students = Student.query.filter_by(department='Computer Applications').all()
    print("Computer Applications Students:")
    for s in ca_students:
        print(f"Name: {s.full_name}, Reg No: {s.register_no}")
        
    bca_students = Student.query.filter_by(department='BCA').all()
    print("\nBCA Students:")
    for s in bca_students:
        print(f"Name: {s.full_name}, Reg No: {s.register_no}")
