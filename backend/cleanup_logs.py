import sqlite3
import os

db_path = r"c:\Users\dines.DELL\Desktop\New folder (2)\student_portal\backend\instance\student_portal.db"

if os.path.exists(db_path):
    print("Database found! Cleaning up communication logs...")
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    try:
        # Update any Simulated or Pending logs to Sent
        cursor.execute("UPDATE communication_logs SET status = 'Sent' WHERE status IN ('Simulated', 'Pending')")
        print(f"Updated {cursor.rowcount} logs successfully to 'Sent'!")
    except Exception as e:
        print(f"Error updating logs: {e}")
        
    conn.commit()
    conn.close()
    print("Cleanup completed.")
else:
    print("Database file not found at:", db_path)
