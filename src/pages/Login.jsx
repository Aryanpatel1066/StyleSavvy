import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { ToastContainer, toast ,Bounce} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate, Link } from "react-router-dom";
import "./Login.css"
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.warn("Password must be at least 6 characters long!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
       
      toast.success("Login successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setEmail(""); // Clear fields
    setPassword("");
    setTimeout(()=>{
      toast.dismiss()
      navigate("/profile")
    },2000)
     } catch (error) {
      toast.error("error while login", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleLogin}>
        <h2 className="formHeading">Login</h2>
        <ToastContainer />
        <input
          className="inputField"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
          required
        />
        <input
          className="inputField"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
          required
        />
        <button className="submitButton" type="submit">Login</button>
        <p>
          Don't have an account? <Link to="/register" className="ragisterLink">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
