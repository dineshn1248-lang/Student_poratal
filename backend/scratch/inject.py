import sys

file_path = 'c:/Users/dines.DELL/Desktop/New folder (2)/student_portal/backend/routes/hod_routes.py'
scratch_path = 'c:/Users/dines.DELL/Desktop/New folder (2)/student_portal/backend/scratch/hod_routes_marks.py'

with open(file_path, 'r') as f:
    content = f.read()

with open(scratch_path, 'r') as f:
    new_route = f.read()

target = "@hod_bp.route('/students', methods=['GET'])"
replacement = new_route + '\n\n' + target

content = content.replace(target, replacement)

with open(file_path, 'w') as f:
    f.write(content)
print("Updated successfully")
