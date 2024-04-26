const express = require("express");
const router = express.Router();
const storyController = require("../controllers/story");
const likeController = require("../controllers/likes")

router.post("/create", storyController.createStory);
router.put("/like/:id", likeController.addLike);





module.exports = router