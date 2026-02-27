import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiRefreshCcw, FiLoader, FiShoppingBag } from "react-icons/fi";
import "./styles.css";

export default function LoadMore() {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const fetchProducts = useCallback(async (currentSkip) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=8&skip=${currentSkip}`
      );
      const data = await response.json();
      if (data && data.products) {
        setProducts(prev => currentSkip === 0 ? data.products : [...prev, ...data.products]);
        setTotal(data.total);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(0);
  }, [fetchProducts]);

  const handleLoadMore = () => {
    const nextSkip = skip + 8;
    setSkip(nextSkip);
    fetchProducts(nextSkip);
  };

  const handleReset = () => {
    setSkip(0);
    fetchProducts(0);
  };

  return (
    <div className="lab-widget-container bento-load-more">
      <div className="widget-header-row">
        <div className="header-stack">
          <h4 className="widget-title">Infinite Grid Explorer</h4>
          <span className="count-label">Showing {products.length} of {total} items</span>
        </div>
        <button 
          className="refresh-icon-btn" 
          onClick={handleReset} 
          disabled={loading}
          title="Reset Grid"
        >
          <FiRefreshCcw className={loading && skip === 0 ? "spin" : ""} />
        </button>
      </div>

      <div className="products-grid">
        <AnimatePresence mode="popLayout">
          {products.map((item, index) => (
            <motion.div
              key={`${item.id}-${index}`}
              layout
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                duration: 0.3, 
                delay: (index % 8) * 0.05,
                type: "spring",
                stiffness: 260,
                damping: 20
              }}
              className="product-card"
            >
              <div className="product-img-wrapper">
                <img src={item.thumbnail} alt={item.title} />
                <div className="product-tag">${item.price}</div>
              </div>
              <div className="product-info">
                <h5>{item.title}</h5>
                <p>{item.category}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="load-more-footer">
        {products.length < total ? (
          <button 
            className="load-btn" 
            onClick={handleLoadMore} 
            disabled={loading}
          >
            {loading ? (
              <><FiLoader className="spin" /> Loading...</>
            ) : (
              <><FiPlus /> Load More Products</>
            )}
          </button>
        ) : (
          <div className="end-message">
            <FiShoppingBag />
            <span>You've reached the end of the catalog</span>
            <button className="text-reset-btn" onClick={handleReset}>Start Over</button>
          </div>
        )}
      </div>
    </div>
  );
}
