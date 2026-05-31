import os

principal_dir = r"c:\Users\dines.DELL\Desktop\New folder (2)\student_portal\src\pages\principal"

def fix_api_imports(src_dir):
    for item in os.listdir(src_dir):
        src_path = os.path.join(src_dir, item)
        if os.path.isdir(src_path):
            fix_api_imports(src_path)
        else:
            with open(src_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Revert the API function names back to HOD so they match hodApi.js
            # Examples: fetchPrincipalExamStats -> fetchHODExamStats
            # PrincipalStats -> HODStats
            new_content = content.replace("fetchPrincipal", "fetchHOD")
            new_content = new_content.replace("generatePrincipal", "generateHOD")
            new_content = new_content.replace("approvePrincipal", "approveHOD")
            new_content = new_content.replace("rejectPrincipal", "rejectHOD")
            
            with open(src_path, 'w', encoding='utf-8') as f:
                f.write(new_content)

fix_api_imports(principal_dir)
print("Reverted fetch functions to HOD!")
