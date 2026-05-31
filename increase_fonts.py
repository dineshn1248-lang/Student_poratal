import os
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Regex to match fontSize: '14px' or fontSize: "14px" or fontSize: 14
    # Group 1 is the quote if exists, Group 2 is the number, Group 3 is px/em etc if exists
    pattern = r"fontSize:\s*(['\"]?)(\d+\.?\d*)(px|em|rem)?\1"

    def repl(m):
        quote = m.group(1)
        val = float(m.group(2))
        unit = m.group(3) or ''
        
        # Increase by 2
        new_val = val + 2
        
        # Format back
        if int(new_val) == new_val:
            new_val = int(new_val)
            
        if quote:
            return f"fontSize: {quote}{new_val}{unit}{quote}"
        else:
            return f"fontSize: {new_val}"

    new_content = re.sub(pattern, repl, content)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith('.jsx'):
            process_file(os.path.join(root, file))

# Also update index.css global font sizes
def process_css(filepath):
    if not os.path.exists(filepath): return
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    pattern = r"font-size:\s*(\d+\.?\d*)px;"
    def repl(m):
        new_val = float(m.group(1)) + 2
        if int(new_val) == new_val: new_val = int(new_val)
        return f"font-size: {new_val}px;"
        
    new_content = re.sub(pattern, repl, content)
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

process_css('src/index.css')
process_css('src/App.css')
