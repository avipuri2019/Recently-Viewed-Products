const express = require("express");
const { db } = require("../../config/firebase");

const authMiddleware = require("../../middleware/auth");
const { admin } = require("../../config/firebase");
const router = express.Router();


const {
  logProductView,
  getRecentlyViewedProducts,
} = require("../../contollers/recentlyViewedController");


/**
 * @swagger
 * /api/v1/users/{userId}/recentlyViewed:
 *   post:
 *     summary: Log a recently viewed product for a user
 *     tags: [Recently Viewed Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID of the product
 *     responses:
 *       200:
 *         description: Recently viewed product logged successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Recently viewed product logged successfully
 *       400:
 *         description: Bad request (e.g., missing productId or invalid userId)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Missing productId
 *       401:
 *         description: Unauthorized (e.g., invalid or missing auth token)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized
 */

// POST /api/v1/recentlyViewed
router.post("/users/:userId/recentlyViewed", authMiddleware, logProductView);

/**
 * @swagger
 * /api/v1/users/{userId}/recentlyViewed:
 *   get:
 *     summary: Get the list of recently viewed products for a user
 *     tags: [Recently Viewed Products]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The unique ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of recently viewed products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                 productId:
 *                   type: string
 *                 product:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     image:
 *                       type: string
 *                       format: uri
 *                     description:
 *                       type: string
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Invalid user ID or authorization token
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: No recently viewed products found for the user
 */

// GET /api/v1/recentlyViewed
router.get("/users/:userId/recentlyViewed",authMiddleware, getRecentlyViewedProducts);

/**
 * @swagger
 * /api/v1/signup:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: strongpassword123
 *               name:
 *                 type: string
 *                 example: John Doe
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     uid:
 *                       type: string
 *                       example: abc123xyz
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: user@example.com
 *                     name:
 *                       type: string
 *                       example: Avinash Puri
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-12-02T12:34:56Z
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Email is already in use
 */

// POST /api/v1/signup
router.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;

  try {
    // Create a new user in Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    // Prepare the user details for Firestore
    const userData = {
      uid: userRecord.uid,
      email: userRecord.email,
      name: name,
      createdAt: new Date().toISOString(),
    };

    // Store user details in Firestore
    await db.collection("users").doc(userRecord.uid).set(userData);

    res.status(201).json({
      message: "User created successfully",
      user: userData,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).json({ error: error.message });
  }
});

// Simple route to respond with text
router.get('/api/test', (req, res) => {
  res.send('This is a test response');
});


module.exports = router;
