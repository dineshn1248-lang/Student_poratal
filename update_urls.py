import os, re

src_dir = r'c:\Users\dines.DELL\Desktop\New folder (2)\student_portal\src'
pattern = re.compile(r"""(['"`])http://localhost:5000/api(.*?)(?<!\\)\1""")

def replacer(match):
    path = match.group(2)
    return f"`${{import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}}{path}`"

count = 0
for root, _, files in os.walk(src_dir):
    for file in files:
        if file.endswith(('.js', '.jsx')):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            if pattern.search(content):
                new_content = pattern.sub(replacer, content)
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated {filepath}")
                count += 1

print(f"Total files updated: {count}")
