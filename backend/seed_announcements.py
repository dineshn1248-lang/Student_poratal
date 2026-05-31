import os
import sys
from datetime import datetime, timedelta

# Add current directory to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '.')))

from app import create_app
from database import db
from models import Announcement

def seed_announcements():
    app = create_app()
    with app.app_context():
        print("[SEED] Starting Nrupathunga University Announcements Database Seeder...")
        
        # Clean existing notices
        print("[SEED] Cleaning old announcements...")
        Announcement.query.delete()
        db.session.commit()
        
        notices = [
            {
                "title": "Circular: BCA VI Semester Practical Examination - June 2026 Batch Allocation",
                "content": "All 6th Semester BCA students of Nrupathunga University are hereby notified that the Practical Examinations for Mobile Application Development (63604) and Major Project Viva-Voce (61605) are scheduled to be conducted from June 10th to June 15th, 2026. Detailed batch allocations, session timings, and lab lab rosters have been published. Attendance is strictly compulsory. By order of Registrar Evaluation, Nrupathunga University.",
                "category": "Exam Schedule",
                "target_audience": "Students Only",
                "priority": "High",
                "is_emergency": True,
                "created_at": datetime.utcnow() - timedelta(hours=2)
            },
            {
                "title": "NEP-2020: Submission of Continuous Internal Evaluation (CIE) Marks for BCA Courses",
                "content": "Pursuant to the academic regulations of Nrupathunga University under the National Education Policy (NEP-2020) framework, all department faculty members are instructed to finalize and upload the continuous internal evaluation (CIE) test scores, assignment grades, and seminar weights on the UUCMS portal on or before May 25, 2026. HOD approvals and locking will commence immediately after.",
                "category": "Academic Update",
                "target_audience": "Staff & Faculty",
                "priority": "Medium",
                "is_emergency": False,
                "created_at": datetime.utcnow() - timedelta(hours=8)
            },
            {
                "title": "Placement Cell: Tech Mahindra Pool Campus Recruitment Drive for BCA Graduates",
                "content": "The Placement and Career Guidance Cell of Nrupathunga University is coordinating a pool campus recruitment drive for final year BCA and B.Sc Computer Science graduates. Eligible candidates (CGPA > 6.5, with no active backlogs) must complete their registration on the SSP/Placement portal by May 28, 2026. Pre-placement talk will commence at 10:00 AM in the Central Seminar Hall, Palace Road Campus.",
                "category": "Placement Bulletin",
                "target_audience": "All Users",
                "priority": "High",
                "is_emergency": False,
                "created_at": datetime.utcnow() - timedelta(days=1)
            },
            {
                "title": "SSP Scholarship 2025-26: Submission Deadline Extended for Post-Matric Schemes",
                "content": "The Directorate of Social Welfare, Government of Karnataka has officially extended the last date for submitting online Post-Matric scholarship applications on the State Scholarship Portal (SSP) till June 5, 2026. Students who have not completed e-attestation or whose applications are pending review are directed to submit required documents at the university administration desk.",
                "category": "General Notice",
                "target_audience": "All Users",
                "priority": "Low",
                "is_emergency": False,
                "created_at": datetime.utcnow() - timedelta(days=3)
            }
        ]

        for item in notices:
            print(f"[SEED] Inserting: '{item['title']}'...")
            ann = Announcement(
                title=item["title"],
                content=item["content"],
                category=item["category"],
                target_audience=item["target_audience"],
                department="Computer Applications",
                priority=item["priority"],
                status="published",
                is_emergency=item["is_emergency"],
                created_at=item["created_at"]
            )
            db.session.add(ann)

        db.session.commit()
        print("[SEED] Announcements seeding successfully completed! Fully indexed in SQLite.")

if __name__ == "__main__":
    seed_announcements()
