from database import db
from app import app
from models import Fee
with app.app_context():
    print("Fee model:", Fee)
    print("Query:", Fee.query.all())
