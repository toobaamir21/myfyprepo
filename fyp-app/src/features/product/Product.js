import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "./ProdSlice";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link, useLocation } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { clearProducts } from "./ProdSlice";
import Footer from "../../components/Footer";
import Appbar from "../../components/appbar";


const defaultTheme = createTheme();
export function Product() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.app);
   const location = useLocation();
  // console.log("this is products",products[0].prodName);
 useEffect(() => {
   const searchParams = new URLSearchParams(location.search);
   const category = searchParams.get("category");
   
   console.log("this is category",category);

   try {
      dispatch(clearProducts());
     dispatch(getProducts(category)); 
   } catch (error) {
     console.log(error.message);
   }
 }, [location.search, dispatch]);



  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        {/* <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Album layout
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Something short and leading about the collection below—its
              contents, the creator, etc. Make it short and sweet, but not too
              short so folks don&apos;t simply skip over it entirely.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button>
            </Stack>
          </Container>
        </Box> */}
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {products.map((product) => (
              <Grid item key={product._id} xs={12} sm={6} md={4}>
                <Link
                  style={{
                    cursor: "pointer",
                    textDecoration: "none",
                  }}
                  to={`/productimage?picId=${product._id}`}
                >
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        // 16:9
                        pt: "56.25%",
                      }}
                      image={product.images}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {product.prodName}
                      </Typography>
                      <Typography>{product.description}</Typography>
                    </CardContent>
                    <CardActions
                      style={{
                        color: "red",
                        fontSize: "1.5em",
                        marginLeft: ".5vw",
                      }}
                    >
                      Rs: {product.price}/-
                    </CardActions>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <Footer />
    </ThemeProvider>
  );
}

