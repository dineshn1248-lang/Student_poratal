from app import create_app
from models import db, Student

app = create_app()

with app.app_context():
    # Avoid unique constraint clash with the HOD version of Lakshmi
    hod_lakshmi = Student.query.filter_by(register_no='U24AN23S0245').first()
    if hod_lakshmi and hod_lakshmi.department != 'BCA':
        hod_lakshmi.register_no = 'U24AN23S0245_OLD'
        
    # Update BCA Lakshmi to the correct reg no
    bca_lakshmi = Student.query.filter_by(full_name='Lakshmi Nasimappa Chakarasli', department='BCA').first()
    if bca_lakshmi:
        bca_lakshmi.register_no = 'U24AN23S0245'
        
    # Update the rest of the BCA students to match the format U24AN23S0xxx
    bca_students = Student.query.filter_by(department='BCA').all()
    start_num = 300
    for s in bca_students:
        if s.full_name != 'Lakshmi Nasimappa Chakarasli':
            s.register_no = f"U24AN23S0{start_num}"
            start_num += 1
            
    db.session.commit()
    print("Updated register numbers to match HOD reference.")
