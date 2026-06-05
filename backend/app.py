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
    
    # Allow all origins for testing to prevent CORS issues
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    basedir = os.path.abspath(os.path.dirname(__file__))
    
    # 1. Detect Render environment automatically
    if os.environ.get('RENDER'):
        # Free tier persistent disks aren't supported, use ephemeral /tmp
        db_dir = '/tmp'
    else:
        # Local development uses instance folder
        db_dir = os.path.join(basedir, 'instance')
        
    # 2. Create directories automatically if they do not exist
    if not os.path.exists(db_dir):
        os.makedirs(db_dir, exist_ok=True)
        
    # 3. Define the SQLite path and use DATABASE_URL if available for future Postgres migration
    db_path = os.path.join(db_dir, 'student_portal.db')
    default_sqlite_uri = 'sqlite:///' + db_path
    
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', default_sqlite_uri)
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    db.init_app(app)
    print("Database URI:", app.config['SQLALCHEMY_DATABASE_URI'])
    
    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(faculty_bp, url_prefix='/api/faculty')
    app.register_blueprint(principal_bp, url_prefix='/api/principal')
    app.register_blueprint(hod_bp, url_prefix='/api/hod')
    app.register_blueprint(hod_attendance_bp, url_prefix='/api/hod/attendance')
    app.register_blueprint(hod_exam_bp, url_prefix='/api/hod/examinations')
    app.register_blueprint(student_bp, url_prefix='/api/student')

    # Add health check endpoints for Render and general verification
    @app.route('/', methods=['GET'])
    def index():
        return jsonify({"status": "healthy", "service": "Student Portal API", "message": "Backend is running!"}), 200

    @app.route('/health', methods=['GET'])
    def health_check():
        return jsonify({"status": "ok"}), 200

    @app.route('/api', methods=['GET'])
    def api_index():
        return jsonify({"status": "healthy", "endpoints_available": True}), 200

    @app.route('/api/students', methods=['GET'], strict_slashes=False)
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

    @app.route('/api/admin/reset-db', methods=['POST'])
    def reset_db():
        try:
            from init_db import init_db
            # This wipes and rebuilds
            init_db(app)
            return jsonify({"message": "Database reset and seeded successfully"})
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    with app.app_context():
        db.create_all()
        # Automatically seed the database if it's empty (critical for Render Free Tier ephemeral storage)
        from models import Staff
        if Staff.query.first() is None:
            try:
                from init_db import init_db
                init_db(app)
                print("Auto-seeded database successfully.")
            except Exception as e:
                print("Auto-seeding skipped or failed:", e)
    return app

# Create app globally for Gunicorn
app = create_app()

if __name__ == '__main__':
    print("Backend server starting on http://localhost:5000")
    app.run(
        host='0.0.0.0',
        port=int(os.environ.get("PORT", 5000)),
        debug=True
    )