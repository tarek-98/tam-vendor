import React, { useEffect, useState } from "react";
import "./slideOverlay.css";
import { useDispatch, useSelector } from "react-redux";
import { FaCommentDots } from "react-icons/fa";
import { RiChatForwardLine } from "react-icons/ri";
import { HiMiniBars3 } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import { fetchAsyncProductSingle } from "../store/productSlice";

function SlideOverlay({
  product,
  comment,
  setComment,
  social,
  setSocial,
  info,
  setInfo,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  const productId = product ? product._id : null;
  const userData = userInfo ? userInfo[`Client data`][0] : null;
  const UserId = userData ? userData._id : null;
  const VendorId = product ? product.idVendor : null;

  return (
    <div className="slide-overlay">
      <div className="container-wrapper">
        <div className="left-side">
          <div className="left-side-content">
            <div className="vendor-logo">
              <Link className="vend-in"></Link>
            </div>

            <div className="smart-wrapper">
              <div
                className="item"
                id={product && product._id}
                onClick={() => {
                  setComment((comment) => !comment);
                  dispatch(fetchAsyncProductSingle(product._id));
                }}
              >
                <FaCommentDots />
                <span>{product && product.comments.length}</span>
              </div>
            </div>
            <div className="smart-wrapper">
              <div
                className="item"
                onClick={() => {
                  setInfo(true);
                  dispatch(fetchAsyncProductSingle(product._id));
                }}
              >
                <HiMiniBars3 />
                <span>معلومات</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SlideOverlay;
