import express from "express";
import User from "../userModel.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { limiter } from "../middlewares/rateLimiter.js";
import { verifyUser } from "../middlewares/verify.js";

const router = express.Router();

router.post("/register", limiter, async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });
  console.log(username);
  if (user) res.json("user already exists");
  else {
    await User.create({
      username,
      password,
      email,
    });
    res.json({ status: true, message: "User created" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) res.json("user doesnt exist");
    // implement bcrypt password comparison here
    const token = jwt.sign({ email: email }, "jwtkey", { expiresIn: "2hr" });
    res.cookie("token", token, { maxAge: 1000 * 60 * 60, httpOnly: true });
    res.json({ status: true, message: "login successful" });
  } catch (error) {
    console.log("login", error);
  }
});

router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) res.json("user doesnt exist");

    const token = jwt.sign({ email: user.email }, "jwtkey", {
      expiresIn: "1hr",
    });

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "seismic924@gmail.com",
        pass: "", //enter app password from google
      },
    });

    var mailOptions = {
      from: "seismic924@gmail.com",
      to: email,
      subject: "Password Reset Link",
      text: `http://localhost:5173/reset-password/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("error sending email", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.json({ status: true, message: "email sent" });
  } catch (error) {
    console.log("forgot-password", error);
  }
});

router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const decoded = jwt.verify(token, "jwtkey");
    const emailDecoded = decoded.email;
    await User.findOneAndUpdate(
      { email: emailDecoded },
      { password: password }
    );
    return res.status(200).json({
      status: true,
      message: "reset your password successful",
    });
  } catch (error) {
    res.json("invalid token", error);
  }
});

router.get("/verify", verifyUser, (req, res) => {
  return res.json({ status: true, message: "authorised" });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ status: true, message: "logged out" });
});

export default router;
