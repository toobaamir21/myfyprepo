import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, getallProducts } from "./ProdSlice";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link, useLocation } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { clearProducts } from "./ProdSlice";
import Footer from "../../components/Footer";
import Appbar from "../../components/appbar";
import { CircularProgress } from "@mui/material";


const defaultTheme = createTheme();
export function Product() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.app);
   const location = useLocation();
 useEffect(() => {
   const searchParams = new URLSearchParams(location.search);
   const category = searchParams.get("category");
   const productName = searchParams.get("productName");

   try {
     dispatch(clearProducts());

     if (category) {
       dispatch(getProducts({ category }));
     } else if (productName) {
       dispatch(getProducts({ productName }));
     }
   } catch (error) {
     console.log(error.message);
   }
 }, [location.search, dispatch]);

const capitalizeWords = (str) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};
if (loading) {
  return (
    <CircularProgress
      style={{ position: "absolute", top: "50%", left: "50%" }}
    />
  );
}

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
        <Appbar />
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
                        {capitalizeWords(product.prodName)}
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

