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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product-grid" element={<ProductGridPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
  <Route path="/terms" element={<TermsAndConditions />} />
<Route path="/refund" element={<RefundPolicy />} />
<Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/cart" element={<CartPage/>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
