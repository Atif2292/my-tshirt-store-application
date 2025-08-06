import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import tshirts from '../data';
import anime from '../animeData';
import oneliner from '../onelinerData';
import oversized from '../oversizedData';
import '../styles/ProductView.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ImageSlider from './ImageSlider';

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const topRef = useRef(null); // ✅ create a ref for the top of the page

  const allProducts = [...tshirts, ...anime, ...oneliner, ...oversized];
  const product = allProducts.find(t => t.id === id);

  const [cartItemCount, setCartItemCount] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('');

  // ✅ Scroll to top of page when ID changes
 useEffect(() => {
  if (topRef.current) {
    topRef.current.scrollIntoView({ behavior: 'auto' });
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  scrollToTop();
  setTimeout(scrollToTop, 100);
  setTimeout(scrollToTop, 300);
}, [id]);


  // ✅ Set default color
  useEffect(() => {
    if (product?.colors?.length) setSelectedColor(product.colors[0]);
  }, [product]);

  // ✅ Update cart count
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((t, item) => t + item.quantity, 0);
    setCartItemCount(count);
  }, [id]);

  const addToCart = () => {
    if (product.colors?.length && !selectedColor) {
      alert("Please select a color.");
      return;
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item =>
      item.id === product.id &&
      item.size === selectedSize &&
      item.color === selectedColor
    );

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        ...product,
        price: Number(product.price),
        quantity: 1,
        size: selectedSize,
        color: selectedColor,
        image: product.colorImages?.[selectedColor] || product.image
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart!');
    const count = cart.reduce((t, item) => t + item.quantity, 0);
    setCartItemCount(count);
  };

  if (!product) return <p>T-shirt not found!</p>;

  const imageToShow = product.colorImages?.[selectedColor] || product.image;
  const galleryImages = Array.isArray(product.galleryImages?.[selectedColor])
    ? product.galleryImages[selectedColor]
    : [imageToShow];

  return (
    <div ref={topRef} className="product-view"> {/* ✅ Attach ref here */}
      <ImageSlider images={galleryImages} />

      <div className="info">
        <h2>{product.name}</h2>
        <p className="price">₹{product.price}</p>

        {product.colors && (
          <div className="color-selector">
            <label>Select Color:</label>
            <div className="color-options">
              {product.colors.map(color => (
                <button
                  key={color}
                  className={`color-btn ${selectedColor === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color.toLowerCase() }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>
        )}

        <div className="size-selector">
          <label>Select Size:</label>
          <div className="size-options">
            {['S', 'M', 'L', 'XL'].map(size => (
              <button
                key={size}
                className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button className="add-to-cart-btn" onClick={addToCart}>Add to Cart</button>
        <button className="buy-btn" onClick={() => navigate('/cart')}>Go to Cart</button>
      </div>

      <div className="related-products">
        <h3>You May Also Like</h3>
        <div className="related-list">
          {allProducts.filter(p => p.id !== product.id).slice(0, 3).map(item => (
            <div key={item.id} className="related-item" onClick={() => navigate(`/product/${item.id}`)}>
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
              <span>₹{item.price}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="cart-icon" onClick={() => navigate('/cart')}>
        🛒 {cartItemCount > 0 && <span className="cart-item-count">{cartItemCount}</span>}
      </div>

      <button className='back1-btn' onClick={() => navigate('/product-grid')}>← Back to Products</button>
    </div>
  );
}

export default ProductPage;
