const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");


router.post("/changepassword", profileController.changePassword);
router.post("/user_name", profileController.user_name);

module.exports = router;
