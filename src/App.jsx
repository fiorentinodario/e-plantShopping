import React, { useState } from 'react';
import ProductList from './ProductList';
import CartItem from './CartItem';
import AboutUs from './AboutUs';
import './App.css';

function App() {
  const [page, setPage] = useState('home');

  const goHome = () => setPage('home');
  const goPlants = () => setPage('plants');
  const goCart = () => setPage('cart');

  return (
    <div className="app-container">
      {page === 'home' && (
        <main className="landing-page">
          <div className="background-image"></div>
          <div className="landing-overlay">
            <section className="landing-content">
              <h1>Paradise Nursery</h1>
              <p className="tagline">Where Green Meets Serenity</p>
              <p>
                Welcome to Paradise Nursery, your destination for beautiful houseplants that bring freshness,
                calm, and natural style into every room.
              </p>
              <button className="primary-button" onClick={goPlants}>Get Started</button>
            </section>
            <AboutUs />
          </div>
        </main>
      )}

      {page === 'plants' && <ProductList onHomeClick={goHome} onCartClick={goCart} />}
      {page === 'cart' && <CartItem onHomeClick={goHome} onContinueShopping={goPlants} />}
    </div>
  );
}

export default App;
