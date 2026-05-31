from flask import Blueprint, jsonify, request
from models import db, Faculty, Notification

faculty_bp = Blueprint('faculty', __name__)

@faculty_bp.route('/stats', methods=['GET'])
def get_stats():
    dept = "Computer Applications"
    total = Faculty.query.filter_by(department=dept).count()
    active = Faculty.query.filter_by(department=dept, status='Active').count()
    classes = db.session.query(db.func.sum(Faculty.classes_today)).filter_by(department=dept).scalar() or 0
    marks = db.session.query(db.func.sum(Faculty.pending_marks)).filter_by(department=dept).scalar() or 0
    leave = Faculty.query.filter_by(department=dept, status='On Leave').count()
    avg_att = db.session.query(db.func.avg(Faculty.attendance_percent)).filter_by(department=dept).scalar() or 0

    return jsonify({
        "total_faculty": total,
        "active_faculty": active,
        "classes_today": int(classes),
        "pending_marks": int(marks),
        "leave_pending": leave,
        "avg_attendance": f"{int(avg_att)}%"
    })

@faculty_bp.route('', methods=['GET'])
def list_faculty():
    dept = "Computer Applications"
    search = request.args.get('search', '')
    designation = request.args.get('designation', '')
    status = request.args.get('status', '')
    
    query = Faculty.query.filter_by(department=dept)
    
    if search:
        query = query.filter(Faculty.full_name.ilike(f'%{search}%'))
    if designation and designation != "All":
        query = query.filter_by(designation=designation)
    if status and status != "All":
        query = query.filter_by(status=status)
        
    faculties = query.all()
    
    return jsonify([{
        "id": f.id,
        "staff_id": f.staff_id,
        "name": f.full_name,
        "designation": f.designation,
        "subjects": [f.subject_assigned],
        "semester": f.semester,
        "contact": f.contact_phone,
        "email": f.email,
        "attendance": f"{f.attendance_percent}%",
        "status": f.status,
        "classes_today": f.classes_today,
        "pending_marks": f.pending_marks
    } for f in faculties])

@faculty_bp.route('/<int:id>', methods=['GET'])
def get_faculty(id):
    f = Faculty.query.get_or_404(id)
    return jsonify({
        "personal": {
            "name": f.full_name,
            "staff_id": f.staff_id,
            "email": f.email,
            "phone": f.contact_phone
        },
        "academic": {
            "department": f.department,
            "designation": f.designation,
            "subjects": [f.subject_assigned],
            "semester": f.semester
        },
        "performance": {
            "attendance": f"{f.attendance_percent}%",
            "classes_today": f.classes_today,
            "pending_marks": f.pending_marks,
            "leave_status": f.leave_status
        }
    })

@faculty_bp.route('', methods=['POST'])
def create_faculty():
    data = request.json
    try:
        new_faculty = Faculty(
            staff_id=data['staff_id'],
            full_name=data['name'],
            designation=data.get('designation'),
            department=data.get('department', "Computer Applications"),
            subject_assigned=data.get('subjects', [""])[0],
            semester=data.get('semester'),
            contact_phone=data.get('contact'),
            email=data.get('email'),
            status=data.get('status', 'Active')
        )
        db.session.add(new_faculty)
        db.session.commit()
        return jsonify({"message": "Faculty profile created", "id": new_faculty.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@faculty_bp.route('/<int:id>', methods=['PUT'])
def update_faculty(id):
    f = Faculty.query.get_or_404(id)
    data = request.json
    try:
        f.full_name = data.get('faculty', f.full_name)
        f.designation = data.get('desig', f.designation)
        f.email = data.get('email', f.email)
        f.contact_phone = data.get('phone', f.contact_phone)
        db.session.commit()
        return jsonify({"message": "Faculty details updated successfully"})
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@faculty_bp.route('/<int:id>', methods=['DELETE'])
def delete_faculty(id):
    f = Faculty.query.get_or_404(id)
    try:
        db.session.delete(f)
        db.session.commit()
        return jsonify({"message": "Faculty profile removed successfully"})
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@faculty_bp.route('/notifications', methods=['GET'])
def get_notifications():
    notifs = Notification.query.order_by(Notification.created_at.desc()).limit(10).all()
    return jsonify([{
        "id": n.id,
        "title": n.title,
        "message": n.message,
        "is_read": n.is_read
    } for n in notifs])

@faculty_bp.route('/subjects', methods=['GET'])
def get_faculty_subjects():
    # Returns Mr. Rajan D's active UUCMS subjects
    return jsonify([
        {"id": 1, "code": "BCA601", "name": "Mobile Application Development", "semester": "6", "section": "A", "total_students": 20},
        {"id": 2, "code": "BCA602", "name": "Major Project Viva-Voce", "semester": "6", "section": "A", "total_students": 20}
    ])

@faculty_bp.route('/timetable', methods=['GET'])
def get_faculty_timetable():
    # Returns Mr. Rajan D's timetable schedule slots
    return jsonify([
        {"id": 1, "day": "Monday", "subject": "Mobile Application Development (BCA601)", "time": "09:00 AM - 10:00 AM", "room": "Lab 3"},
        {"id": 2, "day": "Monday", "subject": "Major Project Viva-Voce (BCA602)", "time": "11:30 AM - 01:00 PM", "room": "Seminar Hall"}
    ])

@faculty_bp.route('/reports/stats', methods=['GET'])
def get_faculty_reports_stats():
    # Returns stats for the faculty dashboard summary
    return jsonify({
        "total_students": 20
    })
