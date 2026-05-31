from app import app, db
from models import Staff

with app.app_context():
    staff = Staff.query.all()
    print("STAFF DUMP:")
    for s in staff:
        print(f"ID: {s.id} | Email: {s.email} | Role: {s.role} | HashPrefix: {s.password_hash[:20] if s.password_hash else 'NONE'}")
