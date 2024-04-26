const Story = require("../models/Story");

const createStory = async (req, res, next) => {
  try {
    const { slides, createdBy } = req.body;
    if (!slides || !createdBy) {
      return res.status(400).json("Please provide all the required fields ");
    }

    const story = new Story({ slides, createdBy });
    await story.save();
    res.status(201).json({ sucess: true, story });
  } catch (error) {
    res.json({ errorMessage: "Something went wrong, Cannot create story" });
  }
};

module.exports = { createStory };
