import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../services/firebase.config";
import { useDispatch } from "react-redux";
import { addPhoneNumber, addUser, changeStateFalse } from "../store/otpSlice";
import toast from "react-hot-toast";

const Send = () => {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const sendOTP = async () => {
    if (phone === "") {
      toast.error("please enter a phone number");
      return;
    }

    if (isButtonDisabled) {
      return;
    }

    var recaptcha;
    try {
      setIsButtonDisabled(true);
      recaptcha = new RecaptchaVerifier(auth, "recaptcha", {
        size: "invisible",
      });

      const confirmation = await signInWithPhoneNumber(
        auth,
        "+" + phone,
        recaptcha
      );
      toast.success("otp sended successfully");
      dispatch(addUser(confirmation));
      dispatch(addPhoneNumber(phone));
      dispatch(changeStateFalse());
    } catch (error) {
      switch (error.code) {
        case "auth/too-many-requests":
          toast.error("Too many requests. Please try again later.");
          break;
        case "auth/invalid-phone-number":
          toast.error("The phone number is invalid.");
          break;
        default:
          toast.error("Something went wrong. Please try again later.");
          break;
      }
      recaptcha = "";
      console.log(error);
    } finally {
      setIsButtonDisabled(false);
    }
  };

  return (
    <div>
      <div className="phone-container">
        <div className="phone-title">TMGGL</div>
        <div className="phone-subcontainer">
          <div className="phone-filed">
            <PhoneInput
              country={"sa"}
              value={phone}
              onChange={setPhone}
              placeholder="+966 xxxxx-xxxx"
              className="mobile"
            />
          </div>
          <div className="phone-btn">
            <button
              onClick={() => sendOTP()}
              id="signup-btn"
              disabled={isButtonDisabled}
            >
              <span>{isButtonDisabled ? "Sending..." : "Send SMS"}</span>
            </button>
          </div>
        </div>
      </div>
      <div id="recaptcha"></div>
    </div>
  );
};

export default Send;
