import requests
import json

url = "https://graph.facebook.com/v25.0/1089426630929775/messages"
headers = {
    "Authorization": "Bearer EAAVaxJjTGogBRlEKUBvUuQNeUvtGfcsHbuhglE6Cqc2tsRu3ZAsZBjdvZC0fepDYZAnTUvStRZC7xcZByByvOZCZBYZA3Y5DDbSGSRRfSs04H9C12qnP636ZAcNGwYsUGo4uo4HBKzzV52Dog2rrYmd9CwiX9UHq8YhOYn5yd6M2gRzNW9ZCUaf4ZCKvVvOwdRaNMoo2E9rkvcjqaRxjmlj4AYEqoBZBNZAJyfBJI5PNRNWsJPhZAwO0atlJZBvgLpECZCkixSi068C6jSByGZA3yooa7s6a1rk7E9",
    "Content-Type": "application/json"
}

for phone in ["917349101248", "919380179909"]:
    payload = {
        "messaging_product": "whatsapp",
        "to": phone,
        "type": "template",
        "template": {
            "name": "jaspers_market_order_confirmation_v1",
            "language": { "code": "en_US" },
            "components": [
                {
                    "type": "body",
                    "parameters": [
                        { "type": "text", "text": "John Doe" },
                        { "type": "text", "text": "123456" },
                        { "type": "text", "text": "Jun 7, 2026" }
                    ]
                }
            ]
        }
    }
    
    response = requests.post(url, headers=headers, json=payload)
    print(f"Phone: {phone}")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.text}")
    print("-" * 50)
