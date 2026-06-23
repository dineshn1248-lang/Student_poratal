import os

routes_to_append = """
@hod_bp.route('/internal-marks/<int:subject_id>/students', methods=['GET'])
def get_internal_marks_students(subject_id):
    try:
        from models import Student, Mark, Subject, db
        subj = Subject.query.get(subject_id)
        if not subj:
            return jsonify({"error": "Subject not found"}), 404
            
        students = Student.query.filter_by(semester=subj.semester).filter(
            db.or_(Student.department.like('%Computer Applications%'), Student.department.like('%BCA%'))
        ).all()
        
        data = []
        for student in students:
            mark = Mark.query.filter_by(student_id=student.id, subject_id=subject_id).first()
            data.append({
                "student_id": student.id,
                "register_no": student.register_no,
                "full_name": student.full_name,
                "internal_marks": mark.internal_marks if mark and mark.internal_marks is not None else ""
            })
            
        return jsonify({"students": data}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@hod_bp.route('/internal-marks/update', methods=['POST'])
def update_internal_marks():
    try:
        from models import Mark, db
        data = request.json
        subject_id = data.get('subject_id')
        updates = data.get('updates', [])
        
        for update in updates:
            student_id = update.get('student_id')
            internal_marks = update.get('internal_marks')
            
            mark = Mark.query.filter_by(student_id=student_id, subject_id=subject_id).first()
            if not mark:
                mark = Mark(student_id=student_id, subject_id=subject_id)
                db.session.add(mark)
                
            if internal_marks == "":
                mark.internal_marks = None
            else:
                mark.internal_marks = float(internal_marks)
                
        db.session.commit()
        return jsonify({"message": "Marks updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
"""

with open('routes/hod_routes.py', 'a') as f:
    f.write(routes_to_append)
print("Internal marks routes appended!")
