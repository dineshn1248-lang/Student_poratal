import sqlite3
import os
from werkzeug.security import generate_password_hash

hashed = generate_password_hash('Nrup@123456!')

db_path = os.path.join(os.path.dirname(__file__), 'backend', 'instance', 'student_portal.db')
conn = sqlite3.connect(db_path)
c = conn.cursor()
c.execute("UPDATE staff SET password_hash = ?", (hashed,))
c.execute("UPDATE student SET password_hash = ?", (hashed,))
c.execute("UPDATE parent SET password_hash = ?", (hashed,))
conn.commit()
conn.close()
print("Passwords updated via sqlite3 directly")
