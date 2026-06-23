import sqlite3
c = sqlite3.connect('instance/student_portal.db')

# 1. Find Lakshmi
student = c.execute("SELECT id, full_name, parent_id FROM students WHERE full_name LIKE '%Lakshmi%'").fetchone()
if student:
    student_id = student[0]
    print(f"Found Student: {student}")
    
    # Update students table
    c.execute("UPDATE students SET parent_phone='+919380179909' WHERE id=?", (student_id,))
    
    # Update parents table
    c.execute("UPDATE parents SET phone_number='+919380179909' WHERE student_id=?", (student_id,))
    
    c.commit()
    print("Update successful.")
    
    # Check parent info
    parent = c.execute("SELECT parent_id, token, phone_number FROM parents WHERE student_id=?", (student_id,)).fetchone()
    print(f"Parent Info: {parent}")
else:
    print("Lakshmi not found in database.")
