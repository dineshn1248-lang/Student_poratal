import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>AcadTrack</h2>

      <ul>
        <li className="active">Dashboard</li>
        <li>Departments</li>
        <li>Students</li>
        <li>Attendance</li>
        <li>Results</li>
        <li>Fee Status</li>
        <li>Announcements</li>
      </ul>

      <div className="logout">Logout</div>
    </div>
  );
}

export default Sidebar;