import sqlite3

db_path = 'c:/Users/dines.DELL/Desktop/New folder (2)/student_portal/backend/instance/student_portal.db'
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

try:
    # Update student's phone and parent's phone (to be safe)
    cursor.execute('''
    UPDATE students
    SET phone = '+917349101248', parent_phone = '+917349101248'
    WHERE full_name LIKE '%Arun Kumar%'
    ''')
    
    # Update parent record if exists
    cursor.execute('''
    UPDATE parents
    SET phone_number = '+917349101248'
    WHERE student_id IN (SELECT id FROM students WHERE full_name LIKE '%Arun Kumar%')
    ''')
    
    conn.commit()
    print("Successfully updated Arun Kumar's phone number.")
except Exception as e:
    print("Error:", e)
finally:
    conn.close()
