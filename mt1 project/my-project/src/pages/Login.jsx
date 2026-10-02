import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      console.log("Backend response:", data);

      if (response.ok) {
        localStorage.setItem("loggedIn", "true");

        console.log("Login successful. Going to dashboard...");

        navigate("/dashboard");
      } else {
        setError(data.message || "Invalid login details");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Cannot connect to backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-left">
        <div className="brand">
          STUDENT<span>HUB</span>
        </div>

        <div className="welcome">
          <p className="small-text">STUDENT MANAGEMENT SYSTEM</p>

          <h1>
            Manage your
            <br />
            students <span>smarter.</span>
          </h1>

          <p>
            A simple and powerful way to manage student
            information, records and academic details.
          </p>
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">

          <div className="login-header">
            <p>WELCOME BACK</p>
            <h2>Sign in</h2>
            <span>
              Enter your details to access the dashboard.
            </span>
          </div>

          <form onSubmit={handleLogin}>

            <label>Email</label>

            <input
              type="email"
              placeholder="admin@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Password</label>

            <div className="password-box">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>

            </div>

            {error && (
              <div className="error">
                {error}
              </div>
            )}

            <button
              className="login-button"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In →"}
            </button>

          </form>

          <div className="demo-login">
            <p>Demo credentials</p>
            <span>Email: admin@gmail.com</span>
            <span>Password: 1234</span>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Login;