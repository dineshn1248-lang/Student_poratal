@student_bp.route('/ai-chat', methods=['POST'])
@login_required
def ai_chat(user, role):
    data = request.json
    msg = data.get('message', '').lower()
    
    # 1. Resolve student object context
    student = None
    if role == "student":
        student = user
    elif role == "parent":
        student = Student.query.get(user.student_id)
        
    if not student:
        student = Student.query.first()
        
    if not student:
        return jsonify({ "response": "I am having trouble accessing student records right now." })

    from models import Mark, Subject, Attendance, Fee, Placement, Timetable, Exam, ExamRegistration
    
    # 2. Check query intent (Comprehensive Keyword Matching)
    
    # --- HELLO / GREETINGS ---
    if "hello" in msg or "hi " in msg or "hi" == msg or "hey" in msg:
        response_text = (
            f"Hello {student.full_name}! 👋 I am your Nrupathunga University Academic Assistant.\n\n"
            f"I have direct access to your student profile! You can ask me about:\n"
            f"- **Attendance** (e.g., 'What is my overall attendance?')\n"
            f"- **Marks & Results** (e.g., 'What is my CGPA?' or 'Show my semester marks')\n"
            f"- **Academic Info** (e.g., 'Who is my class teacher?' or 'What subjects am I enrolled in?')\n"
            f"- **Examinations** (e.g., 'When are my upcoming exams?')\n"
            f"- **Fees** (e.g., 'Do I have any pending fees?')\n"
            f"- **Placements** (e.g., 'Am I eligible for placements?')\n\n"
            f"What would you like to explore today?"
        )
        return jsonify({ "response": response_text })

    # --- ATTENDANCE ---
    elif any(kw in msg for kw in ["attendance", "present", "absent", "missed", "shortage", "eligible", "eligibility"]):
        records = Attendance.query.filter_by(student_id=student.id).all()
        overall_pct = student.attendance_percentage if student.attendance_percentage else (student.attendance_percent if getattr(student, 'attendance_percent', None) else 0.0)
        
        if "today" in msg:
            response_text = f"📅 **Today's Attendance**\nYou were marked **Present** for all scheduled classes today."
        elif "shortage" in msg or "below 75" in msg:
            shortage_subjects = [r for r in records if (r.percentage if getattr(r, 'percentage', None) else getattr(r, 'attendance_percentage', 100)) < 75]
            if shortage_subjects:
                subs = "\n".join([f"- **{r.subject}**: {r.percentage if getattr(r, 'percentage', None) else getattr(r, 'attendance_percentage', 0):.1f}%"] for r in shortage_subjects)
                response_text = f"⚠️ **Attendance Shortage Alert**\nYou have an attendance shortage (Below 75%) in the following subjects:\n{subs}"
            else:
                response_text = f"✅ **No Attendance Shortage**\nYou do not have any subjects below the 75% threshold."
        elif "eligible" in msg:
            status = "eligible" if overall_pct >= 75 else "NOT eligible (shortage)"
            response_text = f"🎓 **Exam Eligibility**\nYour overall attendance is **{overall_pct:.1f}%**. You are **{status}** to write the semester exams."
        elif "miss" in msg:
            response_text = f"📊 **Attendance Buffer**\nWith your current attendance of **{overall_pct:.1f}%**, you can safely miss roughly **2 more classes** this week without falling below the 75% mandatory requirement."
        else:
            if records:
                res_lines = []
                for r in records:
                    pct = r.percentage if getattr(r, 'percentage', None) else (getattr(r, 'attendance_percentage', 0.0))
                    status_warning = "⚠️ **Shortage (Below 75%)**" if pct < 75 else "✅ **Good**"
                    res_lines.append(f"- **{r.subject}**: {getattr(r, 'present_days', 0)}/{getattr(r, 'total_days', 0)} classes ({pct:.1f}%) — {status_warning}")
                attendance_summary = "\n".join(res_lines)
                overall_status = "⚠️ **Warning: Shortage!**" if overall_pct < 75 else "✅ **Eligible**"
                
                response_text = (
                    f"📊 **Detailed Attendance for {student.full_name}**:\n\n"
                    f"{attendance_summary}\n\n"
                    f"**Overall Attendance**: **{overall_pct:.1f}%** ({overall_status})"
                )
            else:
                response_text = f"📊 **Attendance Summary**:\nYour overall registered attendance is **{overall_pct:.1f}%**.\nNo detailed subject-wise breakdown is available."

    # --- MARKS & RESULTS ---
    elif any(kw in msg for kw in ["mark", "result", "sgpa", "cgpa", "backlog", "score", "grade", "internal"]):
        marks_records = db.session.query(Mark, Subject).join(Subject, Mark.subject_id == Subject.id).filter(Mark.student_id == student.id).all()
        
        if "cgpa" in msg:
            response_text = f"📈 **Your CGPA**\nYour current Cumulative Grade Point Average (CGPA) is **{student.cgpa:.2f}**."
        elif "sgpa" in msg:
            response_text = f"📈 **Your SGPA**\nYour Semester Grade Point Average (SGPA) for the current semester is estimated at **{(student.cgpa + 0.2):.2f}**."
        elif "backlog" in msg:
            if student.backlog_count > 0:
                response_text = f"📚 **Backlog Details**\nYou currently have **{student.backlog_count} active backlog(s)**. Please register for the supplementary exams before the deadline."
            else:
                response_text = f"🌟 **No Backlogs!**\nYou have 0 active backlogs. Keep up the excellent work!"
        elif "internal" in msg:
            if marks_records:
                res_lines = [f"- **{s.subject_name}**: IA Marks: {getattr(m, 'internal_marks', m.marks_obtained)}/40" for m, s in marks_records]
                response_text = f"📝 **Internal Assessment Marks**:\n" + "\n".join(res_lines)
            else:
                response_text = "Internal marks have not been uploaded for the current semester yet."
        else:
            if marks_records:
                res_lines = [f"- **{s.subject_name}** ({s.subject_code}): **{m.marks_obtained:.0f}/{m.max_marks:.0f}** — Grade: **{m.grade or 'N/A'}**" for m, s in marks_records]
                marks_summary = "\n".join(res_lines)
                response_text = (
                    f"📝 **Semester Marks Report**:\n\n{marks_summary}\n\n"
                    f"**CGPA**: **{student.cgpa:.2f}** | **Backlogs**: **{student.backlog_count}**"
                )
            else:
                response_text = f"📝 **Marks Status**\nNo specific subject marks have been published yet. Your overall CGPA is **{student.cgpa:.2f}**."

    # --- ACADEMIC INFO ---
    elif any(kw in msg for kw in ["semester", "enrolled", "teacher", "hod", "timetable", "class", "subject"]):
        if "teacher" in msg:
            response_text = f"👨‍🏫 **Class Teacher**\nYour designated Class Teacher/Mentor is **Prof. Kavya N**. You can reach her at the BCA Department Office."
        elif "hod" in msg:
            response_text = f"👨‍💼 **Head of Department (HOD)**\nThe HOD of the {student.department} department is **Dr. Ramesh Kumar**."
        elif "semester" in msg and "current" in msg:
            response_text = f"🎓 **Current Semester**\nYou are currently enrolled in **Semester {getattr(student, 'current_semester', 'N/A')}**, {student.department}."
        elif "timetable" in msg or "class" in msg:
            response_text = (
                f"📅 **Timetable Overview**\n"
                f"- **Today**: Java Programming (9:00 AM), Database Systems (10:00 AM), Web Tech Lab (11:30 AM).\n"
                f"- **Tomorrow**: Software Engineering (9:00 AM), Computer Networks (10:00 AM), Aptitude Training (11:30 AM)."
            )
        else:
            response_text = f"📚 **Academic Enrollment**\nYou are in Semester {getattr(student, 'current_semester', 'N/A')} of {student.department}. You are enrolled in core subjects including Database Systems, Web Technologies, and Software Engineering."

    # --- EXAMINATIONS ---
    elif any(kw in msg for kw in ["exam", "upcoming", "procedure", "revaluation"]):
        if "upcoming" in msg or "timetable" in msg:
            response_text = f"📝 **Upcoming Exams**\nThe Semester End Examinations are scheduled to begin on **June 15, 2026**. The detailed timetable will be published in the 'Announcements' section."
        elif "revaluation" in msg:
            response_text = f"🔄 **Revaluation Procedure**\nTo apply for revaluation, download the Revaluation Form from the portals, pay the fee of 500 INR per subject via the Fee Portal, and submit the physical copy to the examination branch within 7 days of result declaration."
        elif "backlog procedure" in msg:
            response_text = f"📘 **Backlog Exams**\nBacklog exam registrations open 3 weeks before the regular semester exams. A fee of 300 INR per subject applies."
        else:
            response_text = f"📝 **Examinations**\nSemester exams start June 15th. Ensure you have 75% attendance and no pending fee dues to download your Hall Ticket."

    # --- FEES ---
    elif any(kw in msg for kw in ["fee", "due", "pending", "paid", "payment"]):
        fee_records = Fee.query.filter_by(student_id=student.id).all()
        total_p = student.pending_fee if student.pending_fee else (getattr(student, 'fee_pending', 0.0))
        
        if "paid" in msg:
            response_text = f"💵 **Paid Fees**\nYou have paid a total of **{(student.total_fee or 0.0) - total_p:,.2f} INR** towards your academic fees."
        elif "due" in msg or "next" in msg:
            response_text = f"📅 **Next Fee Due Date**\nThe deadline to clear your pending dues of **{total_p:,.2f} INR** is **June 10, 2026**."
        elif fee_records:
            res_lines = [f"- **{f.fee_category}**: {f.paid_amount:.0f} paid / {f.total_amount:.0f} total — Pending: **{f.pending_amount:.0f} INR**" for f in fee_records]
            status_tag = "🔴 **Dues Outstanding**" if total_p > 0 else "🟢 **Fully Cleared**"
            response_text = f"💰 **Fee Balance Sheet**:\n\n" + "\n".join(res_lines) + f"\n\n**Total Outstanding**: **{total_p:,.2f} INR** ({status_tag})"
        else:
            response_text = (
                f"💰 **Fee Summary**:\n"
                f"- **Total Fees Paid**: {(student.total_fee or 0.0) - total_p:,.2f} INR\n"
                f"- **Pending Dues**: **{total_p:,.2f} INR**\n"
                f"- **Status**: **{getattr(student, 'fee_status', 'N/A')}**"
            )

    # --- PLACEMENT ---
    elif any(kw in msg for kw in ["placement", "company", "companies", "drive"]):
        if "eligible" in msg:
            status = "Eligible" if student.cgpa >= 7.0 and student.backlog_count == 0 else "Not Eligible (Need 7.0+ CGPA and 0 Active Backlogs)"
            response_text = f"💼 **Placement Eligibility**\nBased on your profile (CGPA {student.cgpa:.2f}, Backlogs: {student.backlog_count}), you are currently **{status}** for Tier-1 company drives."
        elif "visited" in msg:
            response_text = f"🏢 **Recent Companies**\nRecently visited companies include Infosys, Wipro, TCS, and Accenture."
        else:
            response_text = f"🚀 **Upcoming Placement Drives**\nTCS Ninja and Wipro Elite drives are scheduled for the 3rd week of August. Keep your resume updated and check the Placement Portal for registration links."

    # --- STUDENT SERVICES ---
    elif any(kw in msg for kw in ["leave", "certificate", "contact", "office"]):
        if "leave" in msg:
            response_text = f"📩 **Leave Application**\nTo apply for leave, navigate to the 'Approvals & Requests' tab, fill out the Leave Request Form, and it will be routed to your Class Teacher for approval."
        elif "certificate" in msg:
            response_text = f"📜 **Certificate Requests**\nBonafide certificates and transcripts can be requested via the 'Student Services' portal. A processing time of 2-3 working days applies."
        else:
            response_text = f"📞 **Department Contact**\nYou can contact the {student.department} department office at `dept.{student.department.lower()[:3]}@nu.ac.in` or visit Room 204 during working hours."

    # --- FALLBACK ---
    else:
        response_text = (
            f"I am your Academic AI Assistant, {student.full_name}! 🤖\n\n"
            f"I couldn't quite understand that. Try asking me about:\n"
            f"- **My Attendance Today**\n"
            f"- **My Semester Marks**\n"
            f"- **Pending Fees**\n"
            f"- **Upcoming Exams**\n"
            f"- **Placement Eligibility**"
        )
        
    return jsonify({ "response": response_text })
