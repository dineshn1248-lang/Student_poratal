import glob
for f in glob.glob('src/**/*.js*', recursive=True):
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    if 'localhost:5000' in content:
        content = content.replace('localhost:5000', '127.0.0.1:5000')
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
