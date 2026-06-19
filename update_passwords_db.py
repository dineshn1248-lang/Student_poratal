import os
import sys

# Add backend directory to sys.path so we can import from app
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))

from backend.app import create_app
from backend.database import db
from backend.models import Staff, Student, Parent

app = create_app()

with app.app_context():
    for s in Staff.query.all():
        s.set_password('Nrup@123456!')
    for s in Student.query.all():
        s.set_password('Nrup@123456!')
    for p in Parent.query.all():
        p.set_password('Nrup@123456!')
    db.session.commit()
    print("Updated all passwords in the database to Nrup@123456!")
