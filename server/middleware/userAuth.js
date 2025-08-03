// This checks if token is present or not

import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token Absent! Please login again.",
    });
  }

  try {
    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!tokenDecoded) {
      return res.status(401).json({
        success: false,
        message: "Not authorized! Invalid token.",
      });
    }


    // req.body.userId = tokenDecoded.id;
    req.userId = tokenDecoded.id;
    // console.log(tokenDecoded);
    next();
  }
  catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token verification failed: " + error.message,
    });
  }
};

export default userAuth;
