import os

count = 0
for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith('.jsx') or file.endswith('.js'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            if 'import.meta.env.VITE_API_BASE_URL' in content:
                # Replace with hardcoded render URL
                new_content = content.replace("import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'", "'https://student-poratal.onrender.com/api'")
                new_content = new_content.replace("import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5000'", "'https://student-poratal.onrender.com'")
                
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                count += 1

print(f"Modified {count} files")
