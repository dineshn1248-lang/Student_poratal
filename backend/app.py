from flask import Flask,request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/auth/student/login', methods=['POST'])
def student_login():
    data = request.json
    uan = data.get("uan")
    password = data.get("password")

    if uan and password:
        return jsonify({"token": "mock_student_token"}), 200
    
    return jsonify({"error": "Invalid UAN or password"}), 401

@app.route('/api/auth/parent/login', methods=['POST'])
def parent_login():
    data = request.json
    token = data.get("token")
    password = data.get("password")

    if token and password:
        return jsonify({"token": "mock_parent_token"}), 200
        
    return jsonify({"error": "Invalid token or password"}), 401

@app.route('/api/auth/staff/login', methods=['POST'])
def staff_login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    # Hardcoded (later DB)
    if username == "principal@college.com" and password == "1234":
        return jsonify({"token": "mock_principal_token", "user": {"role": "principal", "full_name": "Dr. Smith"}}), 200

    elif username == "hod@college.com" and password == "1234":
        return jsonify({"token": "mock_hod_token", "user": {"role": "hod", "full_name": "Prof. Davis"}}), 200

    elif username == "faculty@college.com" and password == "1234":
        return jsonify({"token": "mock_faculty_token", "user": {"role": "faculty", "full_name": "Mr. Roberts"}}), 200

    return jsonify({"error": "Invalid username or password"}), 401

if __name__ == "__main__":
    app.run(debug=True)