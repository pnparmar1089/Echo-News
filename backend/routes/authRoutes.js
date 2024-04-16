const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");


router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/deletAuth", authController.logout);
router.get("/checkAuth", authController.checkAuth);
module.exports = router;
