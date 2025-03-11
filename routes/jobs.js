const express = require("express");
const jobController = require("../controllers/jobController");
const authMiddleware = require("../middleware/authMiddleware");
const { jobSchema, validate } = require("../utils/validators");
const router = express.Router();

router.post("/", authMiddleware, validate(jobSchema), jobController.createJob);

router.get("/", jobController.getAllJobs);

router.get("/:id", jobController.getJobById);

router.put("/:id", authMiddleware, validate(jobSchema), jobController.updateJob);

router.delete("/:id", authMiddleware, jobController.deleteJob);

module.exports = router;