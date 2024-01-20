import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategory } from "./CategorySlice";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import theme from "../../styles/theme";

import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Banner from "../../components/banner";
import Footer from "../../components/Footer";
import Appbar from "../../components/appbar";



const defaultTheme = createTheme();
export function Category() {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.category);
  // console.log("this is products",products[0].prodName);
  useEffect(() => {
    try {
      dispatch(fetchCategory());
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
     
      <main>
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
                <Banner />
              </>
            }
          </Container>
        </ThemeProvider>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h3"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Categories
            </Typography>
            {/* <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
            </Stack> */}
          </Container>
        </Box>
        <Container sx={{ py: 3 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {categories.map((category) => (
              <Grid item key={category._id} xs={12} sm={6} md={4}>
                <Link
                  style={{
                    cursor: "pointer",
                    textDecoration: "none",
                  }}
                  to={`/products?category=${category.label}`}
                >
                  <Card
                    sx={{
                      height: "100%",
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        // 16:9
                        pt: "70.25%",
                      }}
                      // image="https://source.unsplash.com/random?wallpapers"
                      image={category.picture}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {category.label}
                      </Typography>
                      {/* <Typography>
                        This is a media card. You can use this section to
                        describe the content.
                      </Typography> */}
                    </CardContent>
                    {/* <CardActions>
                      <Button size="small">View</Button>
                      <Button size="small">Edit</Button>
                    </CardActions> */}
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
