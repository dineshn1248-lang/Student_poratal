import os
import shutil
import re

hod_dir = r"c:\Users\dines.DELL\Desktop\New folder (2)\student_portal\src\pages\hod"
principal_dir = r"c:\Users\dines.DELL\Desktop\New folder (2)\student_portal\src\pages\principal"

# 1. Clear the principal directory
if os.path.exists(principal_dir):
    shutil.rmtree(principal_dir)
os.makedirs(principal_dir)

def copy_and_rename(src_dir, dest_dir):
    for item in os.listdir(src_dir):
        src_path = os.path.join(src_dir, item)
        
        # Determine the new name for the item
        new_name = item.replace("HOD", "Principal").replace("hod", "principal")
        dest_path = os.path.join(dest_dir, new_name)
        
        if os.path.isdir(src_path):
            os.makedirs(dest_path)
            copy_and_rename(src_path, dest_path)
        else:
            # Copy file and replace contents
            with open(src_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Replace UI labels and component names
            content = content.replace("HOD", "Principal")
            content = content.replace("hod", "principal")
            
            # Exception: we still want to use hodApi.js because we haven't ported all endpoints
            # The replace above will change 'hodApi' to 'principalApi'. Let's revert it for the API imports
            content = content.replace("../../api/principalApi", "../../api/hodApi")
            content = content.replace("../api/principalApi", "../../api/hodApi") # Just in case

            with open(dest_path, 'w', encoding='utf-8') as f:
                f.write(content)

copy_and_rename(hod_dir, principal_dir)
print("Successfully cloned HOD Dashboard to Principal Dashboard!")
