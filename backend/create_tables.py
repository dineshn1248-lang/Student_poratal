import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '.')))

from app import create_app
from database import db
from models import CommunicationLog

def create_tables():
    app = create_app()
    with app.app_context():
        db.create_all()
        print("CommunicationLog table created successfully!")

if __name__ == "__main__":
    create_tables()
