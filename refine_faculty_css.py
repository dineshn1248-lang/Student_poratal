import re

file_path = r'c:\Users\dines.DELL\Desktop\New folder (2)\student_portal\src\pages\faculty\Faculty.css'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update general background and shadow variables
var_target = """--faculty-bg: #f8fafc;
  --faculty-card-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);"""

var_replace = """--faculty-bg: #f5f7fb;
  --faculty-card-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03);"""
content = content.replace(var_target, var_replace)

# 2. Update main container padding
main_target = """.faculty-main {
  flex: 1;
  margin-left: 280px;
  padding: 0 32px 40px;"""

main_replace = """.faculty-main {
  flex: 1;
  margin-left: 280px;
  padding: 0 40px 40px;"""
content = content.replace(main_target, main_replace)

# 3. Adjust main header height and padding
header_target = """.main-header {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}"""

header_replace = """.main-header {
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
}"""
content = content.replace(header_target, header_replace)

# 4. Stat cards layout and borders
stat_card_target = """.stat-card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid var(--faculty-border);
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}"""

stat_card_replace = """.stat-card {
  background: white;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid var(--faculty-border);
  box-shadow: var(--faculty-card-shadow);
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: transform 0.2s, border-color 0.2s;
}
.stat-card:hover {
  transform: translateY(-4px);
  border-color: #3b82f6;
}"""
content = content.replace(stat_card_target, stat_card_replace)

# 5. Stat card fonts
stat_label_target = """.stat-card .label {
  font-size: 14px;
  font-weight: 600;
  color: #64748b;
}"""

stat_label_replace = """.stat-card .label {
  font-size: 12px;
  font-weight: 800;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}"""
content = content.replace(stat_label_target, stat_label_replace)

# 6. Dashboard sections (the boxes)
dash_section_target = """.dashboard-section {
  background: white;
  border-radius: 12px;
  border: 1px solid var(--faculty-border);
  padding: 24px;
}"""

dash_section_replace = """.dashboard-section {
  background: white;
  border-radius: 16px;
  border: 1px solid var(--faculty-border);
  padding: 30px;
  box-shadow: var(--faculty-card-shadow);
}"""
content = content.replace(dash_section_target, dash_section_replace)

# 7. Section header fonts
section_header_target = """.section-header h3 {
  font-size: 16px;
  font-weight: 800;
  color: var(--faculty-navy);
  margin: 0;
}"""

section_header_replace = """.section-header h3 {
  font-size: 18px;
  font-weight: 800;
  color: var(--faculty-navy);
  margin: 0;
}"""
content = content.replace(section_header_target, section_header_replace)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated Faculty.css")
