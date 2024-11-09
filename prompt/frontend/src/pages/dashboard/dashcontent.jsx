import React, { useState, useEffect } from "react";
import { Search, ShoppingCart, X, Eye, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./dashcontent.css";

const DashContent = ({
  initialSearchQuery,
  isCartOpen,
  setIsCartOpen,
  cartRef,
  showAccount,
  setShowAccount
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [amazonProducts, setAmazonProducts] = useState([]);
  const [alibabaProducts, setAlibabaProducts] = useState([]);
  const [aliexpressProducts, setAliexpressProducts] = useState([]);
  const [ebayProducts, setEbayProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (initialSearchQuery) {
      handleSearch();
    }
  }, [initialSearchQuery]);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);
    setAmazonProducts([]);
    setAlibabaProducts([]);
    setAliexpressProducts([]);
    setEbayProducts([]);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/search?query=${encodeURIComponent(
          searchQuery
        )}`
      );
      setAmazonProducts(response.data.amazon || []);
      setAlibabaProducts(response.data.alibaba || []);
      setAliexpressProducts(response.data.aliexpress || []);
      setEbayProducts(response.data.ebay || []);

      if (!response.data.amazon.length && !response.data.alibaba.length &&
        !response.data.aliexpress.length && !response.data.ebay.length) {
        setError("No products found. Try a different search query.");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(
        `An error occurred while searching for products: ${error.response?.data?.error || error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
    setIsCartOpen(true);
  };

  const CartPanel = () => (
    <div ref={cartRef} className={`cart-panel ${isCartOpen ? "open" : ""}`}>
      <button className="close-cart" onClick={() => setIsCartOpen(false)}>
        <X size={24} />
      </button>
      <h2>Cart</h2>
      {cart.map((item, index) => (
        <div key={index} className="cart-item">
          <div className="cart-item-image">
            <img src={item.imageUrl} alt={item.title} />
          </div>
          <div className="cart-item-details">
            <h3>{item.title}</h3>
            <p>${item.price}</p>
            <p>Source: {item.source}</p>
          </div>
        </div>
      ))}
      <div className="cart-total">
        <h3>
          Total: $
          {cart
            .reduce((total, item) => total + parseFloat(item.price), 0)
            .toFixed(2)}
        </h3>
      </div>
    </div>
  );

  const renderProductRow = (products, source) => (
    <div className="product-row">
      <h2>{source.charAt(0).toUpperCase() + source.slice(1)} Products</h2>
      <div className="product-scroll">
        {products.map((product) => (
          <div key={`${source}-${product.id}`} className="product-card">
            <img src={product.imageUrl || 'placeholder-image-url.jpg'} alt={product.title} />
            <h3 className="product-title">{product.title}</h3>
            <p className="price">${product.price}</p>
            <p className="description">{product.description}</p>
            <div className="product-buttons">
              <button className="add-to-cart" onClick={() => addToCart(product)}>
                <ShoppingCart size={16} />
                Add to Cart
              </button>
              <Link
                to={`/product/${source}/${product.id}`}
                className="view-more"
              >
                <Eye size={16} />
                View More
              </Link>
            </div>
          </div>
        ))}
      </div>
      {products.length > 5 && (
        <Link to={`/products/${source}`} className="view-all">
          View All <ChevronRight size={16} />
        </Link>
      )}
    </div>
  );

  const AccountSection = () => (
    <div className="account-section">
      <h2>Account Settings</h2>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
        </div>
        <button type="submit" className="save-button">Save Changes</button>
      </form>
    </div>
  );

  return (
    <main className="dash-content">
      <div className="dashboard-container">
        <header>
          <form onSubmit={handleSearch} className="search-bar">
            <input
              className="search-input"
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">
              <Search size={20} />
            </button>
          </form>
        </header>
        <h1 className="dashboard-title">{showAccount ? "Account Settings" : "Dashboard"}</h1>
        {showAccount ? (
          <AccountSection />
        ) : (
          <>
            {loading && <p>Loading...</p>}
            {error && <p className="error-message">{error}</p>}
            {!loading && !error && (
              <div className="product-rows-container">
                {renderProductRow(amazonProducts, "amazon")}
                {renderProductRow(alibabaProducts, "alibaba")}
                {renderProductRow(aliexpressProducts, "aliexpress")}
                {renderProductRow(ebayProducts, "ebay")}
              </div>
            )}
          </>
        )}
        <CartPanel />
      </div>
    </main>
  );
};

export default DashContent;