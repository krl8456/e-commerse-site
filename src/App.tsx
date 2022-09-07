import './App.css';
import Site from './components/Site';
import Navbar from './components/Navbar';
import Products from './components/Products';
import Categories from './components/Categories';
import { useState, useEffect } from 'react';
function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>setProducts(json))
  }, []);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
            .then(res=>res.json())
            .then(json=>setCategories(json))
  }, [])
  
  return (
    <Site>
      <Navbar categories={categories}/>
      <Products products={products}/>
      <Categories categories={categories}/>
    </Site>
  );
}

export default App;
