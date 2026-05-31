import os
import re

principal_dir = r"c:\Users\dines.DELL\Desktop\New folder (2)\student_portal\src\pages\principal"
for root, _, files in os.walk(principal_dir):
    for f in files:
        if f.endswith('.jsx'):
            path = os.path.join(root, f)
            with open(path, 'r', encoding='utf-8') as file:
                lines = file.readlines()
            for i, line in enumerate(lines):
                if re.search(r'(handleDelete|handlePublish|handleApprove|handleUpdate|handleSave|onSubmit=|<form)', line):
                    print(f"{f}:{i+1}: {line.strip()}")
