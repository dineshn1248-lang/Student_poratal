import sqlite3
import random

conn = sqlite3.connect('c:/Users/dines.DELL/Desktop/New folder (2)/student_portal/backend/instance/student_portal.db')
cursor = conn.cursor()

# Get all students without marks
cursor.execute('''
SELECT id FROM students WHERE id NOT IN (SELECT DISTINCT student_id FROM marks)
''')
student_ids = [row[0] for row in cursor.fetchall()]

# Get all subject ids
cursor.execute('SELECT id FROM subjects')
subject_ids = [row[0] for row in cursor.fetchall()]

if not subject_ids:
    subject_ids = [1, 2, 3, 4, 5, 6]

for sid in student_ids:
    for sub_id in random.sample(subject_ids, min(6, len(subject_ids))):
        internal = random.randint(15, 40)
        external = random.randint(25, 60)
        cursor.execute('''
        INSERT INTO marks (student_id, subject_id, internal_marks, external_marks)
        VALUES (?, ?, ?, ?)
        ''', (sid, sub_id, internal, external))

conn.commit()
print(f"Added mock marks for {len(student_ids)} students.")
conn.close()
