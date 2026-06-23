import os
from twilio.rest import Client
from dotenv import load_dotenv

load_dotenv()

account_sid = os.environ.get('TWILIO_ACCOUNT_SID')
auth_token = os.environ.get('TWILIO_AUTH_TOKEN')
from_phone = os.environ.get('TWILIO_PHONE_NUMBER')
to_number = "+917349101248"  # User's phone number

try:
    client = Client(account_sid, auth_token)
    message = client.messages.create(
        body="Hello! This is a test traditional SMS from your Student Portal.",
        from_=from_phone,
        to=to_number
    )
    print("Success! SID:", message.sid)
except Exception as e:
    print("Failed to send Twilio SMS:", str(e))
