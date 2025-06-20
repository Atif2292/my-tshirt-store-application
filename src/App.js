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
import OneLiners from './pages/OneLiners';
import OversizedPage from './pages/OversizedPage';
import AnimePage from './pages/AnimePage';
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
  <Route path="/order-summary" element={<OrderSummary />} />
        <Route path="/cart" element={<CartPage/>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
         <Route path="/oneliners" element={<OneLiners />} />
        <Route path="/oversized" element={<OversizedPage />} />
        <Route path="/anime" element={<AnimePage />} />
      </Routes>
    </Router>
  );
}

export default App;
