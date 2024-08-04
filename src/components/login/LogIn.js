import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import "./login.css";
import logo from "../../assets/images/logo.jpeg";
import { Link } from "react-router-dom";
import {
  sendLoginCode,
  setPhone,
  setEmail,
  sendCodePhone,
} from "../../store/authSlice";
import { ToastContainer, toast } from "react-toastify";
import LoginSucess from "./LoginSucess";

const Login = () => {
  const [vendorPhone, setVendorPhone] = useState("");
  const [vendorEmail, setVendorEmail] = useState("");
  const [phoneLogin, setPhoneLogin] = useState(true);
  const [emailLogin, setEmailLogin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, error, vendorInfo, status } = useSelector(
    (state) => state.auth
  );

  const saudiPhoneNumberRegex = /^0[0-9]{9}$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phoneLogin) {
      if (saudiPhoneNumberRegex.test(vendorPhone)) {
        dispatch(setPhone(vendorPhone));
        dispatch(sendCodePhone(vendorPhone));
        navigate("/verify-phone");
      } else {
        toast.error("ادخل رقم جوال صالح", {
          position: "top-left",
        });
      }
    } else {
      dispatch(setEmail(vendorEmail));
      dispatch(sendLoginCode(vendorEmail));
      navigate("/verifyLogin");
    }
  };

  useEffect(() => {
    document.title = "تسجيل الدخول الي حسابك";
  }, []);

  if (vendorInfo && vendorInfo.data.status === "pending" && isAuthenticated) {
    return <LoginSucess />;
  }

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
              <form onSubmit={handleSubmit} className="d-flex flex-column">
                <input
                  className="mb-2"
                  type={phoneLogin ? "text" : "hidden"}
                  value={vendorPhone}
                  onChange={(e) => setVendorPhone(e.target.value)}
                  placeholder="مثال 0512345678"
                  required
                  maxLength="10"
                  minLength="10"
                  name="phone"
                />
                <input
                  className="mb-2"
                  type={emailLogin ? "email" : "hidden"}
                  value={vendorEmail}
                  name="email"
                  onChange={(e) => setVendorEmail(e.target.value)}
                  placeholder="اكتب الايميل"
                  required
                />
                {error && <p>{error.message}</p>}
                <button type="submit" className="mb-2" value="">
                  تسجيل دخول
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
      <ToastContainer />
    </div>
  );
};

export default Login;
