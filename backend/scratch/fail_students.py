import sqlite3
import random

conn = sqlite3.connect('c:/Users/dines.DELL/Desktop/New folder (2)/student_portal/backend/instance/student_portal.db')
cursor = conn.cursor()

# Get 5 students who are NOT Lakshmi
cursor.execute('''
SELECT id FROM students WHERE full_name NOT LIKE '%lakshmi%' LIMIT 5
''')
fail_student_ids = [row[0] for row in cursor.fetchall()]

# Update one of their subjects to have failing marks (external = 10, internal = 15)
for sid in fail_student_ids:
    cursor.execute('''
    UPDATE marks 
    SET external_marks = 10, internal_marks = 15 
    WHERE id = (SELECT id FROM marks WHERE student_id = ? LIMIT 1)
    ''', (sid,))

conn.commit()
print(f"Updated {len(fail_student_ids)} students to have failing marks.")
conn.close()
