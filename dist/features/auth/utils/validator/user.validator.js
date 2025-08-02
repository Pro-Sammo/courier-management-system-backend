"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidator = void 0;
const joi_1 = __importDefault(require("joi"));
class UserValidator {
    constructor() {
        this.registerValidator = joi_1.default.object({
            name: joi_1.default.string().min(2).max(100).required().messages({
                "string.base": "Name must be a string.",
                "string.empty": "Name is required.",
                "string.min": "Name must be at least 2 characters.",
                "string.max": "Name must not exceed 100 characters.",
                "any.required": "Name is required.",
            }),
            email: joi_1.default.string().email().required().messages({
                "string.base": "Email must be a string.",
                "string.empty": "Email is required.",
                "string.email": "Email must be a valid email address.",
                "any.required": "Email is required.",
            }),
            phone: joi_1.default.string()
                .pattern(/^[0-9]{10,15}$/)
                .required()
                .messages({
                "string.empty": "Phone number is required.",
                "string.pattern.base": "Phone number must be 10–15 digits long.",
                "any.required": "Phone number is required.",
            }),
            password: joi_1.default.string().min(6).required().messages({
                "string.base": "Password must be a string.",
                "string.empty": "Password is required.",
                "string.min": "Password must be at least 6 characters long.",
                "any.required": "Password is required.",
            }),
            role: joi_1.default.string().valid("customer", "agent").required(),
        });
        this.loginValidator = joi_1.default.object({
            email: joi_1.default.string().email().required().messages({
                "string.base": "Email must be a string.",
                "string.empty": "Email is required.",
                "string.email": "Email must be a valid email address.",
                "any.required": "Email is required.",
            }),
            password: joi_1.default.string().required().messages({
                "string.base": "Password must be a string.",
                "string.empty": "Password is required.",
                "any.required": "Password is required.",
            }),
        });
    }
}
exports.UserValidator = UserValidator;
