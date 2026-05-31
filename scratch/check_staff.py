import sys
import os
sys.path.append(os.path.join(os.getcwd(), 'backend'))

from app import app
from models import Staff

with app.app_context():
    print("--- Staff Records ---")
    staff = Staff.query.all()
    for s in staff:
        print(f"ID: {s.id}, Username: {s.username}, Name: {s.name}, Role: {s.role}, Dept: {s.department}")
