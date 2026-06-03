import re

env_path = r'c:\Users\dines.DELL\Desktop\New folder (2)\student_portal\backend\.env'
with open(env_path, 'r', encoding='utf-8') as f:
    content = f.read()

new_token = "EAANu5Q7fGmUBRop0R6kTXXdh9ezM3GfP9i76yVYqa90C7M0dVXqZADe7wQXKo811RV8CP0bWZChrPhkXLr0EZCmHhOoO1xbl0SdutO07kGS0EzFPi9IKgZAbmsjkyZCsitJxIbZA9R628hPzjs80lTyCCEqevADulsZAILq9ozqXXkVKphSQHCZCchRPxY8uihWgQjwdS3LxjSyIyB6EI0JWWez1kVVgQ93FZAvnO6Y2vzTUS8ZCFhbaolZAGA8nQWkJuhBZBr1prLugYlDdo2IfTZB6YkQYDWAZDZD"
content = re.sub(r'META_ACCESS_TOKEN=.*', f'META_ACCESS_TOKEN={new_token}', content)

with open(env_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated .env with final token")
