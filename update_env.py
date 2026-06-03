import re

env_path = r'c:\Users\dines.DELL\Desktop\New folder (2)\student_portal\backend\.env'
with open(env_path, 'r', encoding='utf-8') as f:
    content = f.read()

new_token = "EAANu5Q7fGmUBRoXSWqnubdVhLgArfFE24ZCPxH63yyFnoIwIuZAq2WxWUHA9ZAQg3jmcgNbZCP6bHDw9ZCA1Il8CQsWLOFD8DxwyuthKujNYTrgOCAeQIykHaR2HifiXliHrHQuJ6Lmd1buOK9Nq8wZCyNuGJp2GskOwIQhd413OZCS3JpUprMBD5mpp8sItR3pwTnUmIJu7CL66AXSvQSPYDgO9jmpYF7ZCfLPKZCsm1ALmc37AZBVc9hs8lHPfyPwkZBSEmLZB0iEU3S90ugqhVfnuOEk2tQZDZD"

content = re.sub(r'META_ACCESS_TOKEN=.*', f'META_ACCESS_TOKEN={new_token}', content)

with open(env_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated .env with new token")
