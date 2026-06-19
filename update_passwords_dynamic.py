import sqlite3
import os
from werkzeug.security import generate_password_hash

hashed = generate_password_hash('Nrup@123456!')

db_path = os.path.join(os.path.dirname(__file__), 'backend', 'instance', 'student_portal.db')
conn = sqlite3.connect(db_path)
c = conn.cursor()

tables = [t[0] for t in c.execute("SELECT name FROM sqlite_master WHERE type='table';").fetchall()]
print("Tables:", tables)

if 'staff' in tables:
    c.execute("UPDATE staff SET password_hash = ?", (hashed,))
elif 'staffs' in tables:
    c.execute("UPDATE staffs SET password_hash = ?", (hashed,))

if 'student' in tables:
    c.execute("UPDATE student SET password_hash = ?", (hashed,))
elif 'students' in tables:
    c.execute("UPDATE students SET password_hash = ?", (hashed,))

if 'parent' in tables:
    c.execute("UPDATE parent SET password_hash = ?", (hashed,))
elif 'parents' in tables:
    c.execute("UPDATE parents SET password_hash = ?", (hashed,))

conn.commit()
conn.close()
print("Passwords updated successfully!")
