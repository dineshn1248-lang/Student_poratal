import sqlite3

conn = sqlite3.connect('c:/Users/dines.DELL/Desktop/New folder (2)/student_portal/backend/instance/student_portal.db')
cursor = conn.cursor()

try:
    cursor.execute('''
    SELECT s.id, s.full_name, m.id, m.subject_id, sub.subject_name, m.internal_marks, m.external_marks
    FROM marks m
    JOIN students s ON m.student_id = s.id
    JOIN subjects sub ON m.subject_id = sub.id
    WHERE s.full_name LIKE '%lakshmi%'
    ''')
    print("\nLakshmi Marks:")
    for row in cursor.fetchall():
        print(row)
        
    # Update Lakshmi's marks to passing
    cursor.execute('''
    UPDATE marks
    SET external_marks = 36
    WHERE student_id IN (SELECT id FROM students WHERE full_name LIKE '%lakshmi%')
    ''')
    conn.commit()
    print("Updated Lakshmi's external marks to 36 so she passes everything.")
except Exception as e:
    print("Error querying marks:", e)

conn.close()
