import logo from './logo.svg';
import './App.css';
import {Button, Container} from '@mui/material'
import { ThemeProvider } from '@mui/system';
import { useEffect } from 'react';
import theme from './styles/theme'
import Appbar from './components/appbar'
import Banner from './components/banner';

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
