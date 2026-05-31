import sqlite3
import os

db_path = 'c:/Users/dines.DELL/Desktop/New folder (2)/student_portal/backend/instance/student_portal.db'
if not os.path.exists(db_path):
    print("Database not found!")
    exit(1)

conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Get tables
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
print("Tables:", cursor.fetchall())

# Let's assume the table is 'marks'
try:
    cursor.execute('''
    SELECT s.id, s.full_name, m.id, m.subject_id, sub.subject_name, m.internal_marks, m.external_marks
    FROM marks m
    JOIN students s ON m.student_id = s.id
    JOIN subject sub ON m.subject_id = sub.id
    WHERE s.full_name LIKE '%lakshmi%'
    ''')
    print("\nLakshmi Marks:")
    for row in cursor.fetchall():
        print(row)
except Exception as e:
    print("Error querying marks:", e)

conn.close()
