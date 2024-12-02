import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';  // For linking to product pages
import { db } from '../firebase';  // Import db (Firestore) correctly
import { collection, getDocs } from 'firebase/firestore';
import './Homepage.css';  // Ensure you add your CSS styles

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all products from Firestore
  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const productsList = querySnapshot.docs.map((doc) => doc.data());
    setProducts(productsList);
    setLoading(false)
  };


  // Fetch recently viewed products using API
  const fetchRecentlyViewedProducts = async () => {
    const userId = 'HqCWLhiRqtTL9PMkOwSxtym4kuK2'; 
    const token = localStorage.getItem('token');  

    try {
      const response = await fetch(`http://localhost:3001/api/v1/users/${userId}/recentlyViewed`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setRecentlyViewed(data.products);
    } catch (error) {
      console.error('Error fetching recently viewed products:', error);
    }
  };

  // Fetch both products and recently viewed when the component mounts
  useEffect(() => {
    fetchProducts();
    fetchRecentlyViewedProducts();
  }, []);

  return (
    <div className="homepage">
      <h1>All Products</h1>
      <div className="products-list">
        {loading ? (
          <p>Loading...</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <Link to={`/product/${product.id}`}>View Details</Link>
            </div>
          ))
        )}
      </div>

      <h2 className="recently-viewed-list-heading">Recently Viewed Products</h2>
      <div className="recently-viewed-list">
        {recentlyViewed.length === 0 ? (
          <p>No recently viewed products</p>
        ) : (
          recentlyViewed && recentlyViewed.map((product) => (
            <div key={product.product.productId} className="product-card">
              <img src={product.product.image} alt={product.name} />
              <h2>{product.product.name}</h2>
              <p>{product.product.description}</p>
              <Link to={`/product/${product.product.productId}`}>View Details</Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Homepage;
