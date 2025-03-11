const db = require("../models");

const createJob = async (req, res) => {
  try {
    const { title, description, location, salary, company } = req.body;

    const job = await db.Job.create({
      title,
      description,
      location,
      salary,
      company,
      userId: req.userId,
    });

    res.status(201).json({ message: "Job created successfully", job });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const jobs = await db.Job.findAll();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getJobById = async (req, res) => {
  try {
    const job = await db.Job.findByPk(req.params.id);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateJob = async (req, res) => {
  try {
    const job = await db.Job.findByPk(req.params.id);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    console.log("Job User ID:", job.userId);
    console.log("Logged-in User ID:", req.userId);


    if (job.userId !== req.userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await job.update(req.body);
    res.status(200).json({ message: "Job updated successfully", job });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteJob = async (req, res) => {
  try {
    const job = await db.Job.findByPk(req.params.id);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    console.log("Job User ID:", job.userId);
    console.log("Logged-in User ID:", req.userId);

    if (job.userId !== req.userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await job.destroy();
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createJob, getAllJobs, getJobById, updateJob, deleteJob };