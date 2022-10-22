import "../App.css";
import Site from "./Site";
import Navbar from "./Navbar";
import Products from "./ProductCard";
import Categories from "./Categories";
import MainContent from "./MainContent";
import ProductDetails from "./ProductDetails";
import ProductsContainer from "./ProductsContainer";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Product } from "../interfaces";
import { useState, useEffect, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { AuthProvider } from "../contexts/AuthContext";
import { v4 as uuidv4 } from "uuid";
import Dashboard from "./Dashboard";
import RequireAuth from "./RequireAuth";

const App = () => {
  const [products, setProducts] = useState<Array<Product>>([]);
  const [currentCategory, setCurrentCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [categoryTitle, setCategoryTitle] = useState("All products");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
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
      setCurrentCategory("");
      setCategoryTitle("All products");
      return;
    }
    setCurrentCategory(category);
    setCategoryTitle(`${category.charAt(0).toUpperCase() + category.slice(1)}`);
  };

  const currentProducts = useMemo(() => {
    return currentCategory !== ""
      ? products.filter((item) => item.category === currentCategory)
      : products;
  }, [products, currentCategory]);

  const productsRoutes = products.map((el) => (
    <Route
      path={`/products/${el.id}`}
      element={
        <ProductDetails product={el} products={products} key={uuidv4()} />
      }
    ></Route>
  ));

  return (
    <AuthProvider>
      <Site>
        <Navbar
          categories={categories}
          products={products}
          searchByCategory={searchByCategory}
        />
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
                  <ProductsContainer title={categoryTitle}>
                    {currentProducts
                      .map((el) => <Products product={el} key={uuidv4()} />)
                      .slice(0, 9)}
                  </ProductsContainer>
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
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          ></Route>
        </Routes>
      </Site>
    </AuthProvider>
  );
};

export default App;
