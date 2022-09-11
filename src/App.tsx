import React from "react";
import "./App.css";
import Site from "./components/Site";
import Navbar from "./components/Navbar";
import Products from "./components/Product";
import useMediaQuery from "@mui/material/useMediaQuery";
import Categories from "./components/Categories";
import ProductDetails from "./components/ProductDetails";
import Grid from "@mui/material/Grid";
import { Product } from "./interfaces";
import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
function App() {
  const [products, setProducts] = useState(Array<Product>);
  const [productsCopy, setProductsCopy] = useState(Array<Product>);
  const [categories, setCategories] = useState([]);
  const mediaBreakpoint = useMediaQuery("(min-width:900px)");
  const location = useLocation();
  console.log(location);
  

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setProducts(json)
        setProductsCopy(json)
      });
  }, []);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((json) => setCategories(json));
  }, []);

  const searchByCategory = (category: string) => {
    if (category === "") {
      fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((json) => setProducts(json));
      return;
    }
    fetch(`https://fakestoreapi.com/products/category/${category}`)
      .then((res) => res.json())
      .then((json) => setProducts(json));
  };

  const productComponents = products
    .map((el) => <Products product={el} />)
    .slice(0, 9);

  const productsRoutes = productsCopy.map((el) => (
    <Route
      path={`/products/${el.id}`}
      element={<ProductDetails product={el} allProducts={productsCopy}/>}
    ></Route>
  ));

  let pagesRoutes;

  

  return (
    <Site>
      <Navbar
        categories={categories}
        products={productsCopy}
        searchByCategory={searchByCategory}
      />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Grid
                container
                spacing={4}
                my={4}
                sx={{
                  width: mediaBreakpoint ? "70%" : "100%",
                  ml: "auto",
                  mt: mediaBreakpoint ? 0 : 15,
                }}
              >
                {productComponents}
              </Grid>
              <Categories
                categories={categories}
                searchByCategory={searchByCategory}
              />
            </>
          }
        ></Route>
        {productsRoutes}
      </Routes>
    </Site>
  );
}

export default App;
