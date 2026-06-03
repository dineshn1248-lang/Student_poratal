import os

css_additions = """
/* NEW DARK HERO REDESIGN CSS */

/* Overrides for existing sections to dark theme */
.home-hero-section {
  min-height: 100vh;
  background: radial-gradient(circle at center, rgba(15, 23, 42, 0.7) 0%, rgba(2, 6, 23, 0.95) 100%), url("../assets/bg.jpeg") no-repeat center center/cover;
  padding: 0 40px 60px;
}

.hero-overlay {
  background: rgba(2, 6, 23, 0.6);
  backdrop-filter: blur(12px);
}

.hero-content-wrapper {
  max-width: 1400px;
  gap: 30px;
}

/* TOP NAV HEADER */
.hero-brand-header {
  padding: 24px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.hero-karnataka-logo {
  height: 60px;
  margin-right: 16px;
}

.hero-brand-title {
  font-size: 20px;
  font-weight: 800;
  color: #ffffff;
}

.hero-brand-sub {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
}

.hero-top-nav {
  display: flex;
  gap: 30px;
  align-items: center;
}

.hero-top-nav a {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.3s ease;
  padding-bottom: 4px;
  border-bottom: 2px solid transparent;
}

.hero-top-nav a:hover, .hero-top-nav a.active {
  color: #60a5fa;
}

.hero-top-nav a.active {
  border-bottom-color: #3b82f6;
}

.nav-icon {
  display: flex;
  align-items: center;
}

/* WELCOME PANEL */
.welcome-subtitle-top {
  font-size: 15px;
  font-weight: 600;
  color: #94a3b8;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.star-sparkle {
  color: #6366f1;
  font-size: 16px;
}

.welcome-title {
  font-size: 56px;
  line-height: 1.1;
  margin-bottom: 24px;
}

.welcome-title-gradient {
  background: linear-gradient(to right, #60a5fa, #818cf8, #c084fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: none;
}

/* CARDS RE-STYLED */
.hero-portal-card {
  border-radius: 20px;
  padding: 48px 40px;
  background: #0f172a; /* Solid dark blue for admin */
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.user-glass-card {
  background: #1e1b4b; /* Solid dark purple for user */
}

.hero-portal-card::before {
  display: none;
}

.card-icon-wrapper {
  width: 72px;
  height: 72px;
  background: transparent;
  box-shadow: none;
  margin-bottom: 20px;
}

.admin-icon {
  color: #60a5fa;
  border: 2px solid rgba(59, 130, 246, 0.3);
}

.user-icon {
  color: #c084fc;
  border: 2px solid rgba(167, 139, 250, 0.3);
}

.hero-portal-card h3 {
  font-size: 24px;
  margin-bottom: 12px !important;
}

.card-divider {
  display: none; /* Removed the horizontal line */
}

.card-subtext {
  font-size: 14px;
  color: #94a3b8;
  margin-bottom: 32px;
  min-height: auto;
}

.card-enter-btn {
  background: #3b82f6; /* Solid blue for admin */
  color: white;
  border: none;
  border-radius: 12px;
  padding: 14px 24px;
  font-size: 16px;
}

.user-btn {
  background: transparent;
  border: 1px solid rgba(167, 139, 250, 0.3);
  color: #c084fc;
}

.user-btn:hover {
  background: rgba(167, 139, 250, 0.1);
}

.admin-btn:hover {
  background: #2563eb;
}

/* LEARN MORE BANNER */
.learn-more-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 24px 32px;
  border-radius: 16px;
  backdrop-filter: blur(16px);
  margin-top: 10px;
}

.banner-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.banner-icon-wrapper {
  color: #60a5fa;
  display: flex;
  align-items: center;
}

.banner-text h4 {
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 6px 0;
}

.banner-text p {
  color: #94a3b8;
  font-size: 14px;
  margin: 0;
}

.banner-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.banner-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* FEATURES BAR OVERRIDE */
.hero-features-footer {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 20px 30px;
  margin-top: 10px;
  justify-content: flex-start;
  gap: 0;
}

.feature-divider {
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  margin: 0 30px;
}

.feature-icon {
  background: rgba(255, 255, 255, 0.05);
  width: 48px;
  height: 48px;
}
"""

with open(os.path.join("src", "styles", "Home.css"), "a", encoding="utf-8") as f:
    f.write(css_additions)
print("CSS updated")
