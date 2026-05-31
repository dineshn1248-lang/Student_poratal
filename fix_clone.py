import os
import re

principal_dir = r"c:\Users\dines.DELL\Desktop\New folder (2)\student_portal\src\pages\principal"

def fix_hod(src_dir):
    for item in os.listdir(src_dir):
        src_path = os.path.join(src_dir, item)
        
        # Determine the new name for the item
        new_name = item.replace("Hod", "Principal")
        dest_path = os.path.join(src_dir, new_name)
        
        if src_path != dest_path:
            os.rename(src_path, dest_path)
            src_path = dest_path # update path for reading

        if os.path.isdir(src_path):
            fix_hod(src_path)
        else:
            with open(src_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = content.replace("Hod", "Principal").replace("hod", "principal").replace("HOD", "Principal")
            # revert api back if accidentally changed
            new_content = new_content.replace("../../api/principalApi", "../../api/hodApi")
            new_content = new_content.replace("../api/principalApi", "../../api/hodApi")
            
            with open(src_path, 'w', encoding='utf-8') as f:
                f.write(new_content)

fix_hod(principal_dir)
print("Fixed 'Hod' casing issue!")
