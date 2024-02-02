import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearReviews, fetchReview } from "./ReviewSlice";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import { CircularProgress } from "@mui/material";

const Review = ({ picId }) => {
  const dispatch = useDispatch();
  const { reviews, loading } = useSelector((state) => state.review);

  
  useEffect(() => {
    
    dispatch(fetchReview(picId));
  }, [picId]);
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };
  const hasReviews = reviews && reviews.length > 0;
     if (loading) {
       return (
         <div style={{textAlign:"center"}}>
           <CircularProgress />
         </div>
       );
     }
  return (
    <>
      {hasReviews ? (
        <>
          <div style={{ textAlign: "center" }}>
            <h2>Reviews and Ratings</h2>
          </div>
          {reviews.map((review) => (
            <div key={review.id} style={{ border: "1px solid lightgray" }}>
              <Box component="fieldset" mb={1} borderColor="transparent">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                    padding: ".5vw",
                  }}
                >
                  <Rating name="read-only" value={review.rating} readOnly />
                  <div>{review.user.fullname}</div>
                  <div
                    style={{
                      fontSize: "0.8em",
                      color: "#666",
                      display:"flex",
                      marginLeft:"73vw"

                    }}
                  >
                    <p>{formatDate(review.createdAt)}</p>
                  </div>
                </div>
              </Box>

              <div style={{ marginLeft: "2vw", marginTop: "-3vh" }}>
                <p>{review.text}</p>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div style={{ padding: "2vw", textAlign: "center" }}>
          This product has no reviews
        </div>
      )}
    </>
  );
};

export default Review;
