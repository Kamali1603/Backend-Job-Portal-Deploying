const express = require("express");
const bookmarkController = require("../controllers/bookmarkController");
const authMiddleware = require("../middleware/authMiddleware");
const { bookmarkSchema, validate } = require("../utils/validators");
const router = express.Router();

router.post("/:jobId", authMiddleware, validate(bookmarkSchema), bookmarkController.bookmarkJob);

router.get("/", authMiddleware, bookmarkController.getBookmarkedJobs);

module.exports = router;