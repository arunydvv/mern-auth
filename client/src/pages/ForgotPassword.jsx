import { assets } from "../../assets/assets";

const ForgotPassword = () => {
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
            <h2>Forgot Password?</h2>
            <p>Enter your email to receive a reset link</p>
            <form>
              <input type="email" placeholder="Email" />

              <div className="login-center-buttons">
                <button type="button">Send Reset Link</button>

                <button type="button" className="p-5">
                  <img src={assets.GoogleSvg} alt="" />
                  Log In with Google
                </button>
              </div>
            </form>
          </div>

          <p className="login-bottom-p">
            <button type="button">
              Changed your mind? <a href="/login">Login</a>
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
