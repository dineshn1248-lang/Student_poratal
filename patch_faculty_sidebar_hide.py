import re

file_path = r'c:\Users\dines.DELL\Desktop\New folder (2)\student_portal\src\pages\faculty\Faculty.css'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the collapsed sidebar width behavior
old_collapsed = """.faculty-sidebar.collapsed {
  width: 80px;
}"""

new_collapsed = """.faculty-sidebar.collapsed {
  width: 0;
  opacity: 0;
  visibility: hidden;
  transform: translateX(-100%);
}"""

content = content.replace(old_collapsed, new_collapsed)

# Replace the main margin when collapsed
old_main_collapsed = """.sidebar-collapsed .faculty-main {
  margin-left: 80px;
}"""

new_main_collapsed = """.sidebar-collapsed .faculty-main {
  margin-left: 0;
}"""

content = content.replace(old_main_collapsed, new_main_collapsed)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated Faculty.css for complete hide behavior on collapse")
