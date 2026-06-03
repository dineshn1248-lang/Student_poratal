import re

hod_routes_path = r'c:\Users\dines.DELL\Desktop\New folder (2)\student_portal\backend\routes\hod_routes.py'
with open(hod_routes_path, 'r', encoding='utf-8') as f:
    routes_content = f.read()

new_route = """
@hod_bp.route('/internal-marks', methods=['GET'])
def get_internal_marks():
    try:
        semester = request.args.get('semester', '6')
        semester = int(semester)
        
        # Mock Data based on semester
        if semester == 6:
            data = [
                {"id": 1, "code": "61601", "subject": "Cloud Computing", "faculty": "Dr. Lakshmi Priya", "sem": 6, "avgMarks": "36.5 / 40", "status": "Approved"},
                {"id": 2, "code": "61602", "subject": "Mobile Application Development", "faculty": "Prof. Sankar", "sem": 6, "avgMarks": "34.2 / 40", "status": "Pending HOD Approval"},
                {"id": 3, "code": "61603", "subject": "Cryptography and Network Security", "faculty": "Dr. K Ramesh", "sem": 6, "avgMarks": "-", "status": "Pending Faculty Entry"}
            ]
        elif semester == 5:
            data = [
                {"id": 4, "code": "61509", "subject": "Design and Analysis of Algorithms", "faculty": "Prof. Sankar", "sem": 5, "avgMarks": "35.8 / 40", "status": "Approved"},
                {"id": 5, "code": "61510", "subject": "Statistical Computing and R Programming", "faculty": "Dr. Lakshmi Priya", "sem": 5, "avgMarks": "37.1 / 40", "status": "Approved"},
                {"id": 6, "code": "61511", "subject": "Software Engineering", "faculty": "Dr. K Ramesh", "sem": 5, "avgMarks": "32.4 / 40", "status": "Approved"}
            ]
        else:
            data = []
            
        return jsonify(data), 200
    except Exception as e:
        print("Error fetching internal marks:", str(e))
        return jsonify({"error": "Failed to fetch internal marks"}), 500
"""

if "/internal-marks" not in routes_content:
    routes_content += new_route
    with open(hod_routes_path, 'w', encoding='utf-8') as f:
        f.write(routes_content)
    print("Added internal marks endpoint to hod_routes.py")
else:
    print("Internal marks endpoint already exists")

