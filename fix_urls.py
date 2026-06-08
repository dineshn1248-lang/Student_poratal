import os
import glob

files = glob.glob('src/pages/**/*.jsx', recursive=True)
c = 0
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    target = "`${'https://student-poratal.onrender.com/api'}"
    replacement = "`${import.meta.env.PROD ? 'https://student-poratal.onrender.com/api' : 'http://localhost:5000/api'}"
    
    if target in content:
        content = content.replace(target, replacement)
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
        c += 1

print(f"Updated {c} files.")
