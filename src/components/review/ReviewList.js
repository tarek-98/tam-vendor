// src/components/ReviewList.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchReviews } from "../../store/reviewSlice";
import { Box, CircularProgress, Typography } from "@mui/material";
import { Rating } from "@mui/lab";
import { Col, Row } from "react-bootstrap";
import "./review.css";
import ReviewName from "./ReviewName";

const ReviewList = () => {
  const dispatch = useDispatch();
  const { reviews, loading, error } = useSelector((state) => state.reviews);
  const { vendorInfo } = useSelector((state) => state.auth);
  const reviewsData = reviews && reviews.data;
  const vendorId = vendorInfo.data._id;

  useEffect(() => {
    dispatch(fetchReviews(vendorId));
    console.log(vendorInfo.data._id);
  }, []);

  if (loading)
    return (
      <div className="main-review d-flex align-items-center justify-content-center">
        <CircularProgress />
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="main-review">
      <div className="container">
        <div className="main-title text-center mb-4">
          <h3>تقيماتي</h3>
          <div className="vendor-loc fw-bold">
            <span> متوسط تقييم التاجر : </span>
            <span>{reviewsData && reviewsData.averageRating}</span>
          </div>
        </div>
        <Row>
          {reviewsData &&
            reviewsData.reviews.map((review, index) => (
              <Col lg="4">
                <Box
                  key={index}
                  sx={{
                    mb: 2,
                    p: 2,
                    border: "1px solid #ccc",
                    borderRadius: 2,
                  }}
                  textAlign="center"
                >
                  <ReviewName review={review} />
                  <Rating value={review.rating} readOnly />
                  <Typography variant="body1">{review.reviewText}</Typography>
                </Box>
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
};

export default ReviewList;
