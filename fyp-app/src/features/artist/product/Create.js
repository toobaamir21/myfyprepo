import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createProducts } from "./Artistproduct";
// import { useNavigate } from 'react-router-dom';
import expimage from './pottery.png'

import { FormGroup, FormControl, InputLabel, Input, Button, styled, Typography,Box, Container} from '@mui/material';


const Create = () => {
    const { user } = useSelector((state) => state.user);
    const initialValue = {
        images: expimage,
        prodName: '',
        description: '',
        category: '',
        quantity: '',
        price: '',
        user:user._id
    }
    const Container = styled(FormGroup)`
    width: 40%;
    margin: 5% 0 0 25%;
    position: align-center;
    border: 2px solid black;
    padding: 10px;
  box-shadow: 6px 4px 8px -2px;
    `;
  const [products, setProducts] = useState(initialValue);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const getProductsData = (e) => {
    setProducts({ ...products, [e.target.name]: e.target.value });
  };

  const handleSubmit = async() => {
    // e.preventDefault();
    console.log("products...", products);
    const val = await dispatch(createProducts(products));
    // console.log(JSON.stringify(val) + ' from dispatch');
    if(val !== null){

        navigate("/read");
    }
  };

  return (
//     <div>
//       <h2 className="my-2">Fill the data</h2>
//       <form className="w-50 mx-auto my-5" onSubmit={handleSubmit}>
//         <div class="mb-3">
//           <label class="form-label">Name</label>
//           <input
//             type="text"
//             name="name"
//             class="form-control"
//             onChange={getUserData}
//             required
//           />
//         </div>
//         <div class="mb-3">
//           <label class="form-label">Email</label>
//           <input
//             type="email"
//             name="email"
//             class="form-control"
//             onChange={getUserData}
//             required
//           />
//         </div>
//         <div class="mb-3">
//           <label class="form-label">Age</label>
//           <input
//             type="text"
//             name="age"
//             class="form-control"
//             onChange={getUserData}
//             required
//           />
//         </div>
//         <div class="mb-3">
//           <input
//             class="form-check-input"
//             name="gender"
//             value="Male"
//             type="radio"
//             onChange={getUserData}
//             required
//           />
//           <label class="form-check-label">Male</label>
//         </div>
//         <div class="mb-3">
//           <input
//             class="form-check-input"
//             name="gender"
//             value="Female"
//             type="radio"
//             onChange={getUserData}
//           />
//           <label class="form-check-label">Female</label>
//         </div>

//         <button type="submit" class="btn btn-primary">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };


<Container>
            <Typography variant="h4" style={{marginBottom: "10px"}}>Add Product</Typography>
           
            {/* <FormControl style={{marginBottom: "10px"}} >
                <InputLabel htmlFor="my-input" >Image</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='image' value={expimage} id="my-input" />
            </FormControl> */}
            {/* {imageUrl && (
                <Box textAlign="center" marginBottom="10px">
                    <Typography variant="body1"></Typography>
                    <img
                        src={imageUrl}
                        alt="Image Preview"
                        style={{ maxWidth: '100%', maxHeight: '200px' }}
                    />
                </Box>
            )} */}

            {/* Image Input */}
            {/* <FormControl style={{ marginBottom: '10px' }}>
                <InputLabel htmlFor="image-input">Image</InputLabel>
                <Input
                    onChange={(e) => onValueChange(e)}
                    name="imageUrl"
                    value={imageUrl}
                    id="image-input"
                />
            </FormControl> */}




            <FormControl>
             
        </FormControl>
            <FormControl style={{marginBottom: "10px"}} >
                <InputLabel htmlFor="my-input" >Name</InputLabel>
                <Input onChange={getProductsData} name='prodName' value={products.prodName} id="my-input" />
            </FormControl>
            <FormControl style={{marginBottom: "10px"}}>
                <InputLabel htmlFor="my-input">Description</InputLabel>
                <Input onChange={getProductsData} name='description' value={products.description} id="my-input" />
            </FormControl>
            <FormControl style={{marginBottom: "10px"}}>
                <InputLabel htmlFor="my-input">Category</InputLabel>
                <Input onChange={getProductsData} name='category' value={products.category} id="my-input"/>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Quantity</InputLabel>
                <Input onChange={getProductsData} name='quantity' value={products.quantity} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Price</InputLabel>
                <Input onChange={getProductsData} name='price' value={products.price} id="my-input" />
            </FormControl>
            <FormControl>
            <Box textAlign='center'>
                <Button variant="contained" color="primary" onClick={()=>handleSubmit()}>Add Product</Button>
                </Box>
            </FormControl>

        </Container>
    )
}



export default Create;