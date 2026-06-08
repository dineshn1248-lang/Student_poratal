import sqlite3
import os

db_path = os.path.join('instance', 'student_portal.db')

conn = sqlite3.connect(db_path)
cursor = conn.cursor()

try:
    cursor.execute("ALTER TABLE students ADD COLUMN result_status VARCHAR(50) DEFAULT 'PASSED'")
    print("Added result_status column to students.")
except sqlite3.OperationalError as e:
    print(f"Column might already exist: {e}")

try:
    cursor.execute('''
        CREATE TABLE placements (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_id INTEGER NOT NULL,
            company_name VARCHAR(200) NOT NULL,
            package VARCHAR(50),
            placement_date VARCHAR(50),
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(student_id) REFERENCES students(id)
        )
    ''')
    print("Created placements table.")
except sqlite3.OperationalError as e:
    print(f"Table might already exist: {e}")

conn.commit()
conn.close()
