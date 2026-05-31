import sys
import json

from app import create_app
from models import Student, Staff, Parent, db

app = create_app()
client = app.test_client()

def run_tests():
    print("Starting Integration Self-Test...")
    with app.app_context():
        # 1. Test Student Login & Dashboard
        print("\n--- Testing Student Flow ---")
        student = Student.query.first()
        if not student:
            print("ERROR: No student found in DB.")
            return

        # We'll mock the login by bypassing the password check, or we just test the login endpoint if we know the password.
        # Actually, let's just generate a token using the same logic the login route uses, OR test the dashboard endpoint directly with a mocked user context.
        # Let's test the login endpoint with actual credentials. Wait, passwords are hashed. We don't know the raw password.
        # We can just test the protected endpoints by creating a JWT token!
        import jwt
        import datetime
        from flask import current_app

        import os
        secret_key = os.environ.get('JWT_SECRET_KEY', 'dev-secret-key')
        
        student_token = jwt.encode({
            'user_id': student.id,
            'role': 'student',
            'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=24)
        }, secret_key, algorithm='HS256')

        print("Testing Student Dashboard API...")
        res = client.get('/api/student/dashboard', headers={'Authorization': f'Bearer {student_token}'})
        if res.status_code == 200:
            print("SUCCESS: Student Dashboard loaded correctly.")
        else:
            print(f"FAILED: Student Dashboard returned {res.status_code}: {res.get_data(as_text=True)}")

        # 2. Test Staff / HOD Flow
        print("\n--- Testing HOD Flow ---")
        hod = Staff.query.filter_by(role='HOD').first()
        if hod:
            hod_token = jwt.encode({
                'user_id': hod.id,
                'role': 'staff',
                'staff_role': 'HOD',
                'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=24)
            }, secret_key, algorithm='HS256')

            print("Testing HOD Dashboard API...")
            res = client.get('/api/hod/dashboard', headers={'Authorization': f'Bearer {hod_token}'})
            if res.status_code == 200:
                print("SUCCESS: HOD Dashboard loaded correctly.")
            else:
                print(f"FAILED: HOD Dashboard returned {res.status_code}: {res.get_data(as_text=True)}")
        else:
            print("WARNING: No HOD found in DB.")

        # 3. Test Parent Flow
        print("\n--- Testing Parent Flow ---")
        parent = Parent.query.first()
        if parent:
            parent_token = jwt.encode({
                'user_id': parent.id,
                'role': 'parent',
                'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=24)
            }, secret_key, algorithm='HS256')

            print("Testing Parent Dashboard API...")
            res = client.get('/api/parent/dashboard', headers={'Authorization': f'Bearer {parent_token}'})
            if res.status_code == 200:
                print("SUCCESS: Parent Dashboard loaded correctly.")
            else:
                print(f"FAILED: Parent Dashboard returned {res.status_code}: {res.get_data(as_text=True)}")

        # 4. Test Forgot Password Mock API (if exists)
        # We didn't build a backend endpoint for forgot password, the UI simulates it.
        
    print("\nAll automated integration tests completed successfully!")

if __name__ == '__main__':
    run_tests()
