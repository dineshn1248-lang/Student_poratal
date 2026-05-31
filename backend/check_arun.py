from app import create_app
from models import Student, db

app = create_app()
with app.app_context():
    arun = Student.query.filter(Student.full_name.like('%Arun%')).first()
    if arun:
        print(f"Arun's current phone: {arun.phone}, Register No: {arun.register_no}")
    else:
        print("Arun not found.")
