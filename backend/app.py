import os
from dotenv import load_dotenv
load_dotenv(override=True)
from flask import Flask, jsonify
from flask_cors import CORS
from database import db
from routes.auth_routes import auth_bp
from routes.faculty_routes import faculty_bp
from routes.principal_routes import principal_bp
from routes.hod_routes import hod_bp
from routes.hod_attendance_routes import hod_attendance_bp
from routes.hod_exam_routes import hod_exam_bp
from routes.student_routes import student_bp
from models import (
    Department, Staff, Student, Parent, Faculty, 
    Subject, Mark, Notification, Fee, Timetable, 
    Attendance, Revaluation, ExamRegistration, 
    SpecialApproval, FeeApproval, Announcement
) # Import all models to ensure they are registered in the metadata

def create_app():
    app = Flask(__name__)
    
    # Configure CORS for production via environment variable, or fallback to '*' for local dev
    frontend_url = os.getenv("FRONTEND_URL", "*")
    CORS(app, resources={r"/api/*": {"origins": frontend_url}})

    basedir = os.path.abspath(os.path.dirname(__file__))
    instance_path = os.path.join(basedir, 'instance')
    if not os.path.exists(instance_path):
        os.makedirs(instance_path)
    
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(instance_path, 'student_portal.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    db.init_app(app)
    
    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(faculty_bp, url_prefix='/api/faculty')
    app.register_blueprint(principal_bp, url_prefix='/api/principal')
    app.register_blueprint(hod_bp, url_prefix='/api/hod')
    app.register_blueprint(hod_attendance_bp, url_prefix='/api/hod/attendance')
    app.register_blueprint(hod_exam_bp, url_prefix='/api/hod/examinations')
    app.register_blueprint(student_bp, url_prefix='/api/student')

    @app.route('/api/students', methods=['GET'])
    def get_all_students_global():
        from models import Student
        students = Student.query.all()
        return jsonify([{
            "id": s.id,
            "register_no": s.register_no,
            "name": s.full_name,
            "department": s.department,
            "semester": s.semester,
            "attendance_percentage": s.attendance_percent,
            "academic_status": s.academic_status or "Regular"
        } for s in students])

    with app.app_context():
        db.create_all()
        # Seeding is handled by separate scripts like init_db.py
            
    return app

if __name__ == '__main__':
    app = create_app()
    print("Backend server starting on http://localhost:5000")
    app.run(host='0.0.0.0', port=5000, debug=True)