// apiService.js

// Function to track recently viewed products
export const trackRecentlyViewedProduct = async (userId, productId, token) => {
    try {
      const response = await fetch(`http://localhost:3001/api/v1/users/${userId}/recentlyViewed`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: productId,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Error tracking recently viewed product');
      }
  
      console.log('Product tracked as recently viewed:', data);
    } catch (error) {
      console.error('Error tracking recently viewed product:', error);
    }
  };
  