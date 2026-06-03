import re

hod_routes_path = r'c:\Users\dines.DELL\Desktop\New folder (2)\student_portal\backend\routes\hod_routes.py'
with open(hod_routes_path, 'r', encoding='utf-8') as f:
    routes_content = f.read()

new_routes = """
# ── EXAMINATIONS ENDPOINTS ──

@hod_bp.route('/examinations/semester_overview', methods=['GET'])
def exam_semester_overview():
    try:
        # Mock overview data for bar chart
        overview = [
            {"name": "Sem 1", "pass_percentage": 88},
            {"name": "Sem 2", "pass_percentage": 85},
            {"name": "Sem 3", "pass_percentage": 90},
            {"name": "Sem 4", "pass_percentage": 82},
            {"name": "Sem 5", "pass_percentage": 92},
            {"name": "Sem 6", "pass_percentage": 0} # No results yet for 6
        ]
        
        # Mock distribution data for pie chart
        distribution = [
            {"name": "First Class with Distinction", "value": 35, "color": "#2563eb"},
            {"name": "First Class", "value": 45, "color": "#10b981"},
            {"name": "Second Class", "value": 15, "color": "#f59e0b"},
            {"name": "Fail", "value": 5, "color": "#ef4444"}
        ]
        
        return jsonify({"overview": overview, "distribution": distribution}), 200
    except Exception as e:
        print("Error fetching semester overview:", str(e))
        return jsonify({"error": "Failed to fetch overview"}), 500

@hod_bp.route('/examinations/subject_results/<int:semester>', methods=['GET'])
def exam_subject_results(semester):
    try:
        # Mock data based on semester
        if semester == 6:
            return jsonify([]), 200 # No results yet
        
        # Simple mock data
        results = [
            {"subject": "Cloud Computing", "appeared": 58, "pass": 55, "fail": 3, "pass_percentage": "94%"},
            {"subject": "Mobile Application Dev", "appeared": 58, "pass": 52, "fail": 6, "pass_percentage": "89%"},
            {"subject": "Cryptography", "appeared": 58, "pass": 50, "fail": 8, "pass_percentage": "86%"},
        ]
        return jsonify(results), 200
    except Exception as e:
        print("Error fetching subject results:", str(e))
        return jsonify({"error": "Failed to fetch results"}), 500

@hod_bp.route('/examinations/backlogs/<int:semester>', methods=['GET'])
def exam_backlogs(semester):
    try:
        # Mock backlog data
        if semester == 6:
            return jsonify([]), 200
            
        backlogs = [
            {"reg_no": "U24AN23S0101", "student_name": "Arun Kumar", "subject": "Cryptography", "semester": semester},
            {"reg_no": "U24AN23S0105", "student_name": "Manasa P", "subject": "Mobile Application Dev", "semester": semester}
        ]
        return jsonify(backlogs), 200
    except Exception as e:
        print("Error fetching backlogs:", str(e))
        return jsonify({"error": "Failed to fetch backlogs"}), 500
"""

if "/examinations/semester_overview" not in routes_content:
    routes_content += new_routes
    with open(hod_routes_path, 'w', encoding='utf-8') as f:
        f.write(routes_content)
    print("Added examinations endpoints to hod_routes.py")
else:
    print("Examinations endpoints already exist in hod_routes.py")

# Fix Recharts in HODExaminations.jsx
jsx_path = r'c:\Users\dines.DELL\Desktop\New folder (2)\student_portal\src\pages\hod\HODExaminations.jsx'
with open(jsx_path, 'r', encoding='utf-8') as f:
    jsx_content = f.read()

# Add minWidth: 0, minHeight: 0 to flex containers containing ResponsiveContainer to prevent width(-1) warnings
old_div_1 = "<div style={{ height: '260px' }}>"
new_div_1 = "<div style={{ height: '260px', width: '100%', minWidth: 0 }}>"
jsx_content = jsx_content.replace(old_div_1, new_div_1)

old_div_2 = "<div style={{ height: '260px', display: 'flex', alignItems: 'center' }}>"
new_div_2 = "<div style={{ height: '260px', width: '100%', minWidth: 0, display: 'flex', alignItems: 'center' }}>"
jsx_content = jsx_content.replace(old_div_2, new_div_2)

with open(jsx_path, 'w', encoding='utf-8') as f:
    f.write(jsx_content)
print("Fixed Recharts containers in HODExaminations.jsx")
