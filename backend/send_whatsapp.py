import requests
import json
import os

# New token provided by user
token = "EAANu5Q7fGmUBR006JFZAh18mB6hIWxZBUZAIUnSRoQhjTE8NZCHkHimwpWM6xXgcp2yt52w91UDl5JJnPJHwCwMCEk0lwn23S7eca0zrGY6lJe6panHtwM2IKgOvtH2VWZC7d68mjClEhCjIseX1ilkHxN3PuZCZA2lkHbnZBYDtOoCupPmzsoEoLL0fouemcXYyWz5QC92Sw70vRzBG70qTKVcKDdzbFgOYXhZAx7ur5ACLraWVeBmavAe8KczC5oV6tGua1be1TS8gM2ZCviE7Y6G6S8"
phone_number_id = "1089426630929775"
destination_number = "917349101248"

url = f"https://graph.facebook.com/v17.0/{phone_number_id}/messages"

headers = {
    "Authorization": f"Bearer {token}",
    "Content-Type": "application/json"
}

data = {
    "messaging_product": "whatsapp",
    "to": destination_number,
    "type": "template",
    "template": {
        "name": "hello_world",
        "language": {
            "code": "en_US"
        }
    }
}

response = requests.post(url, headers=headers, data=json.dumps(data))
print("Status Code:", response.status_code)
print("Response:", response.json())
