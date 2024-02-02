import React, { useEffect, useState } from "react";
import "./style.css";
import Appbar from "../../components/appbar";
import Footer from "../../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart, fetchCart } from "./CartSlice";
import { FaTrash } from "react-icons/fa";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useNavigate } from "react-router-dom";

const AddToCart = () => {
  const { carts, loading } = useSelector((state) => state.cart);
   const { user } = useSelector((state) => state.user);
  const [quantityArray, setQuantityArray] = useState([]);
   const [selectedItems, setSelectedItems] = useState([]);
  const dispatch = useDispatch();
  const navigate=useNavigate()

  useEffect(() => {
    try {
      dispatch(fetchCart(user._id));
    } catch (error) {
      console.log(error.message);
    }
  }, [dispatch]);
  useEffect(() => {
   console.log("this is user",user);
  }, [user]);

  useEffect(() => {
    if (Array.isArray(carts)) {
      const initialQuantities = carts.map((cart) => cart.quantity);
      setQuantityArray(initialQuantities);
      console.log("initialQuantities", initialQuantities);
    }
  }, [carts]);

  // Function to handle the increase in quantity
  const handlePlusClick = (index) => {
    setQuantityArray((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      if (newQuantities[index] < carts[index].product.quantity) {
        newQuantities[index]++;
      }
      return newQuantities;
    });
  };

  // Function to handle the decrease in quantity
  const handleMinusClick = (index) => {
    setQuantityArray((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      if (newQuantities[index] > 0) {
        newQuantities[index]--;
      }
      return newQuantities;
    });
  };

  const handleDelete = (_id) => {
    dispatch(deleteCart(_id));
  };

   const handleItemSelect = (_id) => {
     if (selectedItems.includes(_id)) {
       setSelectedItems((prevSelected) =>
         prevSelected.filter((item) => item !== _id)
       );
     } else {
       setSelectedItems((prevSelected) => [...prevSelected, _id]);
     }
   };

   const handleSelectAll = () => {
     if (selectedItems.length === carts.length) {
       setSelectedItems([]);
     } else {
       const allIds = carts.map((cart) => cart._id);
       setSelectedItems(allIds);
     }
   };

  const calculateTotalQuantity = () => {
    const totalQuantity = selectedItems.reduce(
      (total, itemId) =>
        total + quantityArray[carts.findIndex((c) => c._id === itemId)],
      0
    );

    const totalPrice =
      selectedItems.length > 0
        ? selectedItems.reduce((total, itemId) => {
            const index = carts.findIndex((c) => c._id === itemId);
            return total + carts[index].product.price * quantityArray[index];
          }, 0)
        : 0;

    const standardDeliveryFee = selectedItems.length * 120;

    return { totalQuantity, totalPrice, standardDeliveryFee };
  };

  const checkout=()=>{
    navigate("/checkout");
  }
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
      {carts.length === 0 ? (
        <div
          style={{
            // position: "absolute",
            // top: "50%",
            // left: "50%",
            height: "50vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div>Your Cart is Empty</div>
          <Link
            to={"/"}
            style={{
             color:"blue",
             marginLeft:".5vw"
            }}
          >
            <div>Goto Shopping</div>
          </Link>
        </div>
      ) : (
        <>
          <div className="container">
            <div className="items-container">
              <div className="selectItems">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedItems.length === carts.length}
                />
                <label style={{ marginLeft: "1vw" }}>Select All</label>
              </div>
              {Array.isArray(carts) &&
                carts.map((cart, index) => (
                  <div className="selectItems map" key={cart._id}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <div style={{ width: "4vw" }}>
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(cart._id)}
                          onChange={() => handleItemSelect(cart._id)}
                        />
                      </div>
                      <div style={{ width: "6vw" }}>
                        <img
                          style={{ width: "6vw", height: "15vh" }}
                          src={cart.product.images}
                          alt={`Product: ${cart.product.prodName}`}
                        />
                      </div>
                      <div style={{ width: "20vw", marginLeft: "1vw" }}>
                        <p>{cart.product.prodName}</p>
                        <p>By: ArtistName</p>
                      </div>
                      <div style={{ width: "20vw" }}>
                        Rs: {cart.product.price}/-
                      </div>
                      <div style={{ width: "20vw" }}>
                        <button
                          onClick={() => handleMinusClick(index)}
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

                        {quantityArray[index]}
                        <button
                          onClick={() => handlePlusClick(index)}
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
                      </div>
                      <div style={{ width: "5vw", cursor: "pointer" }}>
                        <FaTrash
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDelete(cart._id)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="payment">
              <h4>Order Summary</h4>
              <div className="order">
                <span style={{ width: "50%" }}>
                  Subtotal ({calculateTotalQuantity().totalQuantity} items)
                </span>
                <span
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "50%",
                  }}
                >
                  Rs: {calculateTotalQuantity().totalPrice}/-
                </span>
              </div>
              <div className="order">
                <span style={{ width: "50%" }}>Standard Delivery Fee</span>
                <span
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "50%",
                  }}
                >
                  Rs: 120/-
                </span>
              </div>
              <div className="order">
                <span style={{ width: "50%" }}>Total</span>
                <span
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "50%",
                    fontWeight: "bold",
                  }}
                >
                  {selectedItems.length > 0
                    ? `Rs: ${calculateTotalQuantity().totalPrice + 120}/-`
                    : "Rs: 0/-"}
                </span>
              </div>
              <button onClick={checkout} className="checkout-btn">Proceed To Checkout</button>
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default AddToCart;
