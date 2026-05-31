import os
from app import create_app
from models import db, CommunicationLog

app = create_app()

with app.app_context():
    print("Dropping old communication_logs table...")
    CommunicationLog.__table__.drop(db.engine)
    print("Creating new communication_logs table...")
    CommunicationLog.__table__.create(db.engine)
    print("Success!")
