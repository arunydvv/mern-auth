import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "@/context/appContext";

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedIn } = useContext(AppContext);

  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState("Log In");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const endpoint = `${backendUrl}/api/v1/auth/${
      mode === "Sign Up" ? "register" : "login"
    }`;

    try {
      console.log("Sign Up" ? { name, email, password } : { email, password });
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          mode === "Sign Up" ? { name, email, password } : { email, password }
        ),
      });

      const data = await res.json();

      if (res.ok) {
        setIsLoggedIn(true);
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="login-main">
      <div className="login-left">
        <img src={assets.Image} alt="" />
      </div>
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
            <img src={assets.LogoPNG} alt="" />
          </div>
          <div className="login-center">
            <h2>Welcome back!</h2>
            <p>Please enter your details</p>

            <form onSubmit={handleSubmit}>
              {mode === "Sign Up" && (
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              )}

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {showPassword ? (
                  <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <FaEye onClick={() => setShowPassword(!showPassword)} />
                )}
              </div>

              <div className="login-center-options">
                <div className="remember-div">
                  <input type="checkbox" id="remember-checkbox" />
                  <label htmlFor="remember-checkbox">
                    Remember for 30 days
                  </label>
                </div>
                <a href="/forgot-password" className="forgot-pass-link">
                  Forgot password?
                </a>
              </div>

              <div className="login-center-buttons">
                <button type="submit">
                  {mode === "Sign Up" ? `Sign Up` : `Log In`}
                </button>

                <button type="button" className="p-5">
                  <img src={assets.GoogleSvg} alt="" />
                  Log In with Google
                </button>
              </div>
             
            </form>
          </div>

          <p className="login-bottom-p">
            <button
              type="button"
              onClick={() => setMode(mode === "Sign Up" ? "Log In" : "Sign Up")}
            >
              {mode === "Sign Up" ? (
                <>
                  Already have an account? <a href="#">Login</a>
                </>
              ) : (
                <>
                  Don't have an account? <a href="#">Sign Up</a>
                </>
              )}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
