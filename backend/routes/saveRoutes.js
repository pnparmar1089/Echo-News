const express = require("express");
const router = express.Router();
const saveController = require("../controllers/saveController");

router.post("/save", saveController.saveNews);
router.post("/delete", saveController.deleteNews);
router.get("/saved", saveController.saved);

module.exports = router;
