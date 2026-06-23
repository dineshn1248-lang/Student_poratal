import os

def replace_in_dir(directory):
    count = 0
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.js') or file.endswith('.jsx'):
                path = os.path.join(root, file)
                try:
                    with open(path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    if 'student-poratal.onrender.com' in content:
                        new_content = content.replace('student-poratal.onrender.com', 'video-qr-app.onrender.com')
                        with open(path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        count += 1
                        print(f"Updated {path}")
                except Exception as e:
                    print(f"Error processing {path}: {e}")
    print(f"Total files updated: {count}")

if __name__ == '__main__':
    replace_in_dir('src')
