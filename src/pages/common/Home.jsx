import { useNavigate } from "react-router-dom";
import "../../styles/Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper" style={{ overflowY: 'auto', minHeight: '100vh', paddingBottom: '50px' }}>
      <div className="overlay" />

      <div className="home-content">
        <h1>Nrupathunga University</h1>
        <p>Track attendance, grades and performance across departments</p>

        <div className="portal-cards two-cards">
          <div className="portal-card admin-card" onClick={() => navigate("/staff-login")}>
            <h2>Staff Portal</h2>
            <span>Principal, HOD & Faculty</span>
          </div>

          <div className="portal-card user-card" onClick={() => navigate("/student-login")}>
            <h2>User Portal</h2>
            <span>Students & Parents</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;