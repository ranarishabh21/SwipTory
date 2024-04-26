const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const bookmarkController = require("../controllers/bookmarks")

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/logout", authController.logoutUser);



router.post("/bookmark/:id", bookmarkController.addBookmark);




module.exports = router;
