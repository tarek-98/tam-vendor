// VerifyLogin.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verifyLoginCode, setOtp } from "../../store/authSlice";
import "./verify.css";
import OtpInput from "react-otp-input";

const VerifyLogin = () => {
  const [code, setCode] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, vendorEmail, error } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/profile");
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(isAuthenticated);
    dispatch(setOtp(code));
    dispatch(verifyLoginCode({ code, vendorEmail }));
  };

  return (
    <div className="verify-main">
      <div className="container">
        <h3 className="mb-4">قم بتأكيد بريدك الإلكتروني</h3>
        <span className="mb-3">
          تم إرسال كلمة المرور المؤقتة إلى <br />
          {vendorEmail}
        </span>
        <form
          onSubmit={handleSubmit}
          className="mt-4 d-flex justify-content-center align-items-center flex-column"
        >
          <OtpInput
            className="justify-content-center"
            containerStyle="justify-content-center mb-3 otp-input"
            shouldAutoFocus={true}
            value={code}
            onChange={setCode}
            numInputs={4}
            inputType="number"
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
          />
          <button type="submit" className="btn-24">
            <span>تحقق</span>
          </button>
          {error === "Invalid OTP" ? (
            <div className=" text-danger">كود خاطئ</div>
          ) : (
            ""
          )}
        </form>
      </div>
    </div>
  );
};

export default VerifyLogin;
