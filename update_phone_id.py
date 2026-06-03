import re

env_path = r'c:\Users\dines.DELL\Desktop\New folder (2)\student_portal\backend\.env'
with open(env_path, 'r', encoding='utf-8') as f:
    content = f.read()

new_phone_id = "1089476630929775"
content = re.sub(r'META_PHONE_NUMBER_ID=.*', f'META_PHONE_NUMBER_ID={new_phone_id}', content)

with open(env_path, 'w', encoding='utf-8') as f:
    f.write(content)
print(f"Updated .env with new Phone Number ID: {new_phone_id}")
