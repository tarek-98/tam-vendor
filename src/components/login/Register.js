import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser, sendLoginCode } from "../../store/authSlice";
import { useNavigate } from "react-router";

function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ email, name }));
    dispatch(sendLoginCode(email));
    navigate("/verify-email");
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
