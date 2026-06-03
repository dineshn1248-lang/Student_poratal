import os

css_additions = """
/* NAV LOGIN BUTTON */
.nav-login-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background 0.3s;
}
.nav-login-btn:hover {
  background: #2563eb;
}

/* HERO CTA BUTTON */
.hero-main-cta {
  background: linear-gradient(135deg, #3b82f6, #6366f1);
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 30px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 auto;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
}
.hero-main-cta:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 30px rgba(59, 130, 246, 0.4);
}

/* INFO SECTIONS */
.info-sections-container {
  background: #ffffff;
  color: #1e293b;
}

.info-section {
  padding: 80px 40px;
  max-width: 1400px;
  margin: 0 auto;
}

.bg-gray {
  background-color: #f8fafc;
}

.section-header {
  margin-bottom: 50px;
}
.text-center { text-align: center; }

.section-eyebrow {
  display: block;
  font-size: 14px;
  font-weight: 700;
  color: #3b82f6;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 12px;
}

.section-header h2 {
  font-size: 36px;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 16px 0;
}

.title-underline {
  width: 60px;
  height: 4px;
  background: #3b82f6;
  margin: 0 auto;
  border-radius: 2px;
}

.section-desc {
  font-size: 16px;
  color: #64748b;
  max-width: 600px;
  margin: 20px auto 0;
}

/* About Grid */
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.about-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.03);
  transition: transform 0.3s;
}

.about-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.06);
}

.ac-icon {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}

.vision-card .ac-icon {
  background: #eff6ff; color: #3b82f6;
}
.mission-card .ac-icon {
  background: #fdf4ff; color: #c084fc;
}

.about-card h3 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
}

.about-card p {
  color: #475569;
  font-size: 16px;
  line-height: 1.7;
}

/* Departments Grid */
.departments-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.dept-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  transition: transform 0.3s;
}

.dept-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.dept-img-placeholder {
  height: 160px;
  background: linear-gradient(135deg, #e2e8f0, #f8fafc);
  display: flex;
  align-items: center;
  justify-content: center;
}

.dept-icon-placeholder {
  color: #94a3b8;
  opacity: 0.5;
}

.dept-info {
  padding: 24px;
}

.dept-info h4 {
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 16px 0;
  line-height: 1.4;
}

.dept-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #3b82f6;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
}
.dept-link:hover { text-decoration: underline; }

/* Facilities Grid */
.facilities-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.facility-item {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 30px;
  background: #f8fafc;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
}

.fac-icon {
  background: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6366f1;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  flex-shrink: 0;
}

.facility-item h4 {
  font-size: 18px;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 8px 0;
}

.facility-item p {
  color: #64748b;
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 1024px) {
  .departments-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .about-grid, .facilities-grid, .departments-grid { grid-template-columns: 1fr; }
  .welcome-title { font-size: 42px !important; }
}
"""
with open(os.path.join("src", "styles", "Home.css"), "a", encoding="utf-8") as f:
    f.write(css_additions)
print("Home.css updated")
