import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/StaffLogin.css";

function StaffLogin() {
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [username, setUsername] = useState(""); // changed from email
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!role || !username || !password) {
      alert("Please fill role, username, and password");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:5000/api/auth/staff/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username, // backend expects username
          password,
        }),
      });

      const data = await res.json();

      if (res.status === 200) {
        // optional safety: selected role must match server role
        if (data?.user?.role !== role) {
          alert(`Role mismatch. You selected ${role}, but account is ${data?.user?.role}`);
          setLoading(false);
          return;
        }

        // save token for dashboard API calls
        localStorage.setItem("token", data.token);
        localStorage.setItem("staffRole", data.user.role);
        localStorage.setItem("staffName", data.user.full_name || "");

        if (data.user.role === "principal") navigate("/principal-dashboard");
        else if (data.user.role === "hod") navigate("/hod-dashboard");
        else if (data.user.role === "faculty") navigate("/faculty-dashboard");
        else alert("Unknown staff role");
      } else {
        alert(data?.error || "Invalid login");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h1>Admin Login</h1>
        <p className="subtitle">Sign in to your staff account</p>

        <label>Login As</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select your role</option>
          <option value="principal">Principal</option>
          <option value="hod">HOD</option>
          <option value="faculty">Faculty</option>
        </select>

        <label>Email / Username</label>
        <div className="input-box">
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <label>Password</label>
        <div className="input-box">
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="forgot">Forgot Password?</div>

        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </div>
    </div>
  );
}

export default StaffLogin;