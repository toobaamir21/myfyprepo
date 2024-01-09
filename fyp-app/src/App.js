import logo from './logo.svg';
import './App.css';
import {Button, Container} from '@mui/material'
import { ThemeProvider } from '@mui/system';
import { useEffect } from 'react';
import theme from './styles/theme'
import Appbar from './components/appbar'
import Banner from './components/banner';
import Login from './features/users/login'
import Signup from './features/users/signup/signup';

function App() {
  useEffect(()=>{
  document.title = "FYP app-HOME"}
  , [])
  return (
    <ThemeProvider theme ={theme}>
   <Container
   maxWidth="xl"
   sx= {{
    background : '#ffff'
   }}
   >
   {
    <>
    <Appbar/> 
    <Banner/>
    <Login/>
    <Signup/>
    </>
    /*
    Appbar
    Banner
    Promotions
    Title
    Product
    Footer
    Searchbox
    Apppdrawer
    */
   }
    
    </Container>
    </ThemeProvider>
  
  );
  }

export default App;
