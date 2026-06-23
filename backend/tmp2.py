import sqlite3
c = sqlite3.connect('instance/student_portal.db')
c.execute("UPDATE students SET parent_phone='+917349101248' WHERE full_name LIKE '%Chetan%'")
c.commit()
rows = c.execute("SELECT student_id, full_name, parent_id, parent_phone FROM students WHERE full_name LIKE '%Chetan%'").fetchall()
print(rows)
