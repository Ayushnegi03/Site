

import React ,{useEffect} from "react";
import { useSelector ,useDispatch} from "react-redux";
import ProductItem from "./ProductItem";
import { Grid } from "@mui/material";
import { fetchProducts } from "./productSlice";

const ProductList = () => {
  const products = useSelector((state) => state.products.items);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  console.log("User is authenticated:", isAuthenticated);

  return (
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
  );
};

export default ProductList;
