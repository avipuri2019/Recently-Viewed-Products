const { admin } = require("../config/firebase");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  //check for Bearer Token
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: Missing token" });
  }

  //Get Bearer Token
  const token = authHeader.split(" ")[1];
  try {
    //authentication
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.userId = decodedToken.uid;  // Add userId to request object
    next();
  } catch (error) {
    console.error("Error in authentication middleware:", error);
    return res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = authMiddleware;
