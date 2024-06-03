import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import "./login.css";
import logo from "../../assets/images/logo.jpeg";
import { Link } from "react-router-dom";
import { sendLoginCode } from "../../store/authSlice";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [phoneLogin, setPhoneLogin] = useState(true);
  const [emailLogin, setEmailLogin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    navigate("/profile");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendLoginCode(email));
    navigate("/verifyCode");
  };

  return (
    <div className="logIn-main">
      <div className="conatiner">
        <div className="row">
          <div className="col-lg-12">
            <div className="logo mb-3">
              <img src={logo} alt="" />
            </div>
            <h2 className="mb-3">اهلا عزيزي تاجر تمقل</h2>
            <div className="form">
              <form onSubmit={handleSubmit} className=" d-flex flex-column">
                <input
                  className="mb-2"
                  type={phoneLogin ? "text" : "hidden"}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="مثال 0512345678"
                  required
                  maxLength="10"
                  minLength="10"
                  name="phone"
                />
                <input
                  className="mb-2"
                  type={emailLogin ? "email" : "hidden"}
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="اكتب الايميل"
                  required
                />
                {error && <p>{error.message}</p>}
                <button type="submit" className="mb-2" value="">
                  {loading ? "Sending..." : "Send Code"}
                </button>
              </form>
              <div className="new-vendor mb-2">
                <Link to="/addVendor" className="w-100">
                  تسجيل كتاجر جديد
                </Link>
              </div>
              <div
                className={emailLogin ? "email-login" : "d-none"}
                onClick={() => {
                  setPhoneLogin(true);
                  setEmailLogin(false);
                }}
              >
                <Link className="w-100">تسجيل الدخول بالجوال</Link>
              </div>
              <div
                className={phoneLogin ? "email-login" : "d-none"}
                onClick={() => {
                  setPhoneLogin(false);
                  setEmailLogin(true);
                }}
              >
                <Link className="w-100">تسجيل الدخول بالايميل</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
