import os

principal_dir = r"c:\Users\dines.DELL\Desktop\New folder (2)\student_portal\src\pages\principal"

def fix_hod_casing(src_dir):
    for item in os.listdir(src_dir):
        src_path = os.path.join(src_dir, item)
        if os.path.isdir(src_path):
            fix_hod_casing(src_path)
        else:
            with open(src_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # fix from fetchHOD to fetchHod
            new_content = content.replace("fetchHOD", "fetchHod")
            new_content = new_content.replace("generateHOD", "generateHod")
            new_content = new_content.replace("approveHOD", "approveHod")
            new_content = new_content.replace("rejectHOD", "rejectHod")
            
            with open(src_path, 'w', encoding='utf-8') as f:
                f.write(new_content)

fix_hod_casing(principal_dir)
print("Reverted fetch functions to fetchHod!")
