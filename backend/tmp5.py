import sqlite3
c = sqlite3.connect('instance/student_portal.db')
print(c.execute("SELECT backlog_count, result_status FROM students WHERE register_no='U24AN23S007'").fetchone())
