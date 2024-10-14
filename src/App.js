import React, { useState } from 'react';
import { products } from './data/data';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Cart from './components/Cart';
import './App.css'; 
import { MdRefresh } from 'react-icons/md'; 
import { FaCartPlus } from 'react-icons/fa'; 

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSize, setSelectedSize] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState({}); 

  const sizes = ["All", "S", "M", "L", "XL"]; 

  const handleCheckboxChange = (productId) => {
    setSelectedProducts(prev => ({
      ...prev,
      [productId]: !prev[productId], 
    }));
  };

  const handleAddToCart = () => {
    const newCart = Object.keys(selectedProducts).reduce((acc, productId) => {
      if (selectedProducts[productId]) {
        const product = products.find(p => p.id === productId);
        const quantity = parseInt(document.getElementById(`quantity-${productId}`).value) || 1;
        acc.push({ ...product, quantity });
      }
      return acc;
    }, []);
    
    setCart(newCart);
    setSelectedProducts({}); 
  };

  const handleReset = () => {
    setSelectedCategory('All');
    setSelectedSize('All');
    setSearchQuery('');
    setSelectedProducts({});
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSize = selectedSize === 'All' || product.size === selectedSize; // Adjust if you have size data
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSize && matchesSearch;
  });

  return (
    <Router>
      <div className="app-container">
        <h1>Clothing Store</h1>
        <div className="filter-search-container">
          <div className="filter-search-container-1">
            <select onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="All">All Categories</option>
              <option value="Hoodies">Hoodies</option>
              <option value="Shirts">Shirts</option>
              <option value="Jeans">Jeans</option>
            </select>
            <select onChange={(e) => setSelectedSize(e.target.value)}>
              {sizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
            <button onClick={handleReset}>
              <MdRefresh />
            </button>
          </div>
          <div>
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
            />
            <Link to="/cart">
              <button className="go-to-cart" onClick={handleAddToCart}>
                <FaCartPlus /> Add to Cart
              </button>
            </Link>
          </div>
        </div>

        {/* Routes */}
        <Routes>
          <Route 
            path="/" 
            element={
              <div className="product-table">
                <div className="product-row header">
                  <div className="column">Image</div>
                  <div className="column">Name</div>
                  <div className="column">Color</div>
                  <div className="column">Stock</div>
                  <div className="column">Price</div>
                  <div className="column">Buy</div>
                </div>
                {filteredProducts.map((product) => (
                  <div className="product-row" key={product.id}>
                    <div className="column">
                      <img src={product.img} alt={product.title} width="50" />
                    </div>
                    <div className="column">{product.title}</div>
                    <div className="column">{product.color}</div>
                    <div className="column">{product.stock}</div>
                    <div className="column">{product.newPrice}</div>
                    <div className="column">
                      <input 
                        type="number" 
                        min="1" 
                        id={`quantity-${product.id}`} 
                        defaultValue={1} 
                        style={{ width: '50px' }}
                      />
                      <button className="add-to-cart-btn" onClick={() => handleAddToCart(product.id)}>
                        <FaCartPlus />
                      </button>
                      <input 
                      style={{ width: '50px' }}
                        type="checkbox" 
                        checked={!!selectedProducts[product.id]} 
                        onChange={() => handleCheckboxChange(product.id)} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            }
          />
          <Route path="/cart" element={<Cart cartItems={cart} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
