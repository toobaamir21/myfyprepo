// import React, { useEffect, useState } from "react";

// import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
// import "./Productstyle.css";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation } from "react-router-dom";

// const ImageSlider = () => {
//   const dispatch = useDispatch();
//   const { products, loading } = useSelector((state) => state.app);
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const picId = searchParams.get("picId");
// const matchedProduct = products.find((product) => product._id === picId);
// console.log("this is products",products);
// if (loading) {
//   return <p>Loading...</p>;
// }

// if (!matchedProduct) {
//   return <p>No product found for this ID</p>;
// }
// console.log("this is matched products",matchedProduct);

//   // const [current, setCurrent] = useState(0);
//   // const length = products.images.length;
//   // const nextSlide = () => {
//   //   setCurrent(current === length - 1 ? 0 : current + 1);
//   // };

//   // const prevSlide = () => {
//   //   setCurrent(current === 0 ? length - 1 : current - 1);
//   // };

//   // if (!Array.isArray(products.images) || products.images.length <= 0) {
//   //   return null;
//   // }

//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "space-around",
//         alignItems: "center",
//         flexWrap: "wrap",
//       }}
//     >
//       <div>
//         {/* <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
//           <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} /> */}

//         {matchedProduct && (
//           <div>
//             <h1>Product Name: {matchedProduct.name}</h1>
//             <img
//               src={matchedProduct.images}
//               alt="Product Image"
//               style={{ width: "300px", height: "auto" }}
//             />
//           </div>
//         )}
//       </div>

//       <div>
//         <h1>Shawls</h1>
//         <h1>Shawls</h1>
//         <h1>Shawls</h1>

//         <h1>Shawls</h1>
//         <h1>Shawls</h1>
//       </div>
//       <div>
//         <p>kxdnvjkdgnodndd</p>
//       </div>
//     </div>
//   );
// };

// export default ImageSlider;

import React, { useEffect, useState } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft, FaMinus, FaPlus } from "react-icons/fa";
import "./Productstyle.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Footer from "../../components/Footer";

const ImageSlider = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.app);
  console.log("this is products", products);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const picId = searchParams.get("picId");
    const [count, setCount] = useState(1);
  const [matchedProduct, setMatchedProduct] = useState(null);
  useEffect(() => {
    if (!loading && products && products.length > 0) {
      const product = products.find((product) => product._id === picId);
      setMatchedProduct(product);
    }
  }, [loading, products, picId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!products || products.length === 0) {
    return <p>No products available</p>;
  }

  if (!matchedProduct) {
    return <p>No product found for this ID</p>;
  }

    const Plus = () => {
      console.log("-/.", matchedProduct.quantity);
         if (count < matchedProduct.quantity) {
           setCount(count + 1);
         } else {
           setCount(count);
         }
    
    };

    const Minus = () => {
      if (count==0) {
        setCount(count)
      }
      else{ setCount(count - 1);}
    
    };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <img
            src={matchedProduct.images}
            alt="Product Image"
            style={{ width: "300px", height: "auto" }}
          />
          <div style={{ marginLeft: "20px" }}>
            <h1>{matchedProduct.prodName}</h1>
            <h2>{matchedProduct.description}</h2>
            <h3>Rs:{matchedProduct.price}/-</h3>
            <div>
              <p>
                Quantity
                <button
                  onClick={Minus}
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
                {count}
                <button
                  onClick={Plus}
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
            </div>

            <div>
              <button
                style={{
                  width: "10vw",
                  height: "8vh",
                  marginRight: ".5vw",
                  background: "lightgreen",
                  border: "0px",
                  cursor: "pointer",
                  boxShadow: "2px 2px 4px  gray",
                }}
              >
                Buy Now
              </button>
              <button
                style={{
                  width: "10vw",
                  height: "8vh",
                  marginLeft: ".5vw",
                  background: "lightblue",
                  border: "0px ",
                  cursor: "pointer",
                  boxShadow: "2px 2px 4px  gray",
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default ImageSlider;
