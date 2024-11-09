import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/navbar";
// import { FcGoogle } from "react-icons/fc";
// import { FaAmazon } from "react-icons/fa";
import axios from "axios";

const AnimatedButton = ({ children, onClick, className, type }) => {
  const [buttonAnimate, setButtonAnimate] = useState(false);
  const [roundPosition, setRoundPosition] = useState({
    top: "5px",
    left: "10px",
  });

  const handleMouseEnter = (event) => {
    const buttonRect = event.currentTarget.getBoundingClientRect();
    const buttonX = event.clientX - buttonRect.left;
    const buttonY = event.clientY - buttonRect.top;

    setButtonAnimate(true);
    setRoundPosition({
      top: buttonY < 24 ? "0px" : buttonY > 30 ? "48px" : "5px",
      left: `${buttonX}px`,
    });
  };

  const handleMouseLeave = (event) => {
    const buttonRect = event.currentTarget.getBoundingClientRect();
    const buttonX = event.clientX - buttonRect.left;
    const buttonY = event.clientY - buttonRect.top;

    setButtonAnimate(false);
    setRoundPosition({
      top: buttonY < 24 ? "0px" : buttonY > 30 ? "48px" : "5px",
      left: `${buttonX}px`,
    });
  };

  return (
    <button
      type={type}
      className={`animated-login-button ${
        buttonAnimate ? "animate" : ""
      } ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <span>{children}</span>
      <div
        className="round"
        style={{
          top: roundPosition.top,
          left: roundPosition.left,
          width: "1px",
          height: "1px",
        }}
      ></div>
    </button>
  );
};

const SimpleButton = ({ children, onClick, className }) => {
  return (
    <button className={`simple-button ${className}`} onClick={onClick}>
      <span>{children}</span>
    </button>
  );
};

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      let response;
      if (isLogin) {
        response = await axios.post("http://localhost:5000/api/auth/login", {
          username,
          password,
        });
      } else {
        response = await axios.post("http://localhost:5000/api/auth/register", {
          username,
          email,
          password,
        });

        if (response.data.token) {
          response = await axios.post("http://localhost:5000/api/auth/login", {
            username,
            password,
          });
        }
      }

      const { token } = response.data;

      localStorage.setItem("token", token);

      console.log(
        isLogin
          ? "Logged in successfully"
          : "Registered and logged in successfully",
      );

      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <>
      <Navbar isLoginPage={true} />
      <div className="login-page">
        <div className="login-content">
          <div className="login-container">
            <h2 className="login-title">{isLogin ? "Login" : "Register"}</h2>
            {error && <p className="error-message">{error}</p>}
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="input-box">
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                {!isLogin && (
                  <div className="input-group">
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                )}
                <div className="input-group">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <AnimatedButton type="submit" className="submit-btn">
                {isLogin ? "LOGIN" : "REGISTER"}
              </AnimatedButton>
            </form>
            <p className="auth-switch" onClick={() => setIsLogin(!isLogin)}>
              {isLogin
                ? "Need an account? Register"
                : "Already have an account? Login"}
            </p>
          </div>
          <div className="or-separator">
            <span>OR</span>
          </div>
          <div className="login-container-other">
            <div className="social-login">
              {/* <FcGoogle className="social-icon" size={24} /> */}
              <SimpleButton className="social-btn google-btn">
                <span className="social-text">Sign in with Google</span>
              </SimpleButton>
              {/* <FaAmazon className="social-icon"size={24} color="#FF9900" /> */}
              <SimpleButton className="social-btn amazon-btn">
                <text className="social-text">Sign in with Amazon</text>
              </SimpleButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
