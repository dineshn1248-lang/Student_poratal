import re

file_path = r'c:\Users\dines.DELL\Desktop\New folder (2)\student_portal\src\pages\faculty\Faculty.css'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the sidebar background
old_sidebar_css = """.faculty-sidebar {
  width: 260px;
  background-color: var(--faculty-navy);"""

new_sidebar_css = """.faculty-sidebar {
  width: 280px;
  background: linear-gradient(180deg, #081226 0%, #0d1f44 100%);"""

content = content.replace(old_sidebar_css, new_sidebar_css)

# Replace the margin-left for the main content since width changed to 280px
old_main_css = """.faculty-main {
  flex: 1;
  margin-left: 260px;"""

new_main_css = """.faculty-main {
  flex: 1;
  margin-left: 280px;"""

content = content.replace(old_main_css, new_main_css)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated Faculty.css")
