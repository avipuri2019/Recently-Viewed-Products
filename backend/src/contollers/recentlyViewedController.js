const { db } = require("../config/firebase");
const redisClient = require("../config/redis");
const sendNotificationEmail = require("../utils/emailNotifier");
const logProductView = async (req, res) => {
  const { productId } = req.body;
  const userId = req.userId;

  if (!productId) {
    return res.status(400).json({ error: "Missing productId" });
  }

  try {
    const recentlyViewedRef = db.collection("recentlyViewed");
    
    // Check if the product already exists for this user
    const existingProductView = await recentlyViewedRef
      .where("userId", "==", userId)
      .where("productId", "==", productId)
      .get();

      const timeframe = 24 * 60 * 60 * 1000;
      const startTime = new Date(Date.now() - timeframe);
  
      const viewsSnapshot = await db
        .collection('recentlyViewed')
        .where('productId', '==', productId)
        .where('updated_at', '>=', startTime)
        .get();
        console.log(startTime)
        console.log(productId)
        console.log(viewsSnapshot.size)
        if (viewsSnapshot.size > 2) {
          console.log(`Product ${productId} viewed more than twice! Sending email...`);
          // send_mail = true;
          const userDoc = await db.collection('users').doc(userId).get();
          const productDoc = await db.collection('products').doc(productId).get();
          if (!productDoc.exists || !userDoc.exists) {
            console.error('Product or User not found!');
            return null;
          }

          const product = productDoc.data();
          const user = userDoc.data();

          try {
            await sendNotificationEmail(user.email,product);
            console.log('Email sent successfully!');
          } catch (error) {
            console.error('Error sending email:', error);
          }
        }
        
    if (!existingProductView.empty) {
      // If product already exists, just update the timestamp
      const productDoc = existingProductView.docs[0];
      await productDoc.ref.update({ updated_at: new Date().toISOString() });
    } else {
      // If it's a new product, add it to the collection
      await recentlyViewedRef.add({
        userId,
        productId,
        updated_at: new Date().toISOString(),
      });

      // Limit to 10 products per user
      const userRecentProducts = await recentlyViewedRef
        .where("userId", "==", userId)
        .orderBy("updated_at", "desc")
        .get();

      if (userRecentProducts.size > 10) {
        // Delete older products
        const docsToDelete = userRecentProducts.docs.slice(10);
        for (const doc of docsToDelete) {
          await doc.ref.delete();
        }
      }
    }

    // Optionally update Redis cache
    const recentProducts = await recentlyViewedRef
      .where("userId", "==", userId)
      .orderBy("updated_at", "desc")
      .limit(10)
      .get();

    const products = recentProducts.docs.map((doc) => doc.data());

    const productsWithDetails =  await getProductsDetails(products);
    
   
    await redisClient.set(`recentlyViewed:${userId}`, JSON.stringify(productsWithDetails), {
      EX: 60 * 5, // Cache expiration time (5 minutes)
    });

    res.status(200).json({ message: "Product logged successfully" });
  } catch (error) {
    console.error("Error logging product view:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getRecentlyViewedProducts = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: "Missing userId" });
  }

  try {
    // Check Redis for cached data
    const cachedData = await redisClient.get(`recentlyViewed:${userId}`);
    // console.log(JSON.parse(cachedData).length)
    if (cachedData && JSON.parse(cachedData).length > 0) {
      console.log("cached data..")
      return res.status(200).json({ products: JSON.parse(cachedData) });
    }

    const recentlyViewedRef = db.collection("recentlyViewed");

    // Fetch recently viewed products for the user
    const querySnapshot = await recentlyViewedRef
      .where("userId", "==", userId)
      .orderBy("updated_at", "desc")
      .limit(10)
      .get();

    if (querySnapshot.empty) {
      return res.status(200).json({ products: [] });
    }

    // Extract product IDs
    const recentlyViewed = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      productId: doc.data().productId,
    }));
    // console.log(recentlyViewed)
    const productsWithDetails =  await getProductsDetails(recentlyViewed);
    // console.log(productsWithDetails)
    

    // Cache the result in Redis for 10 minutes
    await redisClient.setEx(
      `recentlyViewed:${userId}`,
      600, // TTL in seconds
      JSON.stringify(productsWithDetails)
    );

    res.status(200).json({ products: productsWithDetails });
  } catch (error) {
    console.error("Error fetching recently viewed products:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getProductsDetails = async (recentlyViewed) => {
  const productIds = recentlyViewed.map((item) => item.productId);

  // Fetch product details using the product IDs
  const productRefs = productIds.map((productId) => db.collection("products").doc(productId));
  const productSnapshots = await Promise.all(productRefs.map((ref) => ref.get()));

  // Extract product details
  const productDetails = productSnapshots
    .filter((snapshot) => snapshot.exists)
    .map((snapshot) => ({
      productId: snapshot.id,
      ...snapshot.data(),
    }));

  // Combine recently viewed data with product details
  return recentlyViewed.map((viewed) => ({
    ...viewed,
    product: productDetails.find((product) => product.productId === viewed.productId) || null,
  }));
};
module.exports = { logProductView,getRecentlyViewedProducts };
