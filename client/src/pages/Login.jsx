import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { assets } from "../../assets/assets";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState("Log In"); 

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
            <form>
              {state === "Sign Up" && (
                <input type="email" placeholder="Name" />
              )}

              {/* If the one above is "Sign Up" email, you may want to make this one "Username" or remove it */}
              <input type="email" placeholder="Email" />

              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
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
                <button type="button">
                  {state === "Sign Up" ? `Sign Up` : `Log In`}
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
              onClick={() =>
                setState(state === "Sign Up" ? "Login" : "Sign Up")
              }
            >
              {state === "Sign Up" ? (
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
