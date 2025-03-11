const db = require("../models");

const bookmarkJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const bookmark = await db.Bookmark.create({
      userId: req.userId,
      jobId,
    });

    res.status(201).json({ message: "Job bookmarked successfully", bookmark });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBookmarkedJobs = async (req, res) => {
  try {
    const bookmarks = await db.Bookmark.findAll({
      where: { userId: req.userId },
      include: [{ model: db.Job, as: "Job" }],
    });

    res.status(200).json(bookmarks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { bookmarkJob, getBookmarkedJobs };