// import React from 'react';
// import { makeStyles } from '@mui/styles/makeStyles';
// import { Avatar, Typography, Grid, Button } from '@mui/material';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     padding: theme.spacing(3),
//   },
//   avatar: {
//     width: theme.spacing(15),
//     height: theme.spacing(15),
//     marginBottom: theme.spacing(2),
//   },
//   name: {
//     fontWeight: 'bold',
//   },
//   description: {
//     marginBottom: theme.spacing(2),
//   },
//   actionButton: {
//     marginRight: theme.spacing(2),
//     marginBottom: theme.spacing(1),
//   },
// }));

// const ArtisanProfile = ({ artisan }) => {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <Grid container spacing={3} alignItems="center">
//         <Grid item xs={12} sm={4} md={3}>
//           <Avatar className={classes.avatar} alt={artisan.name} src={artisan.avatarUrl} />
//         </Grid>
//         <Grid item xs={12} sm={8} md={9}>
//           <Typography variant="h4" className={classes.name}>{artisan.name}</Typography>
//           <Typography variant="body1" className={classes.description}>{artisan.description}</Typography>
//           <Button variant="contained" color="primary" className={classes.actionButton}>Follow</Button>
//           <Button variant="contained" color="secondary" className={classes.actionButton}>Message</Button>
//           <Button variant="contained" color="default" className={classes.actionButton}>View Products</Button>
//           <Button variant="contained" color="default" className={classes.actionButton}>View Orders</Button>
//         </Grid>
//       </Grid>
//     </div>
//   );
// };





import React, { useState } from "react";
import { Link } from "react-router-dom";
import Appbar from "../../components/appbar";
import Footer from "../../components/Footer";
import img from "./artistimg.jpg"
import { Card, CardContent, Button, styled, Box, Typography } from '@mui/material';
const StyledCard = styled(Card)`
    width: 30%;
    max-width: 600px; 
    margin: 0 auto; 
    margin-top: 20px; 
    padding: 20px; 
    background-color: #CBC3E3;;
`;
const ArtistProfile = () => {
    return(
        <>
        <Appbar/>
        
<StyledCard>
    <CardContent>
    <Box textAlign="center" marginBottom="10px">
                    <Typography variant="body1"></Typography>
                    <img
                        src={img}
                        alt="Image Preview"
                        style={{ maxWidth: '100%', maxHeight: '200px' }}
                    />
                </Box>
        <p><strong></strong></p>
        <p><strong>Name:</strong> </p>
        <p><strong>Description:</strong> </p>
        <p><strong>Expertise:</strong> </p>
       
        
       

        <Button
            color="primary"
            variant="contained"
           
            component={Link}
            to={`/Read`}
            style={{ marginRight: 10}}
        >
            Products
        </Button>
        <Button
            color="primary"
            variant="contained"
           
        >
            Order
        </Button>
    </CardContent>
</StyledCard>
<Footer/>
</>
    )
}










    
  

export default ArtistProfile;