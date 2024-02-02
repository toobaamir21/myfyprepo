import React, { useEffect, useState } from "react";
import "./Productstyle.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Appbar from "../../components/appbar";
import {
  addLength,
  clearQuantity,
  createCart,
  decrement,
  increment,
  updateCart,
} from "../checkout/CartSlice";
import { CircularProgress, Divider, Rating } from "@mui/material";
import {
  FaTruck,
  FaMoneyBill,
  FaRegCreditCard,
  FaCheckCircle,
  FaUndoAlt,
  FaShieldAlt,
  FaExclamationCircle,
  FaMapMarker,
} from "react-icons/fa";
import Review from "../review/Review";
import Chat from "../../components/chat/Chat";

const ImageSlider = () => {
    const dispatch = useDispatch();
    const { products, loading } = useSelector((state) => state.app);
    const { quantity, carts } = useSelector((state) => state.cart);
      let { reviews } = useSelector((state) => state.review);
    console.log("this is products", products);
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const picId = searchParams.get("picId");
    const [showPopup, setShowPopup] = useState(false);
    const [matchedProduct, setMatchedProduct] = useState(null);
    const { user } = useSelector((state) => state.user);
   
        const [averageRating, setAverageRating] = useState(0);


    useEffect(() => {
       
      dispatch(clearQuantity());
      if (!loading && products && products.length > 0) {
        const product = products.find((product) => product._id === picId);

        setMatchedProduct(product);
      }
    }, [loading, products, picId, dispatch]);
   
  useEffect(() => {
    if (Array.isArray(reviews) && reviews.length > 0) {
      const totalRating = reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      const avgRating = totalRating / reviews.length;
      setAverageRating(avgRating);
      console.log("Average Rating", avgRating);
    } else {
      setAverageRating(0);
    }
  }, [reviews]);


    const Buynow = () => {
      navigate("/checkout");
    };
 const CreateCart = (id) => {
   const isLoggedIn = user !== null;
   if (!isLoggedIn) {
     
     sessionStorage.setItem(
       "redirectAfterLogin",
       location.pathname + location.search
     );
     navigate("/login");
     return;
   }

   const cartexist = carts.find((cart) => cart.product._id === id);

   if (cartexist) {
     const data = {
       quantity: cartexist.quantity + quantity,
       user: user._id,
       id: cartexist._id,
     };

     dispatch(updateCart(data))
       .then(() => {
         console.log("Product quantity updated successfully");
         showPopupMessage();
         dispatch(addLength());
       })
       .catch((error) => {
         console.error("Error updating product quantity:", error);
       });
   } else {
     const data = {
       quantity: quantity,
       product: matchedProduct._id,
       user: user._id,
     };

     dispatch(createCart(data))
       .then(() => {
         console.log("Product added to cart successfully");
         showPopupMessage();
         dispatch(addLength());
       })
       .catch((error) => {
         console.error("Error adding product to cart:", error);
       });
   }

   const redirectAfterLogin = sessionStorage.getItem("redirectAfterLogin");
   if (redirectAfterLogin) {
     navigate(redirectAfterLogin);
     sessionStorage.removeItem("redirectAfterLogin");
   }
 };
    


   const capitalizeWords = (str) => {
     return str.replace(/\b\w/g, (char) => char.toUpperCase());
   };
    const showPopupMessage = () => {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 700);
    };

    if (loading) {
      return (
        <CircularProgress
          style={{ position: "absolute", top: "50%", left: "50%" }}
        />
      );
    }
    

     
  return (
    <>
      <Appbar />
      <div className="parentdiv">
        {matchedProduct ? (
          <>
            <div className="child1">
              <img
                src={matchedProduct.images}
                alt="Product pic"
                style={{ objectFit: "fill", width: "25vw", height: "auto" }}
              />
            </div>
            <div className="child2">
              <h1>{capitalizeWords(matchedProduct.prodName)}</h1>
              <h2>{matchedProduct.description}</h2>
              <div>
                
                  
                  <Rating value={averageRating} readOnly />({reviews.length}
                  reviews)
                
              </div>
              <p>Brand By: Artist Name</p>
              <Divider
                orientation="vertical"
                flexItem
                style={{ border: "0.1px solid lightgray" }}
              />
              <h3>Rs:{matchedProduct.price}/-</h3>

              <p>
                Quantity
                <button
                  //onClick={Minus}
                  onClick={() => {
                    if (quantity > 0) {
                      dispatch(decrement());
                    }
                  }}
                  style={{
                    width: "2vw",
                    height: "3vh",
                    cursor: "pointer",
                    border: ".5px solid black",
                    marginLeft: "1vw",
                    marginRight: "1vw",
                  }}
                >
                  -
                </button>
                {/* {count} */}
                {quantity}
                <button
                  // onClick={Plus}
                  onClick={() => {
                    if (quantity < matchedProduct.quantity) {
                      dispatch(increment());
                    }
                  }}
                  style={{
                    width: "2vw",
                    height: "3vh",
                    cursor: "pointer",
                    border: ".5px solid black",
                    marginLeft: "1vw",
                  }}
                >
                  +
                </button>
              </p>
              <div className="btn-div">
                <button className="btn-style" onClick={Buynow}>
                  Buy Now
                </button>
                <button
                  className="btn-style two"
                  onClick={() => CreateCart(matchedProduct._id)}
                >
                  Add to Cart
                </button>
              </div>
              {showPopup ? (
                <div
                  style={{
                    marginTop: "1vh",
                    width: "100%",
                    padding: "1vw",
                    background: "lightgreen",
                    border: "1px solid green",
                  }}
                >
                  Item is added to cart!
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="child3">
              <h4>Delivery</h4>
              <p>
                <FaMapMarker style={{ marginRight: ".5vw" }} />
                Deliver to all cities of Pakistan
              </p>
              <p>
                <FaTruck style={{ marginRight: ".5vw" }} /> Standard Delivery
                Charges: Rs: 120/-
              </p>
              <p>
                <FaCheckCircle style={{ marginRight: ".5vw" }} /> Free Delivery:
                On Events
              </p>
              <h4>Payment</h4>
              <p>
                <FaMoneyBill style={{ marginRight: ".5vw" }} /> Cash On Delivery
                is available
              </p>
              <p>
                <FaRegCreditCard style={{ marginRight: ".5vw" }} /> Online
                payment available
              </p>
              <h4>Service</h4>
              <p>
                <FaShieldAlt style={{ marginRight: ".5vw" }} /> 100% Authentic
                from Trusted Brand
              </p>
              <p>
                <FaUndoAlt style={{ marginRight: ".5vw" }} /> 14 days free &
                easy return
              </p>
              <p>
                <FaExclamationCircle style={{ marginRight: "1vw" }} />
                Warranty not available
              </p>
            </div>
          </>
        ) : (
          <p>Product not found</p>
        )}
      </div>

      <Chat style={{ marginTop: "1vh" }} />

      <Review picId={picId} />
      <Footer />
    </>
  );
}

export default ImageSlider
