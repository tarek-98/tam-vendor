import React, { useEffect, useState } from "react";
import "./slideOverlay.css";
import { useDispatch, useSelector } from "react-redux";
import { FaCommentDots } from "react-icons/fa";
import { HiMiniBars3 } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { fetchComments } from "../store/commentSlice";
import { IoIosCloseCircleOutline } from "react-icons/io";

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
  const [liked, setLiked] = useState(false);
  const [iconPlus, setIconPlus] = useState(true);
  const comments = useSelector((state) => state.comments.comments);

  // Function to convert likes count to a number
  const parseLikesCount = (count) => {
    if (typeof count === "string") {
      if (count.endsWith("K")) {
        return parseFloat(count) * 1000;
      }
      return parseInt(count);
    }
    return count;
  };

  // Function to format likes count
  const formatLikesCount = (count) => {
    if (count >= 10000) {
      return (count / 1000).toFixed(1) + "K";
    }
    return count;
  };

  const handleLikeClick = () => {
    const newLikedState = !liked;
    setLiked(newLikedState);
    localStorage.setItem(`liked-${product.id}`, newLikedState);
  };
  const handIconClick = () => {
    setIconPlus((prevIconPlus) => !prevIconPlus);
  };

  useEffect(() => {
    // Retrieve saved state from local storage using the unique ID
    const savedState = localStorage.getItem(`liked-${product.id}`);
    if (savedState === "true") {
      setLiked(true);
    }
  }, [product.id]);

  return (
    <div className="slide-overlay">
      <div className="container-wrapper">
        <div className="left-side">
          <div className="left-side-content">
            <div className="vendor-logo">
              <Link className="vend-in"></Link>
              <div className="wrapper"></div>
            </div>
            <div className="smart-wrapper">
              <div
                className="item"
                id={product.id}
                onClick={() => {
                  setComment((comment) => !comment);
                  setSocial(false);
                  dispatch(fetchComments(product.id));
                }}
              >
                <FaCommentDots />
                <span>80</span>
              </div>
            </div>
            <div className="smart-wrapper">
              <div
                className="item"
                onClick={() => {
                  setSocial(false);
                  setInfo(true);
                }}
              >
                <HiMiniBars3 />
                <span>Info</span>
              </div>
            </div>
          </div>
        </div>
        <div className={info ? "info-home" : "info-home-hide"}>
          <div className="info-overlay"></div>
          <div className="info-container">
            <div className="close" onClick={() => setInfo((info) => !info)}>
              <IoIosCloseCircleOutline />
            </div>
            <div className="product-details">{product.details}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SlideOverlay;
