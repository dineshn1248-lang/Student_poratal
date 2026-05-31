from datetime import datetime
from database import db
from werkzeug.security import generate_password_hash, check_password_hash

class Department(db.Model):
    __tablename__ = 'departments'
    id = db.Column(db.Integer, primary_key=True)
    department_name = db.Column(db.String(100), unique=True, nullable=False)
    total_sections = db.Column(db.Integer, default=1)
    hod_id = db.Column(db.Integer) # Reference to Staff id

class Staff(db.Model):
    __tablename__ = 'staff'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(50), nullable=False) # hod, principal, faculty
    name = db.Column(db.String(100), nullable=False)
    department = db.Column(db.String(100))
    email = db.Column(db.String(100), unique=True)
    phone_number = db.Column(db.String(20))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Student(db.Model):
    __tablename__ = 'students'
    id = db.Column(db.Integer, primary_key=True)
    register_no = db.Column(db.String(50), unique=True, nullable=False)
    student_id = db.Column(db.String(50), unique=True, nullable=True)
    full_name = db.Column(db.String(100), nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    department = db.Column(db.String(100))
    course = db.Column(db.String(100), default='BCA')
    semester = db.Column(db.Integer)
    section = db.Column(db.String(10))
    attendance_percent = db.Column(db.Integer, default=0)
    attendance_percentage = db.Column(db.Float, default=0.0)
    fee_pending = db.Column(db.Float, default=0.0)
    fee_status = db.Column(db.String(50), default='Pending')
    total_fee = db.Column(db.Float, default=0.0)
    pending_fee = db.Column(db.Float, default=0.0)
    cgpa = db.Column(db.Float, default=0.0)
    backlog_count = db.Column(db.Integer, default=0)
    parent_id = db.Column(db.Integer, nullable=True)
    academic_status = db.Column(db.String(50), default='Active') # Active, Warning, Detained
    phone = db.Column(db.String(20))
    parent_phone = db.Column(db.String(20))
    address = db.Column(db.String(255))
    email = db.Column(db.String(100), unique=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Parent(db.Model):
    __tablename__ = 'parents'
    id = db.Column(db.Integer, primary_key=True)
    parent_id = db.Column(db.String(50), unique=True, nullable=True)
    token = db.Column(db.String(100), unique=True, nullable=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'))
    linked_student_id = db.Column(db.String(50), nullable=True)
    name = db.Column(db.String(100))
    password_hash = db.Column(db.String(255), nullable=True)
    phone_number = db.Column(db.String(20))
    email = db.Column(db.String(100))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

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

class Subject(db.Model):
    __tablename__ = 'subjects'
    id = db.Column(db.Integer, primary_key=True)
    subject_code = db.Column(db.String(50), unique=True, nullable=False)
    subject_name = db.Column(db.String(150), nullable=False)
    department = db.Column(db.String(100))
    semester = db.Column(db.Integer)
    credits = db.Column(db.Integer)

class Mark(db.Model):
    __tablename__ = 'marks'
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'))
    subject_id = db.Column(db.Integer, db.ForeignKey('subjects.id'))
    exam_type = db.Column(db.String(50))
    marks_obtained = db.Column(db.Float)
    max_marks = db.Column(db.Float)
    grade = db.Column(db.String(5))
    internal_marks = db.Column(db.Float, nullable=True)
    external_marks = db.Column(db.Float, nullable=True)

class Notification(db.Model):
    __tablename__ = 'notifications'
    id = db.Column(db.Integer, primary_key=True)
    recipient_role = db.Column(db.String(50))
    department = db.Column(db.String(100))
    title = db.Column(db.String(200), nullable=False)
    message = db.Column(db.Text)
    type = db.Column(db.String(50))
    priority = db.Column(db.String(20))
    is_read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Fee(db.Model):
    __tablename__ = 'fees'
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'))
    fee_category = db.Column(db.String(100))
    total_amount = db.Column(db.Float)
    total_fee = db.Column(db.Float, default=0.0)
    paid_amount = db.Column(db.Float)
    pending_amount = db.Column(db.Float)
    payment_status = db.Column(db.String(50))
    due_date = db.Column(db.DateTime)

# Placeholder models to satisfy init_db.py imports
class Timetable(db.Model):
    __tablename__ = 'timetable'
    id = db.Column(db.Integer, primary_key=True)

class Attendance(db.Model):
    __tablename__ = 'attendance'
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'), nullable=False)
    subject = db.Column(db.String(100), default='General')
    semester = db.Column(db.Integer)
    section = db.Column(db.String(10))
    present_days = db.Column(db.Integer, default=0)
    total_days = db.Column(db.Integer, default=0)
    absent_days = db.Column(db.Integer, default=0)
    leave_days = db.Column(db.Integer, default=0)
    attendance_percentage = db.Column(db.Float, default=0.0)
    percentage = db.Column(db.Float, default=0.0)
    status = db.Column(db.String(50), default='Eligible') # Eligible, Warning, Critical
    last_updated = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    student = db.relationship('Student', backref=db.backref('attendance_records', lazy=True))

class Revaluation(db.Model):
    __tablename__ = 'revaluation'
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'), nullable=False)
    subject_id = db.Column(db.Integer, db.ForeignKey('subjects.id'), nullable=True)
    subject_name = db.Column(db.String(100))
    current_marks = db.Column(db.Integer)
    request_date = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(50), default='Pending') # Pending, Approved, Rejected

    student = db.relationship('Student', backref=db.backref('revaluations', lazy=True))

class ExamRegistration(db.Model):
    __tablename__ = 'exam_registrations'
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'), nullable=False)
    semester = db.Column(db.Integer)
    exam_type = db.Column(db.String(50)) # Regular, Supplementary, Revaluation
    registration_status = db.Column(db.String(50), default='Pending') # Registered, Pending
    hall_ticket_status = db.Column(db.String(50), default='Not Generated') # Generated, Not Generated
    internal_marks_status = db.Column(db.String(50), default='Pending') # Submitted, Pending
    eligibility_status = db.Column(db.String(50), default='Eligible') # Eligible, Short Attendance, Marks Pending
    approval_status = db.Column(db.String(50), default='Pending') # Approved, Pending, Rejected
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    student = db.relationship('Student', backref=db.backref('exam_registrations', lazy=True))

class ApprovalRequest(db.Model):
    __tablename__ = 'approval_requests'
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'), nullable=False)
    request_type = db.Column(db.String(100)) # Attendance shortage, Late registration, Internal marks exception
    reason = db.Column(db.Text)
    status = db.Column(db.String(50), default='Pending') # Approved, Pending, Rejected
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    student = db.relationship('Student', backref=db.backref('approval_requests', lazy=True))

class SpecialApproval(db.Model):
    __tablename__ = 'special_approval'
    id = db.Column(db.Integer, primary_key=True)

class FeeApproval(db.Model):
    __tablename__ = 'fee_approval'
    id = db.Column(db.Integer, primary_key=True)

class Announcement(db.Model):
    __tablename__ = 'announcements'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(300), nullable=False)
    category = db.Column(db.String(100), default='General Notice')
    content = db.Column(db.Text)
    target_audience = db.Column(db.String(100), default='All Users')
    department = db.Column(db.String(100), default='All')
    priority = db.Column(db.String(20), default='Medium')
    status = db.Column(db.String(20), default='published')  # published, draft, scheduled, archived
    is_emergency = db.Column(db.Boolean, default=False)
    publish_date = db.Column(db.String(50))
    expiry_date = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Exam(db.Model):
    __tablename__ = 'exams'
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'), nullable=False)
    subject = db.Column(db.String(100), nullable=False)
    exam_date = db.Column(db.String(50))
    hall_ticket_status = db.Column(db.String(50), default='Not Generated')
    marks = db.Column(db.String(20), default='N/A')

    student = db.relationship('Student', backref=db.backref('exams', lazy=True))

class CommunicationLog(db.Model):
    __tablename__ = 'communication_logs'
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'), nullable=False)
    parent_id = db.Column(db.Integer, db.ForeignKey('parents.id'), nullable=True)
    communication_type = db.Column(db.String(50))   # WhatsApp, SMS, Email
    provider = db.Column(db.String(50), default='Twilio') # Twilio, Meta, SMTP
    recipient = db.Column(db.String(100))           # phone number or email address
    message = db.Column(db.Text)
    status = db.Column(db.String(50), default='Pending')  # Queued, Sent, Delivered, Read, Failed
    provider_id = db.Column(db.String(100), nullable=True) # Twilio Message SID or Meta Message ID
    provider_response = db.Column(db.Text, nullable=True)  # Raw JSON or string response
    error_message = db.Column(db.Text, nullable=True)     # stores failure reason
    retry_count = db.Column(db.Integer, default=0)        # number of retry attempts
    sent_time = db.Column(db.DateTime, default=datetime.utcnow)
    delivery_time = db.Column(db.DateTime, nullable=True) # Exact time delivery was confirmed

    student = db.relationship('Student', backref=db.backref('communications', lazy=True))
    parent = db.relationship('Parent', backref=db.backref('communications', lazy=True))


class ParentOTP(db.Model):
    __tablename__ = 'parent_otps'
    id          = db.Column(db.Integer, primary_key=True)
    register_no = db.Column(db.String(50), nullable=False, index=True)
    otp         = db.Column(db.String(10), nullable=False)
    phone       = db.Column(db.String(20))               # number OTP was sent to
    created_at  = db.Column(db.DateTime, default=datetime.utcnow)
    expires_at  = db.Column(db.DateTime, nullable=False)  # 10 min from creation
    is_used     = db.Column(db.Boolean, default=False)    # prevents replay
