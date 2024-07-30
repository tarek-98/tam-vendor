import React, { Fragment, useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Product from "../components/Product";
import { FaVolumeXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Comments from "../components/comments/CommentList";
import {
  fetchAsyncProductSingle,
  getAllVendorProducts,
  getProductSingle,
} from "../store/productSlice";

function Home() {
  const [volume, setVolume] = useState(false);
  const [sound, setSound] = useState(true);
  const [comment, setComment] = useState(false);
  const [info, setInfo] = useState(false);
  const products = useSelector(getAllVendorProducts);
  const productData = useSelector(getProductSingle);
  const product = productData ? productData.product : null;
  const comments = product ? product.comments : null;
  const dispatch = useDispatch();

  useEffect(() => {
    if (product) {
      dispatch(fetchAsyncProductSingle(product._id));
    }
  }, []);

  useEffect(() => {
    document.title = "تمقل تاجر";
  }, []);

  return (
    <Fragment>
      <Navbar />
      <Product
        sound={sound}
        setSound={setSound}
        comment={comment}
        info={info}
        setInfo={setInfo}
        setComment={setComment}
        products={products}
      />

      {product && (
        <div className={comment ? "comment-wrapper" : "comment-wrapper-hide"}>
          <div className="comment-wrapper-overlay"></div>
          <div className="comment-wrapper-container">
            <div className="close">
              <IoIosCloseCircleOutline
                onClick={() => setComment((comment) => !comment)}
              />
              <h2 className="text-comment fs-4">
                {comments.length > 0 && (
                  <span className="fs-4 me-2">{comments.length}</span>
                )}
                {comments.length > 0 ? "Comments" : "No Comments"}
              </h2>
            </div>
            <Comments product={product} />
          </div>
        </div>
      )}

      {product && (
        <div className={info ? "info-home" : "info-home-hide"}>
          <div className="info-overlay"></div>
          <div className="info-container p-3">
            <div className="close" onClick={() => setInfo((info) => !info)}>
              <IoIosCloseCircleOutline />
            </div>
            <div className="product-details">{product.description}</div>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default Home;
