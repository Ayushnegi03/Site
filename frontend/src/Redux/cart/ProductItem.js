import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductGrid.css';
import { Box, Stack, Divider, Grid } from '@mui/material';

const ProductItem = ({product}) => {
  const navigate = useNavigate();
  
  const navigateToDetails = () => {
    navigate(`/product/${product._id}`);
  };
  return (
    <div className="product-grid"
  
    >
      <Grid item xs={9}>
        <Stack
          sx={{ border: '3px solid', borderRadius: '8px', padding: '8px'  ,background: '#EDEADE' }}
          direction="column-reverse"
          spacing={2}
          divider={<Divider orientation="horizontal" flexItem />}
        >
          <Box
            sx={{
              
              color: 'white',
              height: '100%',
              width:'99%',
              padding: '10px',
              textAlign: 'center',
              borderRadius: '3px',
             
              transition: 'transform 0.3s, box-shadow 0.3s',
              
            }}
          >
            <div onClick={navigateToDetails} className="product-card">
              <img
                className="product-image"
                src={product.imageUrl}
                alt={product.name || 'Product Image'}
                style={{
                  width: '100%',
                  height: '90%',
                  cursor: 'pointer',
                  borderRadius: '4px',
                }}
              />
              <h2 className="product-title"
             
              style={{ cursor: 'pointer', margin: '10px 0',maxHeight: '320px', maxWeight: '150px',
                textSize: 'fit-content',
              
                whiteSpace: 'nowrap', 
                position: 'relative', 
               
               }}>
                {product.name}
              </h2>
              <p
                className="product-description"
                style={{
                  cursor: 'pointer',
                  color: '#333',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  height:'auto',
                }}
              >
                ₹{product.price.toFixed(2)}
              </p>
            </div>
           
          </Box>
        </Stack>
      </Grid>
    </div>
  );
};

export default ProductItem;

