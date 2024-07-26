import React from "react";
import { FaCheckCircle, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../login/ckeck.css";

function AddedSucssess() {
  return (
    <div className="check-main">
      <div className="text mb-3">
        <div className="icon mb-3">
          <FaCheckCircle />
        </div>
        <span>تم اضافة المنتج بنجاح بانتظار مراجعة فريق تمقل</span>
        <div className="phone mt-3">
          <span className="ms-2 text-black-50">
            لرغبتك في تسريع التعميد تواصل معنا
          </span>
          <FaWhatsapp />
        </div>
      </div>

      <div className="back-home">
        <Link to="/profile">العودة للوحة التحكم</Link>
      </div>
    </div>
  );
}

export default AddedSucssess;
