import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const priceToNumber = (price) => Number(String(price).replace('$', ''));

const CartItem = ({ onHomeClick, onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = cart.reduce((total, item) => total + priceToNumber(item.cost) * item.quantity, 0);

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckout = () => {
    alert('Coming Soon');
  };

  return (
    <div className="cart-page">
      <header className="navbar">
        <button className="brand-button" onClick={onHomeClick}>Paradise Nursery</button>
        <nav>
          <button onClick={onHomeClick}>Home</button>
          <button onClick={onContinueShopping}>Plants</button>
          <button className="cart-button">Cart 🛒 <span>{totalItems}</span></button>
        </nav>
      </header>

      <main className="cart-container">
        <h1>Shopping Cart</h1>
        <h2>Total number of plants: {totalItems}</h2>
        <h2>Total cart amount: ${totalAmount.toFixed(2)}</h2>

        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          <div className="cart-list">
            {cart.map((item) => {
              const itemTotal = priceToNumber(item.cost) * item.quantity;

              return (
                <article className="cart-item" key={item.name}>
                  <img className="cart-item-image" src={item.image} alt={item.name} />
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p>Unit price: {item.cost}</p>
                    <p>Total: ${itemTotal.toFixed(2)}</p>
                    <div className="cart-item-quantity">
                      <button onClick={() => handleDecrement(item)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleIncrement(item)}>+</button>
                    </div>
                    <button className="delete-button" onClick={() => handleRemove(item)}>Delete</button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <div className="cart-actions">
          <button className="primary-button" onClick={onContinueShopping}>Continue Shopping</button>
          <button className="primary-button" onClick={handleCheckout}>Checkout</button>
        </div>
      </main>
    </div>
  );
};

export default CartItem;
