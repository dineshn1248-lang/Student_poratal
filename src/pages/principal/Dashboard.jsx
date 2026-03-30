import { useState } from "react";
import "./Principal.css";
import { FaBars, FaUserCircle, FaBell } from "react-icons/fa";

export default function Dashboard() {
  const [open, setOpen] = useState(true);

  return (
    <div className="container">

      {/* SIDEBAR */}
      <div className={`sidebar ${open ? "" : "hide"}`}>
        <h2 className="logo">Menu </h2>

        <ul className="menu">
          <li className="active">Dashboard</li>
          <li>Students</li>
          <li>Examination</li>
          <li>Attendance Reports</li>
          <li>Backlog Students</li>
          <li>Announcements</li>
        </ul>

        <button className="logout">Logout</button>
      </div>

      {/* MAIN */}
      <div className="main">

        {/* TOPBAR */}
        <div className="topbar">
          <FaBars className="menu-btn" onClick={() => setOpen(!open)} />

          <div className="right">
            <FaBell />
            <FaUserCircle />
          </div>
        </div>

        {/* CONTENT */}
        <div className="content">
          <h1 className="title">Welcome, Principal</h1>
          <p className="subtitle">Institutional overview for today</p>

          {/* CARDS */}
          <div className="cards">
            <div className="card">
              <div>
                <p className="label">TOTAL STUDENTS</p>
                <h2>480</h2>
                <span className="green-text">+12 this month</span>
              </div>
              <div className="icon blue">👥</div>
            </div>

            <div className="card">
              <div>
                <p className="label">AVG ATTENDANCE</p>
                <h2>77%</h2>
              </div>
              <div className="icon green">📈</div>
            </div>

            <div className="card">
              <div>
                <p className="label">FEE PENDING</p>
                <h2>350</h2>
              </div>
              <div className="icon orange">💲</div>
            </div>

            <div className="card">
              <div>
                <p className="label">BACKLOG STUDENTS</p>
                <h2>350</h2>
              </div>
              <div className="icon red">📄</div>
            </div>
          </div>

          {/* DEPARTMENT */}
          <h2 className="section-title">Department Overview</h2>

          <div className="dept">
            {["BCA", "BCS", "MCA", "BBA"].map((d) => (
              <div className="dept-card" key={d}>
                <div className="dept-top">
                  <h3>{d}</h3>
                  <span className="badge">120 students</span>
                </div>

                <p>Attendance <b>77%</b></p>

                <div className="progress">
                  <div className="bar"></div>
                </div>

                <p>Sections <b>A & B</b></p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}