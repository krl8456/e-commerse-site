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
import { Product, User } from "../interfaces";
import { useState, useEffect, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { AuthProvider, useAuth } from "../contexts/AuthContext";

function App() {
  const [products, setProducts] = useState<Array<Product>>([]);
  // const [allProducts, setAllProducts] = useState<Array<Product>>([]);
  const [currentCategory, setCurrentCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [categoryTitle, setCategoryTitle] = useState("All products");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState(false); //zapisz auth w lacal storage !
  // const [users, setUsers] = useState<Array<User>>(JSON.parse(localStorage.getItem("users") || "[]") || []);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
        // setAllProducts(json);
        setLoadingProducts(false);
      });
  }, []);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((json) => setCategories(json));
  }, []);

  useEffect(() => {
    fetch("https://fakestoreapi.com/users")
      .then((res) => res.json())
      .then((json) => localStorage.setItem("users", JSON.stringify(json)));
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

  // const productComponents = products
  //   .map((el) => <Products product={el} />)
  //   .slice(0, 9);

  const productsRoutes = products.map((el) => (
    <Route
      path={`/products/${el.id}`}
      element={<ProductDetails product={el} products={products} />}
    ></Route>
  ));

  return (
    <AuthProvider>
      <Site>
        <Navbar
          categories={categories}
          products={products}
          searchByCategory={searchByCategory}
          auth={auth}
          username={username}
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
                      .map((el) => <Products product={el} />)
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
          <Route
            path="/signin"
            element={
              <SignIn
                username={username}
                password={password}
                setUsername={setUsername}
                setPassword={setPassword}
                setAuth={setAuth}
              />
            }
          ></Route>
          <Route path="/signup" element={<SignUp />}></Route>
        </Routes>
      </Site>
    </AuthProvider>
  );
}

export default App;
