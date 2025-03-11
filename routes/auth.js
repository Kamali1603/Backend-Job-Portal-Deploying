const express = require("express");
const authController = require("../controllers/authController");
const { signupSchema, loginSchema, validate } = require("../utils/validators");
const router = express.Router();

router.post("/signup", validate(signupSchema), authController.signup);

router.post("/login", validate(loginSchema), authController.login);

module.exports = router;