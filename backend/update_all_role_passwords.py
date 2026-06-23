from app import create_app
from models import Staff, Student, Parent, db
from werkzeug.security import generate_password_hash

app = create_app()

with app.app_context():
    # Update Principal passwords
    principals = Staff.query.filter_by(role='principal').all()
    for p in principals:
        p.password_hash = generate_password_hash('principal123')
        print(f"Updated Principal: {p.username}")

    # Update HOD passwords
    hods = Staff.query.filter_by(role='hod').all()
    for h in hods:
        h.password_hash = generate_password_hash('hod123')
        print(f"Updated HOD: {h.username}")

    # Update Faculty passwords
    faculties = Staff.query.filter_by(role='faculty').all()
    for f in faculties:
        f.password_hash = generate_password_hash('faculty123')
        print(f"Updated Faculty: {f.username}")

    # Update Student passwords
    students = Student.query.all()
    for s in students:
        s.password_hash = generate_password_hash('student123')
    print(f"Updated all {len(students)} Students to 'student123'")

    # Update Parent passwords
    parents = Parent.query.all()
    for p in parents:
        p.password_hash = generate_password_hash('parent123')
    print(f"Updated all {len(parents)} Parents to 'parent123'")

    db.session.commit()
    print("All basic passwords updated successfully!")
