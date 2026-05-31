from app import create_app
from models import db, CommunicationLog
import json

app = create_app()
with app.app_context():
    logs = CommunicationLog.query.order_by(CommunicationLog.id.desc()).limit(10)
    for l in logs:
        print(json.dumps({'id':l.id, 'provider':l.provider, 'status':l.status, 'error':l.error_message, 'res':l.provider_response}))
