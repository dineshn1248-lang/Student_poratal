import os

principal_dir = r"c:\Users\dines.DELL\Desktop\New folder (2)\student_portal\src\pages\principal"

def fix_mistakes(src_dir):
    for item in os.listdir(src_dir):
        src_path = os.path.join(src_dir, item)
        if os.path.isdir(src_path):
            fix_mistakes(src_path)
        else:
            with open(src_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Fix 'metprincipal' back to 'method'
            content = content.replace("metprincipal:", "method:")
            content = content.replace("metprincipal", "method")
            
            # Fix hardcoded URLs that were changed from /api/hod/ to /api/principal/
            content = content.replace("http://localhost:5000/api/principal/", "http://localhost:5000/api/hod/")
            
            with open(src_path, 'w', encoding='utf-8') as f:
                f.write(content)

fix_mistakes(principal_dir)
print("Mistakes fixed!")
