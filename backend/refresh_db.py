from app import create_app
from database import db
import os

app = create_app()

with app.app_context():
    # Use the same path as in app.py
    basedir = os.path.abspath(os.path.dirname(__file__))
    db_path = os.path.join(basedir, 'instance', 'student_portal.db')
    
    if os.path.exists(db_path):
        # Close all connections before removing
        db.session.remove()
        db.engine.dispose()
        os.remove(db_path)
        print(f"Removed {db_path}")

    db.create_all()
    print("Database tables created successfully with updated schema.")
