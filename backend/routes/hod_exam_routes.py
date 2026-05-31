from flask import Blueprint, jsonify, request
from models import Student, ExamRegistration, ApprovalRequest, db
from sqlalchemy import func
from datetime import datetime

hod_exam_bp = Blueprint('hod_exam', __name__)

@hod_exam_bp.route('/stats', methods=['GET'])
def get_exam_stats():
    try:
        # Filter for Computer Applications department
        students = Student.query.filter_by(department='Computer Applications').all()
        student_ids = [s.id for s in students]
        
        total_registered = ExamRegistration.query.filter(
            ExamRegistration.student_id.in_(student_ids),
            ExamRegistration.registration_status == 'Registered'
        ).count()
        
        # User explicitly requested hall tickets declared to be 0 for now
        ht_generated = 0
        
        pending_reg = ExamRegistration.query.filter(
            ExamRegistration.student_id.in_(student_ids),
            ExamRegistration.registration_status == 'Pending'
        ).count()
        
        im_pending = ExamRegistration.query.filter(
            ExamRegistration.student_id.in_(student_ids),
            ExamRegistration.internal_marks_status == 'Pending'
        ).count()
        
        special_req = ApprovalRequest.query.filter(
            ApprovalRequest.student_id.in_(student_ids),
            ApprovalRequest.status == 'Pending'
        ).count() if 'ApprovalRequest' in globals() else 0

        return jsonify({
            "total_registered": total_registered,
            "ht_generated": ht_generated,
            "pending_reg": pending_reg,
            "im_pending": im_pending,
            "special_req": special_req
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@hod_exam_bp.route('', methods=['GET'])
def get_examinations():
    try:
        query = db.session.query(ExamRegistration, Student).join(Student, ExamRegistration.student_id == Student.id)\
            .filter(Student.department == 'Computer Applications')
            
        search = request.args.get('search')
        semester = request.args.get('semester')
        exam_type = request.args.get('exam_type')
        reg_status = request.args.get('registration_status')
        ht_status = request.args.get('hall_ticket_status')
        
        if search:
            query = query.filter(Student.full_name.ilike(f'%{search}%'))
        if semester and semester != 'All':
            query = query.filter(ExamRegistration.semester == int(semester))
        if exam_type and exam_type != 'All':
            query = query.filter(ExamRegistration.exam_type == exam_type)
        if reg_status and reg_status != 'All':
            query = query.filter(ExamRegistration.registration_status == reg_status)
        if ht_status and ht_status != 'All':
            query = query.filter(ExamRegistration.hall_ticket_status == ht_status)
            
        results = query.all()
        
        data = []
        for reg, student in results:
            data.append({
                "id": reg.id,
                "student_name": student.full_name,
                "semester": reg.semester,
                "exam_type": reg.exam_type,
                "registration_status": reg.registration_status,
                "hall_ticket_status": reg.hall_ticket_status,
                "internal_marks_status": reg.internal_marks_status,
                "eligibility_status": reg.eligibility_status,
                "approval_status": reg.approval_status,
                "last_updated": reg.updated_at.strftime("%d %b, %Y")
            })
            
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@hod_exam_bp.route('/chart', methods=['GET'])
def get_exam_charts():
    distribution = [
        {"name": "Registered", "value": 75, "color": "#10b981"},
        {"name": "Pending", "value": 15, "color": "#f59e0b"},
        {"name": "Rejected", "value": 10, "color": "#ef4444"},
    ]
    
    participation = [
        {"name": "Sem I", "count": 42},
        {"name": "Sem II", "count": 45},
        {"name": "Sem III", "count": 38},
        {"name": "Sem IV", "count": 40},
        {"name": "Sem V", "count": 44},
        {"name": "Sem VI", "count": 35},
    ]
    
    return jsonify({
        "distribution": distribution,
        "participation": participation
    })

@hod_exam_bp.route('/approvals', methods=['GET'])
def get_approvals():
    try:
        query = db.session.query(ApprovalRequest, Student).join(Student, ApprovalRequest.student_id == Student.id)\
            .filter(Student.department == 'Computer Applications', ApprovalRequest.status == 'Pending')
        results = query.all()
        
        data = []
        for req, student in results:
            data.append({
                "id": req.id,
                "student_name": student.full_name,
                "request_type": req.request_type,
                "reason": req.reason,
                "created_at": req.created_at.strftime("%d %b, %Y")
            })
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@hod_exam_bp.route('/approve', methods=['POST'])
def approve_request():
    data = request.json
    req_id = data.get('id')
    req = ApprovalRequest.query.get(req_id)
    if req:
        req.status = 'Approved'
        db.session.commit()
        return jsonify({"message": "Request approved"})
    return jsonify({"error": "Request not found"}), 404

@hod_exam_bp.route('/reject', methods=['POST'])
def reject_request():
    data = request.json
    req_id = data.get('id')
    req = ApprovalRequest.query.get(req_id)
    if req:
        req.status = 'Rejected'
        db.session.commit()
        return jsonify({"message": "Request rejected"})
    return jsonify({"error": "Request not found"}), 404

@hod_exam_bp.route('/generate-hallticket', methods=['POST'])
def generate_hallticket():
    data = request.json
    reg_id = data.get('id')
    reg = ExamRegistration.query.get(reg_id)
    if reg:
        reg.hall_ticket_status = 'Generated'
        db.session.commit()
        return jsonify({"message": "Hall ticket generated"})
    return jsonify({"error": "Registration not found"}), 404
