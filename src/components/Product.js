import React, { Fragment, useEffect, useRef, useState } from "react";
import "./product.css";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncProductsByVendors,
  fetchAsyncProductSingle,
  getAllVendorProducts,
} from "../store/productSlice";
import SlideOverlay from "./SlideOverlay";
import { Mousewheel } from "swiper/modules";
import { CiVolumeMute } from "react-icons/ci";
import { AiOutlineSound } from "react-icons/ai";
import Slider from "./control/slider/Slider";
import ControlPanel from "./control/controls/ControlPanel";

function Product({ sound, setSound, comment, setComment, setInfo, info }) {
  const [addProduct, setAddProduct] = useState(false);
  const { vendorInfo } = useSelector((state) => state.auth);
  const id = vendorInfo.data._id;
  const products = useSelector(getAllVendorProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncProductsByVendors(id));
    console.log(id);
    console.log(products);
  }, []);

  const videoRef = useRef(null);
  const [currentVideo, setCurrentVideo] = useState(null);

  const togglePlay = (index) => {
    if (currentVideo === index) {
      const video = document.getElementById(index);
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    } else {
      if (currentVideo) {
        const previousVideo = document.getElementById(currentVideo);
        previousVideo.pause();
      }
      setCurrentVideo(index);
      const video = document.getElementById(index);
      video.play();
    }
  };

  const [autoPlay, setAutoPlay] = useState(false);
  const handleSlideChange = (swiper) => {
    const activeSlideIndex = swiper.activeIndex;
    const activeProduct = products[activeSlideIndex];
    dispatch(fetchAsyncProductSingle(activeProduct._id));
    setAutoPlay(true);
  };

  /*control*/
  const [percentage, setPercentage] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [index, setIndex] = useState(0);
  const videoRefs = useRef([]);
  const [videoState, setVideoState] = useState(
    products &&
      products.map(() => ({
        percentage: 0,
        currentTime: 0,
        duration: 0,
      }))
  );
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, products && products.length);
  }, [products && products.length]);

  const handleSliderChange = (index, event) => {
    const video = videoRefs.current[index];
    if (video) {
      const newPercentage = event.target.value;
      const newTime = (video.duration / 100) * newPercentage;
      video.currentTime = newTime;

      setVideoState((prevState) => {
        const newState = [...prevState];
        newState[index] = {
          ...newState[index],
          percentage: newPercentage,
          currentTime: newTime,
        };
        return newState;
      });
    }
  };

  const getCurrDuration = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    if (duration > 0) {
      const percent = ((current / duration) * 100).toFixed(2);
      setPercentage(+percent);
      setCurrentTime(current.toFixed(2));
    }
  };
  /* */

  return (
    <div className="video-card">
      <Swiper
        direction={"vertical"}
        modules={[Mousewheel]}
        mousewheel={{ forceToAxis: true }}
        className="mySwiper"
        allowSlideNext={addProduct || comment || info ? false : true}
        allowSlidePrev={addProduct || comment || info ? false : true}
        onSlideChange={handleSlideChange}
        onSlideChangeTransitionStart={function () {
          var videos = document.querySelectorAll("video");
          Array.prototype.forEach.call(videos, function (video) {
            video.pause();
          });
          setAddProduct(false);
          setComment(false);
        }}
        onSlideChangeTransitionEnd={function () {
          var activeIndex = this.activeIndex;
          var activeSlide =
            document.getElementsByClassName("swiper-slide")[activeIndex];
          var activeSlideVideo = activeSlide.getElementsByTagName("video")[0];
          activeSlideVideo.play();
          activeSlideVideo.load();
          setAddProduct(false);
          setComment(false);
        }}
      >
        {products.status === "loading" ? (
          <div className="bg-white text-white w-100 h-100">
            Loading products...
          </div>
        ) : products.status === "failed" ? (
          <div className="bg-white text-white w-100 h-100">
            Error: {products.error}
          </div>
        ) : (
          <Fragment>
            {products.map((product, index) => {
              return (
                <Fragment>
                  <SwiperSlide key={product.id}>
                    <div className="video-slide-container">
                      <div className="plyer-container">
                        <div>
                          <video
                            id={index}
                            src={product.video}
                            className="react-player"
                            autoPlay={index === 0 ? true : autoPlay}
                            muted={sound}
                            loop
                            playsInline={true}
                            ref={(el) => (videoRefs.current[index] = el)}
                            onPlay={() => setCurrentVideo(index)}
                            onClick={() => togglePlay(index)}
                            controls={false} // Disable default controls to use custom controls
                            onTimeUpdate={getCurrDuration}
                            onLoadedData={(e) => {
                              const duration = e.target.duration;
                              setVideoState((prevState) => {
                                const newState = [...prevState];
                                if (newState[index]) {
                                  newState[index].duration = duration;
                                }
                                return newState;
                              });
                            }}
                          ></video>
                          <div className="controls">
                            <Slider
                              percentage={percentage}
                              onChange={(e) => handleSliderChange(index, e)}
                            />
                            <ControlPanel
                              duration={duration}
                              currentTime={currentTime}
                            />
                            <div className="sound-icon ms-1">
                              {sound ? (
                                <CiVolumeMute
                                  className="fs-4"
                                  onClick={() => setSound(false)}
                                />
                              ) : (
                                <AiOutlineSound
                                  className="fs-4"
                                  onClick={() => setSound(true)}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <SlideOverlay
                      product={product}
                      comment={comment}
                      setComment={setComment}
                      info={info}
                      setInfo={setInfo}
                    />
                  </SwiperSlide>
                </Fragment>
              );
            })}
          </Fragment>
        )}
      </Swiper>
    </div>
  );
}

export default Product;
