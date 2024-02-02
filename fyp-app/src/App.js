
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useEffect } from 'react';
import { Product } from './features/product/Product';
import { Category } from './features/category/Category';
import ImageSlider from './features/product/ImageSlider';
import Login from './features/users/login'
import Checkout from './features/checkout/Checkout';
import AddToCart from './features/checkout/AddToCart';
import Signup from './features/users/signup';
import ConfirmPage from './page/ConfirmPage';
import { useSelector } from 'react-redux';
import Review from './features/review/Review';
import Chat from './components/chat/Chat';


function App() {
 const { user } = useSelector((state) => state.user);
  useEffect(()=>{
  document.title = "FYP app-HOME"}
  , [])
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Category />} />
          <Route exact path="/products" element={<Product />} />
          <Route exact path="/confirmpage" element={<ConfirmPage />} />
          <Route exact path="/productimage" element={<ImageSlider />} />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/checkout" element={<Checkout />} />

          <Route exact path="/cart" element={<AddToCart />} />
          <Route exact path="/chat" element={<Chat />} />
        </Routes>
      </Router>
    </>
  );
  }

export default App;
