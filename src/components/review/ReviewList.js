// src/components/ReviewList.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchReviews } from "../../store/reviewSlice";
import { Box, Typography } from "@mui/material";
import { Rating } from "@mui/lab";
import { Col, Row } from "react-bootstrap";
import "./review.css";

const ReviewList = () => {
  const dispatch = useDispatch();
  const { reviews, loading, error } = useSelector((state) => state.reviews);
  const { vendorInfo } = useSelector((state) => state.auth);
  const reviewsData = reviews.data;
  const vendorId = vendorInfo.data._id;

  useEffect(() => {
    dispatch(fetchReviews(vendorId));
    console.log(vendorInfo.data._id);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="main-review">
      <div className="container">
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
                >
                  {/*<p>{review.name}</p> */}
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
