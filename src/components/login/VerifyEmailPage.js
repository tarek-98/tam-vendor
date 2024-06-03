// VerifyEmailPage.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verifyLoginCode } from "../../store/authSlice";

const VerifyEmailPage = () => {
  const [code, setCode] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(verifyLoginCode({ code, email }));
      navigate("/profile");
    } catch (error) {
      console.error("Email verification failed:", error);
    }
  };

  return (
    <div>
      <h1>Verify Email</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Verification Code"
        />
        <button type="submit">Verify</button>
      </form>
    </div>
  );
};

export default VerifyEmailPage;
