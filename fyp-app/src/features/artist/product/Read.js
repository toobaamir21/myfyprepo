import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts, deleteProducts, setProduct } from "./Artistproduct";
import { Card, CardContent, Button, styled } from '@mui/material';


const StyledCard = styled(Card)`
    width: 400px;
    margin: 20px;
`;
const Read = () => {
    const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [id, setId] = useState();

  const [radioData, setRadioData] = useState("");

  const [showPopup, setShowPopup] = useState(false);

  const { products, loading, searchData } = useSelector((state) => state.product);
 console.log(JSON.stringify(products) + ' products');
  useEffect(() => {
    const val = dispatch(fetchProducts(user._id));
    // console.log(JSON.stringify(val) + ' val');
  }, []);

  const handleSetProduct = async(data)=>{
    const val = await dispatch(setProduct(data))
    // console.log(JSON.stringify(val) + 'from handler');
  }

  const handleDelete=async(id)=>{
    const val=await dispatch(deleteProducts(id))
    // console.log(JSON.stringify(val)  + ' fromval');
  }
  if (loading) {
    return <h2>Loading</h2>;
  }

  return (
    <div>
    {products?.map((product) => (
        <StyledCard key={product._id}>
            <CardContent>
          
                <p><strong>ID:</strong> {product._id}</p>
                <p><strong>Name:</strong> {product.prodName}</p>
                <p><strong>Description:</strong> {product.description}</p>
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Quantity:</strong> {product.quantity}</p>
                <p><strong>Price:</strong> {product.price}</p>
                
               

                <Button
                    color="primary"
                    variant="contained"
                    onClick={()=>{handleSetProduct(product)}}
                    component={Link}
                    to={`/update`}
                    style={{ marginRight: 10}}
                >
                    Edit
                </Button>
                <Button
                    color="secondary"
                    variant="contained"
                    onClick={() =>{handleDelete(product._id)}}
                >
                    Delete
                </Button>
            </CardContent>
        </StyledCard>
    ))}
</div>
      


     
       

      
       
  );
};

export default Read;