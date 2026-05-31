import os
import re

principal_dir = r"c:\Users\dines.DELL\Desktop\New folder (2)\student_portal\src\pages\principal"

def fix_api_imports(src_dir):
    for item in os.listdir(src_dir):
        src_path = os.path.join(src_dir, item)
        if os.path.isdir(src_path):
            fix_api_imports(src_path)
        else:
            with open(src_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Any API function exported by hodApi.js starts with fetchHod, updateHod, createHod, deleteHod
            # We accidentally renamed them to fetchPrincipal, updatePrincipal, etc.
            content = re.sub(r'fetchPrincipal([A-Z])', r'fetchHod\1', content)
            content = re.sub(r'updatePrincipal([A-Z])', r'updateHod\1', content)
            content = re.sub(r'createPrincipal([A-Z])', r'createHod\1', content)
            content = re.sub(r'deletePrincipal([A-Z])', r'deleteHod\1', content)
            
            with open(src_path, 'w', encoding='utf-8') as f:
                f.write(content)

fix_api_imports(principal_dir)
print("Regex fixed api imports!")
