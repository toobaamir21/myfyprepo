import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FormGroup, FormControl, InputLabel, Input, Button, styled, Typography,Box, Container} from '@mui/material';

import { updateProducts } from "./Artistproduct";

const Update = () => {
    const { user } = useSelector((state) => state.user);
    const productData  = useSelector((state) => state.product.productData);
    console.log(JSON.stringify(productData) + ' setproductVal');
    const initialValue = {
        _id:productData._id,
        prodName: productData.prodName,
        description: productData.description,
        category: productData.category,
        quantity: productData.quantity,
        images: 'val.png',
        price:productData.price,
        user: user._id
    }

    const Container = styled(FormGroup)`
        width: 40%;
        margin: 5% 0 0 25%;
        position: align-center;
        border: 2px solid black;
        padding: 10px;
      box-shadow: 6px 4px 8px -2px;
      `;
    
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [updateData, setUpdateData] = useState(initialValue);

  const { loading } = useSelector((state) => state.product);

//   useEffect(() => {
//     if (id) {
//       const singleProduct = products.filter((ele) => ele.id === id);
//       setUpdateData(singleProduct[0]);
//     }
//   }, []);

const newData = (e) => {
    const { name, value } = e.target;
    setUpdateData(prevState => ({
        ...prevState,
        [name]: value
    }));
};

//   console.log("updated data", updateData);

  const handleUpdate = async(updateData) => {
    // e.preventDefault();
    console.log('from update');
    const val = await dispatch(updateProducts(updateData));
    // console.log(JSON.stringify(val) + ' from update');
    if(val !== null){
        navigate("/read");
    }
        
  };
  return (
        <Container>
            <Typography variant="h4" style={{marginBottom: "10px"}}>Edit Product</Typography>
            {/* {imageUrl && (
                <Box textAlign="center" marginBottom="10px">
                    <Typography variant="body1"></Typography>
                    <img
                        src={imageUrl}
                        alt="Image Preview"
                        style={{ maxWidth: '100%', maxHeight: '150px' }}
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
            </FormControl>
 */}






            <FormControl style={{marginBottom: "10px"}}>
                <InputLabel htmlFor="my-input">Name</InputLabel>
                <Input  onChange={newData} name='prodName' value={updateData.prodName} id="my-input"/>
            </FormControl>
            <FormControl style={{marginBottom: "10px"}}>
                <InputLabel htmlFor="my-input">description</InputLabel>
                <Input onChange={newData} name='description' value={updateData.description} id="my-input"/>
            </FormControl>
            <FormControl style={{marginBottom: "10px"}}>
                <InputLabel htmlFor="my-input">Category</InputLabel>
                <Input onChange={newData} name='category' value={updateData.category} id="my-input" />
            </FormControl>
            <FormControl style={{marginBottom: "10px"}}>
                <InputLabel htmlFor="my-input">Quantity</InputLabel>
                <Input onChange={newData} name='quantity' value={updateData.quantity} id="my-input" />
            </FormControl>
            <FormControl style={{marginBottom: "10px"}}>
                <InputLabel htmlFor="my-input">Price</InputLabel>
                <Input onChange={newData} name='price' value={updateData.price} id="my-input" />
            </FormControl>
            <FormControl>
            <Box textAlign='center'>
                <Button style={{position: "aligncenter"}} variant="contained" color="primary" onClick={()=>handleUpdate(updateData)}>Edit Product</Button>
                </Box>
            </FormControl>

        </Container>
    )
}






export default Update;