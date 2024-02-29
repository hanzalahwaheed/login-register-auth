import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import User from "./userModel.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import nodemailer from "nodemailer";
import rateLimit from "express-rate-limit";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // maximum number of requests allowed in the windowMs
  message: "Too many requests, please try again later.",
});

// establish mongoose connection
mongoose
  .connect("")
  .then(app.listen(5000, () => console.log("server started")))
  .catch((err) => console.log(err));

// controllers
app.post("/auth/register", limiter, async (req, res) => {
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

app.post("/auth/login", async (req, res) => {
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

app.post("/auth/forgot-password", async (req, res) => {
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

app.post("/auth/reset-password/:token", async (req, res) => {
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

const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ status: false, message: "no token" });
    }
    const decoded = jwt.verify(token, "jwtkey");
    console.log(decoded);
    if (decoded) next();
  } catch (error) {
    console.log("verifyUser", error);
  }
};

app.get("/auth/verify", verifyUser, (req, res) => {
  return res.json({ status: true, message: "authorised" });
});

app.get("/auth/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ status: true, message: "logged out" });
});
