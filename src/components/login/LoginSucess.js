import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import "./ckeck.css";
import { useDispatch } from "react-redux";
import { setIsAuthenticated } from "../../store/authSlice";
import { useNavigate } from "react-router";
import { IoMdCloseCircle } from "react-icons/io";

function LoginSucess() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function refresh() {
    dispatch(setIsAuthenticated(false));
    navigate("/login");
  }
  return (
    <div className="check-main">
      <div className="text mb-3">
        <div className="icon mb-3">
          <FaCheckCircle />
        </div>
        <span>تم التسجيل بنجاح سيقوم فريق تمقل بمراجعة طلبك و اعتماده</span>
        <div className="phone mt-3">
          <span className="ms-2 text-black-50">
            لرغبتك في تسريع التعميد تواصل معنا
          </span>
          <a
            href="https://wa.me/966556667454"
            className="text-dark fs-4"
            target="_blank"
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>
      <div className="close" onClick={() => refresh()}>
        <IoMdCloseCircle className="fs-5 me-1" />
        <span>تسجيل الخروج</span>
      </div>
    </div>
  );
}

export default LoginSucess;
