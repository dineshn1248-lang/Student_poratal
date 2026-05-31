import sqlite3
import os

db_path = r"c:\Users\dines.DELL\Desktop\New folder (2)\student_portal\backend\instance\student_portal.db"

if os.path.exists(db_path):
    print("Database found! Running migration...")
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Add parent_phone
    try:
        cursor.execute("ALTER TABLE students ADD COLUMN parent_phone TEXT")
        print("Added parent_phone column successfully!")
    except Exception as e:
        print(f"parent_phone column: {e}")
        
    # Add address
    try:
        cursor.execute("ALTER TABLE students ADD COLUMN address TEXT")
        print("Added address column successfully!")
    except Exception as e:
        print(f"address column: {e}")
        
    conn.commit()
    conn.close()
    print("Migration completed.")
else:
    print("Database file not found at:", db_path)
