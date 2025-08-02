"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUserValidator = void 0;
const joi_1 = __importDefault(require("joi"));
class AdminUserValidator {
    constructor() {
        this.updateUserRoleValidator = joi_1.default.object({
            user_id: joi_1.default.number().required(),
            role: joi_1.default.string().required().valid("agent", "customer", "admin"),
        });
        this.getAllUserListQueryValidator = joi_1.default.object({
            role: joi_1.default.string().optional(),
            filter: joi_1.default.string().optional().allow(''),
        });
    }
}
exports.AdminUserValidator = AdminUserValidator;
