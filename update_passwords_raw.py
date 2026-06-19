import sqlite3
import bcrypt
import os

def set_password(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

hashed = set_password('Nrup@123456!')

db_path = os.path.join(os.path.dirname(__file__), 'backend', 'instance', 'student_portal.db')
conn = sqlite3.connect(db_path)
c = conn.cursor()
c.execute("UPDATE staffs SET password_hash = ?", (hashed,))
c.execute("UPDATE students SET password_hash = ?", (hashed,))
c.execute("UPDATE parents SET password_hash = ?", (hashed,))
conn.commit()
conn.close()
print("Passwords updated via sqlite3 directly")
