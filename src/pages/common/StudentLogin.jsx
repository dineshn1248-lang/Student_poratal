import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/StudentLogin.css";

function StudentLogin() {
  const navigate = useNavigate();

  const [role, setRole] = useState("student");
  const [uan, setUan] = useState("");
  const [studentPassword, setStudentPassword] = useState("");

  const [parentToken, setParentToken] = useState("");
  const [parentPassword, setParentPassword] = useState("");

  const [loading, setLoading] = useState(false);

  // STUDENT LOGIN
  const handleStudentLogin = async () => {
    if (!uan || !studentPassword) {
      alert("Enter UAN and password");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:5000/api/auth/student/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uan,
          password: studentPassword,
        }),
      });

      const data = await res.json();

      if (res.status === 200) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userRole", "student");
        navigate("/student-dashboard");
      } else {
        alert(data?.error || "Invalid student login");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  // PARENT LOGIN (token + password)
  const handleParentLogin = async () => {
    if (!parentToken || !parentPassword) {
      alert("Enter parent token and password");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:5000/api/auth/parent/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: parentToken,
          password: parentPassword,
        }),
      });

      const data = await res.json();

      if (res.status === 200) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userRole", "parent");
        navigate("/parent-dashboard");
      } else {
        alert(data?.error || "Invalid parent login");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="student-wrapper">
      <div className="student-card">
        <h1>User Login</h1>
        <p className="subtitle">Student / Parent portal access</p>

        <div className="toggle">
          <button
            className={role === "student" ? "active" : ""}
            onClick={() => setRole("student")}
            type="button"
          >
            Student
          </button>

          <button
            className={role === "parent" ? "active" : ""}
            onClick={() => setRole("parent")}
            type="button"
          >
            Parent
          </button>
        </div>

        {role === "student" ? (
          <>
            <label>UAN</label>
            <div className="input-box">
              <span>🆔</span>
              <input
                type="text"
                placeholder="Enter UAN (e.g., UAN1001)"
                value={uan}
                onChange={(e) => setUan(e.target.value)}
              />
            </div>

            <label>Password</label>
            <div className="input-box">
              <span>🔒</span>
              <input
                type="password"
                placeholder="Enter password"
                value={studentPassword}
                onChange={(e) => setStudentPassword(e.target.value)}
              />
            </div>

            <button className="student-action-btn" onClick={handleStudentLogin} disabled={loading}>
              {loading ? "Signing in..." : "Student Login"}
            </button>
          </>
        ) : (
          <>
            <label>Parent Invite Token</label>
            <div className="input-box">
              <span>🔑</span>
              <input
                type="text"
                placeholder="Paste token from parent link"
                value={parentToken}
                onChange={(e) => setParentToken(e.target.value)}
              />
            </div>

            <label>Parent Password</label>
            <div className="input-box">
              <span>🔒</span>
              <input
                type="password"
                placeholder="Enter parent password"
                value={parentPassword}
                onChange={(e) => setParentPassword(e.target.value)}
              />
            </div>

            <button className="student-action-btn" onClick={handleParentLogin} disabled={loading}>
              {loading ? "Signing in..." : "Parent Login"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default StudentLogin;