import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protectRoute = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    console.log("Incoming Authorization Header:", authHeader); // DEBUG LINE

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "No authentication token, access denied" });
    }

    // const token = authHeader.replace("Bearer ", "").trim();
    const token = authHeader.split(" ")[1];
    console.log("🎯 Extracted token:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user)
      return res.status(401).json({ message: "No user found, access denied" });

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid authentication token" });
  }
};

export default protectRoute;
