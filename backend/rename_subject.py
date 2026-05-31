import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '.')))

from app import create_app
from database import db
from models import Attendance, Subject

def rename_general():
    app = create_app()
    with app.app_context():
        records = Attendance.query.filter_by(subject="General").all()
        for r in records:
            r.subject = "Advanced Java"
        db.session.commit()
        print(f"Renamed {len(records)} 'General' attendance records to 'Advanced Java'.")

if __name__ == "__main__":
    rename_general()
