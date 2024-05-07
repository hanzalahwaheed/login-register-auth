import jwt from "jsonwebtoken";

export const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ status: false, message: "no token" });
    }
    const decoded = jwt.verify(token, "jwtkey");
    if (decoded) next();
  } catch (error) {
    console.log("verifyUser", error);
  }
};
