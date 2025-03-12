const Joi = require("joi");

const signupSchema = Joi.object({
  username: Joi.string()
  .pattern(/^[a-zA-Z0-9_-]+$/)
  .min(3)
  .max(30)
  .required()
  .messages({
    "string.pattern.base": "\"username\" must only contain letters, numbers, hyphens, or underscores",
    "string.min": "\"username\" must be at least {#limit} characters long",
    "string.max": "\"username\" must be at most {#limit} characters long",
    "any.required": "\"username\" is required",
  }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "\"email\" must be a valid email address",
      "any.required": "\"email\" is required",
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      "string.min": "\"password\" must be at least {#limit} characters long",
      "any.required": "\"password\" is required",
    }),
    mobile: Joi.string()
    .pattern(/^\d{10}$/)
    .required()
    .messages({
      "string.pattern.base": '"mobile" must be a 10-digit number',
      "any.required": '"mobile" is required',
    }),
  role: Joi.string()
    .valid("user", "admin")
    .default("user")
    .messages({
      "any.only": "\"role\" must be either 'user' or 'admin'",
    }),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "\"email\" must be a valid email address",
      "any.required": "\"email\" is required",
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      "string.min": "\"password\" must be at least {#limit} characters long",
      "any.required": "\"password\" is required",
    }),
});

const jobSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(100)
    .messages({
      "string.min": "\"title\" must be at least {#limit} characters long",
      "string.max": "\"title\" must be at most {#limit} characters long",
      "any.required": "\"title\" is required",
    }),
  description: Joi.string()
    .min(10)
    .max(1000)
    .messages({
      "string.min": "\"description\" must be at least {#limit} characters long",
      "string.max": "\"description\" must be at most {#limit} characters long",
      "any.required": "\"description\" is required",
    }),
  location: Joi.string()
    .min(3)
    .max(100)
    .messages({
      "string.min": "\"location\" must be at least {#limit} characters long",
      "string.max": "\"location\" must be at most {#limit} characters long",
      "any.required": "\"location\" is required",
    }),
  salary: Joi.number()
    .positive()
    .messages({
      "number.positive": "\"salary\" must be a positive number",
      "any.required": "\"salary\" is required",
    }),
  company: Joi.string()
    .min(3)
    .max(100)
    .messages({
      "string.min": "\"company\" must be at least {#limit} characters long",
      "string.max": "\"company\" must be at most {#limit} characters long",
      "any.required": "\"company\" is required",
    }),
}).min(1);

const bookmarkSchema = Joi.object({
  jobId: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.integer": "\"jobId\" must be an integer",
      "number.positive": "\"jobId\" must be a positive number",
      "any.required": "\"jobId\" is required",
    }),
});

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(400).json({ errors: errorMessages });
  }
  next();
};

module.exports = {
  signupSchema,
  loginSchema,
  jobSchema,
  bookmarkSchema,
  validate,
};