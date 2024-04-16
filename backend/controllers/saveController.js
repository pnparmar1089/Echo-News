const SaveModel = require("../models/Save");
const AuthModel = require("../models/Auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.saveNews = async (req, res) => {
  const user = await SaveModel.findOne({
    email: req.body.email,
    title: req.body.title,
  });

  if (!user) {
    try {
      await SaveModel.create({
        email: req.body.email,
        source_is: req.body.source_is,
        source_name: req.body.source_name,
        author: req.body.author,
        title: req.body.title,
        description: req.body.description,
        url: req.body.url,
        urlToImage: req.body.urlToImage,
        publishedAt: req.body.publishedAt,
        content: req.body.content,
      });
      res.json({ status: "ok", error: "saved!" });
    } catch (err) {
      res.json({ status: "error", error: "not save" });
    }
    
  } else {
    res.json( { status: "error", error: "alredy saved!" });
  }
};



exports.deleteNews = async (req, res) => {
  try {
    await SaveModel.deleteOne({
      email: req.body.email,
      _id: req.body.id,
    });
    res.json({ status: "ok", error: "News deleted successfully" });
  } catch (err) {
    res.json({ status: "error", error: "Failed to delete news" });
  }
};

exports.saved = async (req, res) => {
  const user = await AuthModel.findOne({
    token: req.headers["token"],
  });

  if (!user) {
    return res.json({ status: "error", user: false });
  } else {
    const decoded = jwt.verify(user.token, "secret123");
    const email = decoded.email;
    const news = await SaveModel.find({
      email: email,
    });
    return res.json({ status: "ok", news: news });
  }
  
};
