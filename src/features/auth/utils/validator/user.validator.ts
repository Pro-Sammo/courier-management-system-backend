import Joi from "joi";

export class UserValidator {
  public registerValidator = Joi.object({
    name: Joi.string().min(2).max(100).required().messages({
      "string.base": "Name must be a string.",
      "string.empty": "Name is required.",
      "string.min": "Name must be at least 2 characters.",
      "string.max": "Name must not exceed 100 characters.",
      "any.required": "Name is required.",
    }),

    email: Joi.string().email().required().messages({
      "string.base": "Email must be a string.",
      "string.empty": "Email is required.",
      "string.email": "Email must be a valid email address.",
      "any.required": "Email is required.",
    }),

    phone: Joi.string()
      .pattern(/^[0-9]{10,15}$/)
      .required()
      .messages({
        "string.empty": "Phone number is required.",
        "string.pattern.base": "Phone number must be 10–15 digits long.",
        "any.required": "Phone number is required.",
      }),

    password: Joi.string().min(6).required().messages({
      "string.base": "Password must be a string.",
      "string.empty": "Password is required.",
      "string.min": "Password must be at least 6 characters long.",
      "any.required": "Password is required.",
    }),
    role: Joi.string().valid("customer", "agent").required(),
  });


  public loginValidator = Joi.object({
    email: Joi.string().email().required().messages({
      "string.base": "Email must be a string.",
      "string.empty": "Email is required.",
      "string.email": "Email must be a valid email address.",
      "any.required": "Email is required.",
    }),
    password: Joi.string().required().messages({
      "string.base": "Password must be a string.",
      "string.empty": "Password is required.",
      "any.required": "Password is required.",
    }),
  })
}
