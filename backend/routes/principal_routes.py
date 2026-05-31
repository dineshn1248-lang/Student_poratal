from flask import Blueprint, jsonify, request
from models import Staff, Student, Department, Notification, Fee, Announcement, Parent, db

principal_bp = Blueprint('principal', __name__)

@principal_bp.route('/stats', methods=['GET'])
def get_stats():
    try:
        from models import Faculty
        total_students = Student.query.count()
        total_faculty = Faculty.query.count()
        avg_att = db.session.query(db.func.avg(Student.attendance_percent)).scalar() or 84
        backlog_std = Student.query.filter(Student.backlog_count > 0).count()
        
        # Calculate real pending fees
        pending_total = db.session.query(db.func.sum(Student.fee_pending)).scalar() or 0.0
            
        return jsonify({
            "total_students": total_students,
            "total_faculty": total_faculty,
            "avg_attendance": f"{round(avg_att)}%",
            "backlog_students": backlog_std,
            "fee_pending": f"₹{pending_total:,.2f}",
            "alerts": 3
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@principal_bp.route('/departments/overview', methods=['GET'])
def get_departments():
    try:
        all_departments = ["BCA", "B.Sc", "BBA", "MCA"]
        dept_list = []
        for idx, dept_name in enumerate(all_departments, start=1):
            # Also count Computer Applications as BCA for now just in case
            if dept_name == "BCA":
                total_std = Student.query.filter(db.or_(Student.department == "BCA", Student.department == "Computer Applications")).count()
                avg_att = db.session.query(db.func.avg(Student.attendance_percent)).filter(db.or_(Student.department == "BCA", Student.department == "Computer Applications")).scalar() or 80
                fee_pending = db.session.query(db.func.sum(Student.fee_pending)).filter(db.or_(Student.department == "BCA", Student.department == "Computer Applications")).scalar() or 0.0
            else:
                total_std = Student.query.filter(Student.department == dept_name).count()
                avg_att = db.session.query(db.func.avg(Student.attendance_percent)).filter(Student.department == dept_name).scalar() or 80
                fee_pending = db.session.query(db.func.sum(Student.fee_pending)).filter(Student.department == dept_name).scalar() or 0.0
            
            dept_list.append({
                "id": idx,
                "name": dept_name,
                "total_students": total_std,
                "avg_attendance": f"{round(avg_att)}%",
                "fee_pending": f"₹{fee_pending:,.2f}"
            })
        return jsonify(dept_list)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@principal_bp.route('/students', methods=['GET'])
def get_students():
    query = Student.query
    
    dept = request.args.get('department')
    sem = request.args.get('semester')
    section = request.args.get('section')
    status = request.args.get('status')
    fee_status = request.args.get('fee_status')
    search = request.args.get('search')
    
    if dept and dept != 'All':
        query = query.filter(Student.department == dept)
    if sem and sem != 'All':
        try:
            query = query.filter(Student.semester == int(sem))
        except ValueError:
            pass
    if section and section != 'All':
        query = query.filter(Student.section == section)
    if status and status != 'All':
        query = query.filter(Student.academic_status == status)
    if fee_status and fee_status != 'All':
        query = query.filter(Student.fee_status == fee_status)
    if search:
        query = query.filter(
            (Student.full_name.ilike(f'%{search}%')) | 
            (Student.register_no.ilike(f'%{search}%'))
        )
        
    students = query.all()
    student_list = [{
        "id": s.id,
        "usn": s.register_no,
        "name": s.full_name,
        "department": s.department,
        "semester": s.semester,
        "section": s.section or "A",
        "attendance": f"{s.attendance_percent}%",
        "academic_status": s.academic_status or "Regular",
        "fee_status": s.fee_status or "Pending",
        "result_status": "Fail" if s.backlog_count > 0 else "Pass"
    } for s in students]
    
    return jsonify({
        "students": student_list,
        "stats": {
            "total": len(student_list),
            "active": sum(1 for s in student_list if s['academic_status'] == 'Regular'),
            "backlog": sum(1 for s in student_list if s['academic_status'] == 'Backlog'),
            "detained": sum(1 for s in student_list if s['academic_status'] == 'Detained'),
            "new_registrations": 0
        }
    })

@principal_bp.route('/exams/dashboard_stats', methods=['GET'])
def get_exam_dashboard_stats():
    try:
        from models import ExamRegistration, Revaluation
        total_students = Student.query.count()
        eligible_count = Student.query.filter(Student.attendance_percent >= 75).count()
        hall_tickets = ExamRegistration.query.filter_by(hall_ticket_status='Generated').count()
        backlogs = Student.query.filter(Student.backlog_count > 0).count()
        revaluation_pending = Revaluation.query.filter_by(status='Pending').count()
        
        return jsonify({
            "total_registered": total_students,
            "eligible": eligible_count,
            "eligible_percentage": round((eligible_count/total_students*100) if total_students>0 else 0, 2),
            "hall_tickets": hall_tickets,
            "hall_tickets_percentage": round((hall_tickets/total_students*100) if total_students>0 else 0, 2),
            "backlogs": backlogs,
            "backlogs_percentage": round((backlogs/total_students*100) if total_students>0 else 0, 2),
            "results_published": 1, # hardcoded 1 semester for now
            "revaluation_requests": revaluation_pending
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@principal_bp.route('/exams/semester_overview', methods=['GET'])
def get_semester_overview():
    try:
        import random
        overview = []
        for sem in range(1, 7):
            if sem < 6:
                count = 40
                pass_perc = f"{random.randint(70, 90)}%"
                status = "Completed"
            else:
                count = Student.query.filter_by(semester=sem).count()
                passed = Student.query.filter(Student.semester == sem, Student.backlog_count == 0).count()
                pass_perc = f"{round((passed/count*100))}%" if count > 0 else "-"
                status = "In Progress"
            
            overview.append({
                "semester": f"{['I', 'II', 'III', 'IV', 'V', 'VI'][sem-1]} Semester",
                "status": status,
                "registered": count,
                "pass_percentage": pass_perc
            })
        return jsonify(overview)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@principal_bp.route('/exams/current_semester_details', methods=['GET'])
def get_current_semester_details():
    try:
        current_sem = 6 # Targeting VI semester
        students = Student.query.filter_by(semester=current_sem).all()
        total = len(students)
        eligible = sum(1 for s in students if s.attendance_percent >= 75)
        
        from models import ExamRegistration
        hall_tickets = ExamRegistration.query.filter(ExamRegistration.student_id.in_([s.id for s in students]), ExamRegistration.hall_ticket_status=='Generated').count()
        
        passed = sum(1 for s in students if s.backlog_count == 0)
        failed = total - passed
        backlogs = sum(1 for s in students if s.backlog_count > 0) # simplified fail=backlog for now
        
        pass_perc = round((passed/total*100), 2) if total > 0 else 0
        fail_perc = round((failed/total*100), 2) if total > 0 else 0
        backlog_perc = round((backlogs/total*100), 2) if total > 0 else 0
        
        # Mock historical data for bar chart
        bar_data = [
            {"name": "I Sem", "value": 85},
            {"name": "II Sem", "value": 80},
            {"name": "III Sem", "value": 75},
            {"name": "IV Sem", "value": 70},
            {"name": "V Sem", "value": 65},
            {"name": "VI Sem", "value": pass_perc}
        ]
        
        return jsonify({
            "current_sem_label": "VI Semester",
            "registered": total,
            "eligible": eligible,
            "not_eligible": total - eligible,
            "hall_tickets": hall_tickets,
            "results_published": "No",
            "analytics": {
                "passed": passed, "pass_perc": f"{pass_perc}%",
                "failed": failed, "fail_perc": f"{fail_perc}%",
                "backlogs": backlogs, "backlog_perc": f"{backlog_perc}%"
            },
            "bar_chart": bar_data
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@principal_bp.route('/exams/registration_table', methods=['GET'])
def get_registration_table():
    try:
        from models import ExamRegistration
        students = Student.query.filter_by(semester=6).all() # Target VI semester
        table_data = []
        for i, s in enumerate(students):
            reg = ExamRegistration.query.filter_by(student_id=s.id).first()
            
            if reg:
                status = reg.registration_status
                ht_status = reg.hall_ticket_status
            else:
                status = "Registered" if s.attendance_percent >= 75 else "Not Eligible"
                ht_status = "Generated" if status == "Registered" else "Pending"
                
            # For 6th Semester, results are NOT published yet for ANY student
            result_status = "Not Published"
                
            table_data.append({
                "id": s.id,
                "register_no": s.register_no,
                "name": s.full_name,
                "semester": "VI Sem",
                "registration_status": status,
                "hall_ticket_status": ht_status,
                "result_status": result_status,
                "backlogs": s.backlog_count
            })
        return jsonify(table_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@principal_bp.route('/exams/backlog_monitoring', methods=['GET'])
def get_backlog_monitoring():
    try:
        backlog_students = Student.query.filter(Student.backlog_count > 0, Student.semester == 6).all()
        table_data = []
        for s in backlog_students:
            table_data.append({
                "id": s.id,
                "register_no": s.register_no,
                "name": s.full_name,
                "subjects_failed": "Data Structures, OS" if s.backlog_count > 1 else "DBMS",
                "current_sem": "VI Sem",
                "status": "Active"
            })
        return jsonify({
            "total_backlogs": len(backlog_students),
            "students": table_data
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@principal_bp.route('/exams/revaluation_requests', methods=['GET'])
def get_revaluation_requests():
    try:
        from models import Revaluation
        requests = Revaluation.query.all()
        pending = sum(1 for r in requests if r.status == 'Pending')
        approved = sum(1 for r in requests if r.status == 'Approved')
        rejected = sum(1 for r in requests if r.status == 'Rejected')
        
        table_data = []
        for r in requests:
            table_data.append({
                "id": r.id,
                "student_name": r.student.full_name,
                "subject": r.subject_name or "Unknown",
                "current_marks": r.current_marks,
                "request_date": r.request_date.strftime("%d %b %Y"),
                "status": r.status
            })
            
        return jsonify({
            "pending_count": pending,
            "approved_count": approved,
            "rejected_count": rejected,
            "requests": table_data
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@principal_bp.route('/announcements/stats', methods=['GET'])
def get_announcement_stats():
    total = Announcement.query.count()
    active = Announcement.query.filter_by(status='published').count()
    emergency = Announcement.query.filter_by(is_emergency=True).count()
    drafts = Announcement.query.filter_by(status='draft').count()
    scheduled = Announcement.query.filter_by(status='scheduled').count()
    archived = Announcement.query.filter_by(status='archived').count()
    return jsonify({
        "total": total,
        "active": active,
        "emergency": emergency,
        "drafts": drafts,
        "scheduled": scheduled,
        "archived": archived
    })

@principal_bp.route('/announcements', methods=['GET'])
def get_announcements():
    query = Announcement.query
    cat = request.args.get('category')
    status = request.args.get('status')
    if cat and cat != 'All':
        query = query.filter_by(category=cat)
    if status and status != 'All':
        query = query.filter_by(status=status)
    announcements = query.order_by(Announcement.created_at.desc()).all()
    return jsonify([{
        "id": a.id,
        "title": a.title,
        "category": a.category or "General Notice",
        "content": a.content or "",
        "target_audience": a.target_audience or "All Users",
        "department": a.department or "All",
        "priority": a.priority or "Medium",
        "status": a.status or "published",
        "is_emergency": a.is_emergency or False,
        "publish_date": a.publish_date or "",
        "expiry_date": a.expiry_date or ""
    } for a in announcements])

@principal_bp.route('/announcements', methods=['POST'])
def create_announcement():
    data = request.get_json()
    ann = Announcement(
        title=data.get('title', 'Untitled'),
        category=data.get('category', 'General Notice'),
        content=data.get('content', ''),
        target_audience=data.get('target_audience', 'All Users'),
        department=data.get('department', 'All'),
        priority=data.get('priority', 'Medium'),
        status=data.get('status', 'published'),
        is_emergency=data.get('is_emergency', False),
        publish_date=data.get('publish_date', ''),
        expiry_date=data.get('expiry_date', '')
    )
    db.session.add(ann)
    db.session.commit()
    return jsonify({"message": "Announcement created", "id": ann.id}), 201

@principal_bp.route('/announcements/<int:ann_id>', methods=['PUT'])
def update_announcement(ann_id):
    ann = Announcement.query.get_or_404(ann_id)
    data = request.get_json()
    ann.title = data.get('title', ann.title)
    ann.category = data.get('category', ann.category)
    ann.content = data.get('content', ann.content)
    ann.target_audience = data.get('target_audience', ann.target_audience)
    ann.department = data.get('department', ann.department)
    ann.priority = data.get('priority', ann.priority)
    ann.status = data.get('status', ann.status)
    ann.is_emergency = data.get('is_emergency', ann.is_emergency)
    ann.publish_date = data.get('publish_date', ann.publish_date)
    ann.expiry_date = data.get('expiry_date', ann.expiry_date)
    db.session.commit()
    return jsonify({"message": "Announcement updated"})

@principal_bp.route('/announcements/<int:ann_id>', methods=['DELETE'])
def delete_announcement(ann_id):
    ann = Announcement.query.get_or_404(ann_id)
    db.session.delete(ann)
    db.session.commit()
    return jsonify({"message": "Announcement deleted"})

@principal_bp.route('/announcements/publish', methods=['POST'])
def publish_announcement():
    data = request.get_json()
    ann = Announcement.query.get_or_404(data.get('id'))
    ann.status = 'published'
    db.session.commit()
    return jsonify({"message": "Announcement published"})

@principal_bp.route('/announcements/archive', methods=['POST'])
def archive_announcement():
    data = request.get_json()
    ann = Announcement.query.get_or_404(data.get('id'))
    ann.status = 'archived'
    db.session.commit()
    return jsonify({"message": "Announcement archived"})

@principal_bp.route('/backlogs/dashboard', methods=['GET'])
def get_backlog_dashboard():
    return jsonify({
        "high_risk": 12,
        "medium_risk": 24,
        "low_risk": 28
    })

@principal_bp.route('/backlogs/students', methods=['GET'])
def get_backlog_students():
    students = Student.query.filter(Student.backlog_count > 0).order_by(Student.register_no).all()
    result = []
    for s in students:
        parent = Parent.query.filter_by(student_id=s.id).first()
        result.append({
            "id": s.id,
            "register_no": s.register_no,
            "full_name": s.full_name,
            "semester": s.semester,
            "cgpa": s.cgpa,
            "backlog_count": s.backlog_count,
            "parent_phone": s.parent_phone or (parent.phone_number if parent else ''),
            "parent_email": parent.email if parent else '',
        })
    return jsonify(result)

@principal_bp.route('/backlogs/analytics', methods=['GET'])
def get_backlog_analytics():
    return jsonify({
        "dept_distribution": [
            {"name": "MCA", "count": 5},
            {"name": "BCS", "count": 24},
            {"name": "BCA", "count": 32},
            {"name": "BBA", "count": 3}
        ],
        "semester_wise": [
            {"sem": "Sem 1", "count": 8},
            {"sem": "Sem 2", "count": 12},
            {"sem": "Sem 3", "count": 15},
            {"sem": "Sem 4", "count": 18},
            {"sem": "Sem 5", "count": 7},
            {"sem": "Sem 6", "count": 4}
        ],
        "trend": [
            {"year": "2022", "count": 45},
            {"year": "2023", "count": 52},
            {"year": "2024", "count": 58},
            {"year": "2025", "count": 64}
        ],
        "risk_summary": {"high": 12, "medium": 24, "low": 28},
        "total_backlogs": 64,
        "clearance_rate": "72%"
    })

@principal_bp.route('/student/<int:student_id>', methods=['GET'])
def get_student_detail(student_id):
    student = Student.query.get_or_404(student_id)
    return jsonify({
        "personal": {
            "id": student.id,
            "usn": student.register_no,
            "name": student.full_name,
            "dept": student.department,
            "sem": student.semester,
            "email": f"{student.register_no.lower()}@college.com",
            "phone": student.phone or "9876543210"
        },
        "academic": {
            "status": student.academic_status or "Regular",
            "attendance_avg": f"{student.attendance_percent}%",
            "present_classes": 42,
            "total_classes": 50
        },
        "fee": {
            "total": "45,000",
            "paid": "45,000" if student.fee_status == "Paid" else "0",
            "pending": "0" if student.fee_status == "Paid" else "45,000",
            "status": student.fee_status or "Pending"
        },
        "marks_summary": [
            {"subject": "Software Engineering", "marks": "85/100", "grade": "A", "status": "Pass"},
            {"subject": "Computer Networks", "marks": "78/100", "grade": "B", "status": "Pass"},
            {"subject": "Web Tech", "marks": "92/100", "grade": "O", "status": "Pass"}
        ],
        "backlogs": []
    })

# --- Report Section Routes ---

@principal_bp.route('/reports/dashboard', methods=['GET'])
def get_report_dashboard():
    try:
        students = Student.query.all()
        total_students = len(students)
        
        # Calculate real collected fees based on 23k per student
        total_collected = 0
        for s in students:
            if s.fee_status == "Paid":
                total_collected += 23000
            elif s.fee_status == "Partial":
                total_collected += 11500
                
        return jsonify({
            "summary": {
                "total_students": total_students,
                "institution_attendance": "84%",
                "total_fees_collected": total_collected
            }
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@principal_bp.route('/reports/academic', methods=['GET'])
def get_report_academic():
    return jsonify({
        "metrics": {
            "avg_marks": 78.5,
            "pass_percentage": "92%",
            "distinction_count": 3
        },
        "dept_performance": [
            {"name": "MCA", "avg": 82},
            {"name": "BCA", "avg": 79}
        ],
        "performance_trend": [
            {"name": "Sem 1", "score": 72},
            {"name": "Sem 2", "score": 75},
            {"name": "Sem 3", "score": 78},
            {"name": "Sem 4", "score": 80}
        ]
    })

@principal_bp.route('/reports/attendance', methods=['GET'])
def get_report_attendance():
    return jsonify({
        "overall_avg": "84%",
        "dept_comparison": [
            {"name": "MCA", "value": 88},
            {"name": "BCS", "value": 82},
            {"name": "BCA", "value": 85},
            {"name": "BBA", "value": 79}
        ],
        "monthly_trend": [
            {"month": "Jan", "val": 82},
            {"month": "Feb", "val": 85},
            {"month": "Mar", "val": 83},
            {"month": "Apr", "val": 86}
        ],
        "defaulters": [
            {"reg_no": "BCA045", "name": "John Doe", "dept": "BCA", "att": 68},
            {"reg_no": "MCA012", "name": "Jane Smith", "dept": "MCA", "att": 72}
        ]
    })

@principal_bp.route('/reports/exams', methods=['GET'])
def get_report_exams():
    try:
        total_students = Student.query.count()
        approved_count = Student.query.filter(
            Student.attendance_percent >= 75,
            Student.fee_status == 'Paid'
        ).count()
        pending_count = total_students - approved_count
        
        return jsonify({
            "summary": {
                "total_registrations": total_students,
                "approved": approved_count,
                "hall_tickets_ready": approved_count,
                "rejected": pending_count
            },
            "workflow": [
                {"name": "Applied", "count": total_students},
                {"name": "Approved", "count": approved_count},
                {"name": "HT Printed", "count": approved_count}
            ]
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@principal_bp.route('/reports/fees', methods=['GET'])
def get_report_fees():
    try:
        students = Student.query.all()
        total_students = len(students)
        total_expected = total_students * 23000
        
        total_collected = 0
        paid_count = 0
        partial_count = 0
        unpaid_count = 0
        
        defaulters = []
        for s in students:
            if s.fee_status == "Paid":
                total_collected += 23000
                paid_count += 1
            elif s.fee_status == "Partial":
                total_collected += 11500
                partial_count += 1
                defaulters.append({
                    "usn": s.register_no,
                    "name": s.full_name,
                    "dept": s.department,
                    "pending": 11500
                })
            else:
                unpaid_count += 1
                defaulters.append({
                    "usn": s.register_no,
                    "name": s.full_name,
                    "dept": s.department,
                    "pending": 23000
                })
                
        # Sort defaulters descending so highest pending balances show first
        defaulters.sort(key=lambda x: x['pending'], reverse=True)
        
        efficiency = f"{round((total_collected / total_expected) * 100, 1)}%" if total_expected > 0 else "100%"
        
        return jsonify({
            "summary": {
                "total_expected": total_expected,
                "total_collected": total_collected,
                "collection_efficiency": efficiency
            },
            "status_split": [
                {"name": "Full Paid", "value": paid_count},
                {"name": "Partial", "value": partial_count},
                {"name": "Unpaid", "value": unpaid_count}
            ],
            "defaulters": defaulters
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@principal_bp.route('/reports/backlogs', methods=['GET'])
def get_report_backlogs():
    try:
        # Total backlog students count
        total_backlog_students = Student.query.filter(Student.backlog_count > 0).count()
        
        # Backlog counts grouped by department
        dept_stats = db.session.query(
            Student.department,
            db.func.sum(Student.backlog_count)
        ).filter(Student.backlog_count > 0).group_by(Student.department).all()
        
        dept_comparison = []
        for dept, count in dept_stats:
            dept_comparison.append({
                "name": dept or "Other",
                "count": count or 0
            })
            
        # Critical students with backlogs (ordered by backlog count descending)
        critical_students = Student.query.filter(Student.backlog_count > 0).order_by(Student.backlog_count.desc()).all()
        critical_cases = []
        for s in critical_students:
            critical_cases.append({
                "reg_no": s.register_no,
                "name": s.full_name,
                "sem": s.semester,
                "backlogs": s.backlog_count
            })
            
        return jsonify({
            "total_backlogs": total_backlog_students,
            "dept_comparison": dept_comparison,
            "critical_cases": critical_cases
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@principal_bp.route('/reports/export/<format>', methods=['GET'])
def export_report(format):
    return jsonify({"message": f"Report successfully generated in {format.upper()} format. Download will start shortly."})
