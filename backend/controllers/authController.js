const UserModel = require("../models/User");
const AuthModel = require("../models/Auth")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


exports.register = async (req, res) => {
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);
    await UserModel.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
    });
    res.json({ status: "ok", message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ status: "error", error: "Duplicate email" });
  }
};


exports.login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ status: "error", error: "Invalid login" });
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

    if (isPasswordValid) {
      const token = jwt.sign(
        {
          userId: user._id,
          email: user.email,
          name: user.name,
        },
        "secret123"
      );
        // console.log(token)
        await AuthModel.create({
          email: req.body.email,
          token: token,
        });
      return res.json({ status: "ok", token: token });
    } else {
      return res.json({ status: "error", error: "Invalid login" });
    }
  } catch (err) {
    // console.error("Login error:", err);
    return res.json({ status: "error", error: "Server error" });
  }
};


exports.logout = async (req, res) => {
          const dauth = await AuthModel.deleteMany({
            token: req.headers["token"],
          });
          // console.log(dauth)
          if (!dauth) {
            return res.json({ status: "error", user: false });
          } else {
            return res.json({ status: "ok" });
          }
        
};

exports.checkAuth = async (req, res) => {
  try {
    const user = await AuthModel.findOne({
      token: req.headers['token'],
    });
    // console.log(user)
    if (!user) {
      return res.json({ status: "error", user: false });
    } else {
      const decoded = jwt.verify(user.token, "secret123");
      const email = decoded.email;
      const name = decoded.name;
      return res.json({ status: "ok", email: email, name: name });
    }
  } catch (err) {
    // console.error("Check auth error:", err);
    return res.status(500).json({ status: "error", error: "Server error" });
  }
};