import { useState } from "react";
import {
  FaBars,
  FaBell,
  FaUserCircle,
  FaUsers,
  FaCalendarCheck,
  FaExclamationTriangle,
  FaBook
} from "react-icons/fa";

import "./HOD.css";

export default function HODDashboard() {
  const [open, setOpen] = useState(true);

  return (
    <div className="layout">

      {/* SIDEBAR */}
      <div className={`sidebar ${open ? "" : "hide"}`}>
        <div>
          <h2 className="logo">Menu </h2>

          <ul className="menu">
            <li className="active">Dashboard</li>
            <li>Students</li>
            <li>Examination</li>
            <li>Attendance Reports</li>
            <li>Backlog Students</li>
            <li>Advance Syllabus</li>
            <li>Faculty List</li>
            <li>Announcements</li>
          </ul>
        </div>

        <button className="logout">Logout</button>
      </div>

      {/* MAIN */}
      <div className={`main ${open ? "" : "full"}`}>

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

          <h1>Welcome, </h1>
          <p className="sub">Department monitoring & management</p>

          {/* CARDS */}
          <div className="cards">

            <div className="card">
              <div>
                <p>Total Students</p>
                <h2>120</h2>
              </div>
              <div className="icon blue"><FaUsers /></div>
            </div>

            <div className="card">
              <div>
                <p>Avg Attendance</p>
                <h2>77%</h2>
              </div>
              <div className="icon green"><FaCalendarCheck /></div>
            </div>

            <div className="card">
              <div>
                <p>Backlog Students</p>
                <h2>88</h2>
              </div>
              <div className="icon orange"><FaExclamationTriangle /></div>
            </div>

            <div className="card">
              <div>
                <p>Sections</p>
                <h2>A & B</h2>
              </div>
              <div className="icon blue"><FaBook /></div>
            </div>

          </div>

          {/* SECTION A */}
          <div className="section-box">
            <h3>Section A</h3>

            <div className="section-grid">
              <div>
                <p>Students</p>
                <h2>60</h2>

                <p>Backlogs</p>
                <h2>46</h2>
              </div>

              <div>
                <p>Avg Attendance</p>
                <h2>78%</h2>

                <p>Avg CGPA</p>
                <h2>7.2</h2>
              </div>
            </div>
          </div>

          {/* SECTION B */}
          <div className="section-box">
            <h3>Section B</h3>

            <div className="section-grid">
              <div>
                <p>Students</p>
                <h2>60</h2>

                <p>Backlogs</p>
                <h2>42</h2>
              </div>

              <div>
                <p>Avg Attendance</p>
                <h2>76%</h2>

                <p>Avg CGPA</p>
                <h2>7.2</h2>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}