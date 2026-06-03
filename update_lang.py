import re

routes_path = r'c:\Users\dines.DELL\Desktop\New folder (2)\student_portal\backend\routes\hod_routes.py'
with open(routes_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('"language": {"code": "en"}', '"language": {"code": "en_US"}')

with open(routes_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated template language code to en_US")
