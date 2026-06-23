import sqlite3
c = sqlite3.connect('instance/student_portal.db')
c.execute("UPDATE parents SET linked_student_id='U24AN23S007', name='Anjali Sharma Parent' WHERE id=11")
c.commit()
print("Updated linked_student_id and name for Anjali's parent.")
