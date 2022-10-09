import "./App.css";
import Site from "./components/Site";
import Navbar from "./components/Navbar";
import Products from "./components/ProductCard";
import Categories from "./components/Categories";
import MainContent from "./components/MainContent";
import ProductDetails from "./components/ProductDetails";
import ProductsContainer from "./components/ProductsContainer";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Product } from "./interfaces";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
function App() {
  const [products, setProducts] = useState(Array<Product>);
  const [allProducts, setAllProducts] = useState(Array<Product>);
  const [categories, setCategories] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [categoryTitle, setCategoryTitle] = useState("All products");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
        setAllProducts(json);
        setLoadingProducts(false);
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
      setCategoryTitle("All products");
      return;
    }
    fetch(`https://fakestoreapi.com/products/category/${category}`)
      .then((res) => res.json())
      .then((json) => setProducts(json));
      setCategoryTitle(`${category.charAt(0).toUpperCase() + category.slice(1)}`);
  };

  const productComponents = products
    .map((el) => <Products product={el} />)
    .slice(0, 9);

  const productsRoutes = allProducts.map((el) => (
    <Route
      path={`/products/${el.id}`}
      element={<ProductDetails product={el} allProducts={allProducts} />}
    ></Route>
  ));


  return (
    <Site>
      <Navbar categories={categories} allProducts={allProducts} searchByCategory={searchByCategory}/>
      <Routes>
        <Route
          path="/"
          element={
            loadingProducts ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "80vh",
                }}
              >
                <CircularProgress sx={{ color: "#000" }} />
              </Box>
            ) : (
              <MainContent>
                <ProductsContainer title={categoryTitle}>{productComponents}</ProductsContainer>
                <Categories
                  categories={categories}
                  searchByCategory={searchByCategory}
                />
              </MainContent>
            )
          }
        ></Route>
        {productsRoutes}
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
      </Routes>
    </Site>
  );
}

export default App;
