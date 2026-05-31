import os
import requests
from dotenv import load_dotenv

load_dotenv()
meta_token = os.environ.get('META_ACCESS_TOKEN', '')
meta_phone_id = os.environ.get('META_PHONE_NUMBER_ID', '')

url = f"https://graph.facebook.com/v17.0/{meta_phone_id}/messages"
headers = {
    "Authorization": f"Bearer {meta_token}",
    "Content-Type": "application/json"
}
payload = {
    "messaging_product": "whatsapp",
    "to": "917349101248",
    "type": "template",
    "template": {
        "name": "hello_world",
        "language": {
            "code": "en_US"
        }
    }
}
resp = requests.post(url, headers=headers, json=payload)
print(f"Status Code: {resp.status_code}")
print(f"Response: {resp.text}")
