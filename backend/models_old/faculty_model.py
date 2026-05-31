from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class Faculty(db.Model):
    __tablename__ = 'faculty'
    id = db.Column(db.Integer, primary_key=True)
    staff_id = db.Column(db.String(20), unique=True, nullable=False)
    full_name = db.Column(db.String(100), nullable=False)
    designation = db.Column(db.String(100))
    department = db.Column(db.String(100))
    subject_assigned = db.Column(db.String(150))
    semester = db.Column(db.String(20))
    contact_phone = db.Column(db.String(20))
    email = db.Column(db.String(100), unique=True)
    attendance_percent = db.Column(db.Integer, default=95)
    status = db.Column(db.String(20), default='Active')
    leave_status = db.Column(db.String(20), default='None')
    classes_today = db.Column(db.Integer, default=2)
    pending_marks = db.Column(db.Integer, default=0)
    profile_image = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Staff(db.Model):
    __tablename__ = 'staff'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(50), nullable=False)
    full_name = db.Column(db.String(100), nullable=False)
    department = db.Column(db.String(100))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Notification(db.Model):
    __tablename__ = 'notifications'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    message = db.Column(db.Text)
    is_read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
