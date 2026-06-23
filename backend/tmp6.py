import sqlite3
c = sqlite3.connect('instance/student_portal.db')

res = c.execute("SELECT id, name, linked_student_id, student_id FROM parents WHERE phone_number='+919999999999'").fetchall()
print(res)

student = c.execute("SELECT register_no FROM students WHERE id=7").fetchone()
print("Anjali register_no:", student)
