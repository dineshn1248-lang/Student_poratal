import sqlite3
c = sqlite3.connect('instance/student_portal.db')
student = c.execute("SELECT id FROM students WHERE register_no='U24AN23S007'").fetchone()
if student:
    student_id = student[0]
    # Mark student as failed with 2 backlogs
    c.execute("UPDATE students SET backlog_count=2, result_status='FAILED', cgpa=3.60, parent_phone='+919999999999' WHERE id=?", (student_id,))
    
    # We also need some marks to show she failed. Wait, the DB does not have a marks table, does it?
    # Let me check if there's a marks table.
    try:
        marks = c.execute("SELECT * FROM marks WHERE student_id=?", (student_id,)).fetchall()
        print("Marks:", marks)
    except Exception as e:
        print("No marks table:", e)
    
    c.commit()
    print("Anjali updated.")
else:
    print("Student not found")
