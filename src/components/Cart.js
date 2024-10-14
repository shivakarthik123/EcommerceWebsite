import React from 'react';

const Cart = ({ cartItems }) => {
  const totalPrice = cartItems.reduce((total, item) => {
    const price = parseFloat(item.newPrice.replace('$', ''));
    return total + price * item.quantity;
  }, 0);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <div className="cart-boxes">
        <div className="selected-products">
          {cartItems.length === 0 ? (
            <p>No items in cart</p>
          ) : (
            <div className="cart-table-main">
              <div className="cart-table">
                {/* Header Row */}
                <div className="cart-row header">
                  <div>Image</div>
                  <div>Name</div>
                  <div>Price</div>
                  <div>Quantity</div>
                </div>
                {/* Cart Items */}
                {cartItems.map((item, index) => (
                  <div className="cart-row" key={index}>
                    <div>{item.img && <img src={item.img} alt={item.title} width="50" />}</div>
                    <div>{item.title}</div>
                    <div>{item.newPrice}</div>
                    <div>Quantity: {item.quantity}</div>
                  </div>
                ))}
              
            </div>
                <div className="cart-table-2">
                  <h1>Cart Totals</h1>

                  <div>
                  <h3> Subtotals</h3>
                  ${totalPrice.toFixed(2)}
                  </div>
                  

                  <hr></hr>
                  <div className="total-price">
                    <h3>Total: ${totalPrice.toFixed(2)}</h3>
                  </div>
                </div>
            </div>
          )}
        </div>

        <div className="empty-box">
          {/* This box is currently empty */}
        </div>
      </div>
    </div>
  );
};

export default Cart;
