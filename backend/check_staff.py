from app import create_app
from database import db
from models import Staff

app = create_app()

with app.app_context():
    staff_members = Staff.query.all()
    print("Staff Members in Database:")
    for s in staff_members:
        print(f"ID: {s.id} | Username: {s.username} | Role: {s.role} | Name: {s.name}")
