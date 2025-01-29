

import React ,{useEffect, useState} from "react";
import { useSelector ,useDispatch} from "react-redux";
import ProductItem from "./ProductItem";
import { Grid } from "@mui/material";
import { fetchProducts } from "./productSlice";
import { Card } from "antd";
import Images from "../../Utils/Image.Hovering";

const ProductList = () => {
  const products = useSelector((state) => state.products.items);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const dispatch = useDispatch()
  ;
 


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchQuery.trim());
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch(fetchProducts(debouncedSearchTerm));
    } else {
      dispatch(fetchProducts());
    }
  }, [debouncedSearchTerm, dispatch]);


  return (<>
<div>
<Card> 

<div style={{display: "flex", justifyContent: "space-between", padding: "5px",height:"90px", minWidth:"40%", alignItems: "center", }}>


<div style={{ 
  // display: "flex",
    gap: "15px",
    flexWrap: "wrap",
    alignItems: "center",
    width: "500px",
    minWidth: "auto",
    minHeight: "60%",

    overflow: "hidden",  
    }}> 
  <Images style={{ width: "100%",  
      height: "200px",  
      objectFit: "cover",  
      objectPosition: "center",}} />
</div>


<div style={{display:"flex",justifyContent: "flex-end" ,alignItems: "center",width:"100%",height:"100%",padding:"10px"}}>
 <input 
   placeholder="Search..." 
   value={searchQuery}
   onChange={(e) => setSearchQuery(e.target.value)}
   style={{ width: "30%", padding: "5px", marginRight: "28px",height:"40%" }} 
 />

 </div>
 </div>
</Card>

</div>
    <div style={{ width: "90%", textAlign: "center", margin: "auto" }}>
      <h1 style={{ fontSize: "3.1rem", marginBottom: "20px" }}>Products</h1>
      <hr />
      <Grid container spacing={3} sx={{ padding: "20px" }}>
        {products.length > 0 ? (
          products.map((product, index) => (
            <Grid item xs={12} sm={6} md={3} key={product.id || index}>
              <ProductItem product={product} />
            </Grid>
          ))
        ) : (
          <p style={{ textAlign: "center", width: "100%" }}>No products available.</p>
        )}
      </Grid>
    </div>
    </>
  );
};

export default ProductList;
