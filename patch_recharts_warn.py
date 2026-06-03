import re

jsx_path = r'c:\Users\dines.DELL\Desktop\New folder (2)\student_portal\src\pages\hod\HODExaminations.jsx'
with open(jsx_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace width="100%" height="100%" with width="99%" height={260}
content = content.replace('<ResponsiveContainer width="100%" height="100%">', '<ResponsiveContainer width="99%" height={260}>')

# Replace width="60%" height="100%" with width="60%" height={260}
content = content.replace('<ResponsiveContainer width="60%" height="100%">', '<ResponsiveContainer width="60%" height={260}>')

with open(jsx_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated ResponsiveContainer props to fix Recharts warning")
