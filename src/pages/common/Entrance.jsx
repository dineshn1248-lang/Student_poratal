import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Entrance() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKey = (e) => {
      if (e.code === "Space") {
        navigate("/home");
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [navigate]);

  return (
    <div style={styles.container}>
      {/* VERCEL VERIFICATION BANNER */}
      <div style={{ background: '#ef4444', color: 'white', padding: '10px 20px', borderRadius: '8px', marginBottom: '20px', fontWeight: 'bold', letterSpacing: '2px' }}>
        STUDENT PORTAL FRONTEND (LIVE VERCEL VERIFICATION)
      </div>
      
      <h1>Welcome to Nrupathunga University</h1>
      <p>Student Performance Intelligence Portal</p>
      <p style={{ marginTop: "30px", opacity: 0.7 }}>
        Press SPACE to continue
      </p>
    </div>
  );
}

export default Entrance;

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a",
    color: "white",
    textAlign: "center"
  }
};