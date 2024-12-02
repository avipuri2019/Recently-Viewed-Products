// src/ProductPage.js
import React, { useState, useEffect,useRef } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';  
import { doc, getDoc } from 'firebase/firestore';
import { trackRecentlyViewedProduct } from '../apiService'; // Import the function



function ProductPage() {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();

  const userId = localStorage.getItem('uid')
  const token = localStorage.getItem('token')
  const isInitialRender = useRef(true); 

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, 'products', productId);  
      const docSnap = await getDoc(docRef);  

      if (docSnap.exists()) {
        setProduct(docSnap.data());  
      } else {
        console.log("No such document!");
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    console.log("run track")
    // Prevent double execution in development mode
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    if (userId && productId && token) {
      trackRecentlyViewedProduct(userId, productId, token);
    }
  }, [userId, productId, token]);

  return (
    <div className="product-page">
      {product ? (
        <div className="product-container">
          <div className="product-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-details">
            <h1>{product.name}</h1>
            <p>{product.description}</p>
          </div>
        </div>
      ) : (
        <p>Loading product...</p>
      )}
    </div>
  );
}

export default ProductPage;
