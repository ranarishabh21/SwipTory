const Story = require("../models/Story");
const User = require("../models/Users");

const addBookmark = async (req, res) => {
  try {
    let storyId = req.params.id;
    const { userId } = req.body;


    const user = await User.findById(userId);
    const story = await Story.findById(storyId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    if (user.bookmarks.includes(storyId)) {
      return res
        .status(400)
        .json({ message: "Story already bookmarked", bookmarked: true });
    }

    user.bookmarks.push(storyId);
    await user.save();

    story.bookmarks.push(userId);
    await story.save();

    res.status(200).json({
      message: "Story bookmarked successfully",
      bookmarks: user.bookmarks,
      bookmarked: true,
      story,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ Errormessage: "Error in bookmarking story" });
  }
};


module.exports = {addBookmark};