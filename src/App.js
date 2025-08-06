// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import './App.css';
import ProductGridPage from './components/ProductGridPage';
import Contact from './pages/Contact';
import About from './pages/About';
import CartPage from './pages/CartPage';
import TermsAndConditions from "./pages/TermsAndConditions";
import RefundPolicy from "./pages/ RefundPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import OrderSummary from './pages/OrderSummary';

import anime from './animeData.js';
import oversized from './oversizedData.js';
import oneliner from './onelinerData.js';
import ProductGridCategory from './pages/ProductGridCategory';
import { useEffect } from 'react';
function App() {

  useEffect(() => {
  window.history.scrollRestoration = 'manual';
}, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product-grid" element={<ProductGridPage />} />
        < Route path="/product/category/:id" element={<ProductPage />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/refund" element={<RefundPolicy />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/order-summary" element={<OrderSummary />} />
        <Route path="/cart" element={<CartPage/>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/order-summary" element={<OrderSummary />} />
        <Route path="/anime" element={<ProductGridCategory title="Anime" data={anime} />} />
        <Route path="/oneliners" element={<ProductGridCategory title="One Liners" data={oneliner} />} />
        <Route path="/oversized" element={<ProductGridCategory title="Oversized" data={oversized} />} />


      </Routes>
    </Router>
  );
}

export default App;
