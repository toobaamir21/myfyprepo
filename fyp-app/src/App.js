
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {Button, Container} from '@mui/material'
import { ThemeProvider } from '@mui/system';
import { useEffect } from 'react';
import theme from './styles/theme'
import Appbar from './components/appbar'

import { Product } from './features/product/Product';
import { Category } from './features/category/Category';
import ImageSlider from './features/product/ImageSlider';



import Banner from './components/banner';
import Login from './features/users/login'
import Signup from './features/users/signup/signup';

function App() {

  useEffect(()=>{
  document.title = "FYP app-HOME"}
  , [])
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container
          maxWidth="xl"
          sx={{
            background: "#ffff",
          }}
        >
          {
            <>
              <Appbar />
            </>
          }
        </Container>
      </ThemeProvider>

      <Router>
        <Routes>
          <Route exact path="/" element={<Category />} />
          <Route exact path="/products" element={<Product />} />

          <Route exact path="/productimage" element={<ImageSlider />} />
         
        </Routes>
      </Router>
    <Appbar/> 
    <Banner/>
    <Login/>
    <Signup/>
    </>
  );
  }

export default App;
