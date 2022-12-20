import "../App.css";
import Site from "./Site";
import Navbar from "./Navbar";
import ProductCard from "./ProductCard";
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
import { v4 as uuidv4 } from "uuid";
import Dashboard from "./Dashboard";
import RequireAuth from "./RequireAuth";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import { useAuth } from "../contexts/AuthContext";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import Purchases from "./Purchases";

const App = () => {
  const [products, setProducts] = useState<Array<Product>>([]);
  const [currentCategory, setCurrentCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [categoryTitle, setCategoryTitle] = useState("All products");
  const [usersProducts, setUsersProducts] = useState<DocumentData>({
    products: [],
  });
  const [productAddedOrRemoved, setProductAddedOrRemoved] = useState(true);
  const [loadingCart, setLoadingCart] = useState(false);
  const { currentUser } = useAuth();

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingCart(true);
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUsersProducts(userSnap.data());
        }
      } catch (e) {
        setUsersProducts({ products: [] });
      }
      setLoadingCart(false);
    };
    fetchProducts();
  }, [currentUser, productAddedOrRemoved]);

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
        <ProductDetails
          product={el}
          products={products}
          usersProducts={usersProducts}
          setProductAddedOrRemoved={setProductAddedOrRemoved}
          key={uuidv4()}
        />
      }
    ></Route>
  ));

  return (
    //<AuthProvider>
    <Site>
      <Navbar
        categories={categories}
        products={products}
        searchByCategory={searchByCategory}
        quantityOfProducts={
          JSON.stringify(usersProducts) === JSON.stringify({})
            ? 0
            : usersProducts.products.length
        }
        usersProducts={usersProducts}
        setProductAddedOrRemoved={setProductAddedOrRemoved}
        loadingCart={loadingCart}
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
                    .map((el) => <ProductCard product={el} key={uuidv4()} />)
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
        <Route
          path="/purchases"
          element={
            <RequireAuth>
              <Purchases usersProducts={usersProducts} setProductAddedOrRemoved={setProductAddedOrRemoved}/>
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/update-profile"
          element={
            <RequireAuth>
              <UpdateProfile />
            </RequireAuth>
          }
        ></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
      </Routes>
    </Site>
    //</AuthProvider>
  );
};

export default App;
