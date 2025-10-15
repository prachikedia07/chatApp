import React, { useContext, useState } from "react";
import assets from "../assets/assets";
import chat_app from "../assets/chat_app.svg";
import { AuthContext } from "../../context/AuthContext";

const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign Up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const { login } = useContext(AuthContext);


  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (currState === "Sign Up" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }
    login(currState === "Sign Up" ? "signup" : "login", {
      fullName,
      email,
      password,
      bio,
    });
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen gap-6 sm:justify-evenly max-sm:flex-col
                 bg-[var(--bg-primary)] text-[var(--text-primary)] transition-all duration-500"
    >
      {/* Left Logo */}
      <div className="flex flex-col justify-center items-center">
        <img className="w-[540px]" src={chat_app} alt="Logo" />
      <div className="flex flex-col text-4xl">QuickChat</div>
      </div>

      {/* Right Form */}
      <form
        onSubmit={onSubmitHandler}
        className="backdrop-glass border-2 border-[var(--border)] p-6 flex flex-col gap-6 
                   rounded-2xl shadow-lg w-[300px] sm:w-[350px] text-[var(--text-primary)]"
      >
        <h2 className="text-2xl font-medium flex justify-between items-center">
          {currState}
          {isDataSubmitted && (
            <img
              onClick={() => setIsDataSubmitted(false)}
              src={assets.arrow_icon}
              alt=""
              className="w-5 cursor-pointer"
            />
          )}
        </h2>

        {currState === "Sign Up" && !isDataSubmitted && (
          <input
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            type="text"
            className="p-2 border border-[var(--border)] rounded-md bg-[var(--bg-secondary)]
                       focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
            placeholder="Full Name"
            required
          />
        )}

        {!isDataSubmitted && (
          <>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              className="p-2 border border-[var(--border)] rounded-md bg-[var(--bg-secondary)]
                         focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
              placeholder="Email Address"
              required
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              className="p-2 border border-[var(--border)] rounded-md bg-[var(--bg-secondary)]
                         focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
              placeholder="Password"
              required
            />
          </>
        )}

        {currState === "Sign Up" && isDataSubmitted && (
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            rows={4}
            className="p-2 border border-[var(--border)] rounded-md bg-[var(--bg-secondary)]
                       focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
            placeholder="Provide a short bio..."
            required
          ></textarea>
        )}

        <button
          type="submit"
          className="py-3 rounded-md text-sm glow-on-hover"
          style={{ background: "var(--button-bg)", color: "#fff" }}
        >
          {currState === "Sign Up" ? "Create Account" : "Login Now"}
        </button>

        <div className="text-sm text-[var(--text-secondary)] flex items-center gap-2">
          <input type="checkbox" required />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>

        <div className="flex flex-col gap-1 text-[var(--text-secondary)]">
          {currState === "Sign Up" ? (
            <p className="text-sm">
              Already have an account?{" "}
              <span
                onClick={() => {
                  setCurrState("Login");
                  setIsDataSubmitted(false);
                }}
                className="font-medium cursor-pointer text-[var(--accent-primary)]"
              >
                Login Here
              </span>
            </p>
          ) : (
            <p className="text-sm">
              Create an account{" "}
              <span
                onClick={() => setCurrState("Sign Up")}
                className="font-medium cursor-pointer text-[var(--accent-primary)]"
              >
                Click Here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
