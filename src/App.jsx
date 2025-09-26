import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Products from './pages/Products';
import Home from './pages/Home';
import Category from './pages/Category';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import OrderConfirmation from './pages/OrderConfirmation';
import LoginPage from './pages/Login';
import Signup from './pages/Signup';
import { PRODUCTS } from './data/products';
import { parse } from 'postcss';
import CartProvider from "./context/CartContext";

export default function App(){
  const [cartItems, setCartItems] = useState(()=>JSON.parse(localStorage.getItem('demoCart')||'[]'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = sessionStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      console.log('User APP.jsx ', parsedUser)
    }
  }, []);

  return (
    <CartProvider>
      <Router basename="/aep-training">
        <Header user={user} setUser={setUser} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/category/:categoryId' element={<Category />} />
          <Route path='/product/:productId' element={<ProductDetail />} />
          <Route path='/cart' element={<Cart cartItems={cartItems} />} />
          <Route path='/checkout' element={<Checkout cartItems={cartItems} />} />
          {/* <Route path='/payment' element={<Payment onComplete={()=>{ clearCart(); }} />} /> */}
          <Route path='/order-confirmation/:orderId' element={<OrderConfirmation />} />
          <Route path='/signup' element={<Signup onSignup={(u)=>{ setUser(u); }} />} />
          <Route path='/login' element={<LoginPage setUser={setUser} />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
}