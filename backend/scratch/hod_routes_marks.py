@hod_bp.route('/students/all_marks', methods=['GET'])
def get_all_students_marks():
    try:
        from models import Student, Mark, Subject, db
        # Get all students
        students = Student.query.filter_by(department='Computer Applications').order_by(Student.register_no).all()
        
        result = []
        for s in students:
            # Get marks for this student
            marks = Mark.query.filter_by(student_id=s.id).all()
            for m in marks:
                subject = Subject.query.get(m.subject_id)
                sub_name = subject.name if subject else "Unknown Subject"
                sem = subject.semester if subject else s.semester
                
                int_m = 0
                try:
                    int_m = int(m.internal_marks)
                except:
                    pass
                    
                ext_m = 0
                try:
                    ext_m = int(m.external_marks)
                except:
                    pass
                
                total = int_m + ext_m
                is_pass = (ext_m >= 21) and (total >= 40)
                
                result.append({
                    "student_id": s.id,
                    "register_no": s.register_no,
                    "full_name": s.full_name,
                    "semester": sem,
                    "subject": sub_name,
                    "internal_marks": m.internal_marks,
                    "external_marks": m.external_marks,
                    "total_marks": total,
                    "result": "Pass" if is_pass else "Fail"
                })
                
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
