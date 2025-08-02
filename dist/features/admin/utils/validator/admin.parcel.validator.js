"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminParcelValidator = void 0;
const joi_1 = __importDefault(require("joi"));
class AdminParcelValidator {
    constructor() {
        this.getAdminPacelListQueryValidator = joi_1.default.object({
            status: joi_1.default.string().optional(),
            tracking_id: joi_1.default.string().optional(),
            limit: joi_1.default.number().optional(),
            skip: joi_1.default.number().optional(),
        });
        this.assignAgentToParcelValidator = joi_1.default.object({
            parcel_id: joi_1.default.number().required(),
            agent_id: joi_1.default.number().required(),
        });
        this.changeParcelStatusValidator = joi_1.default.object({
            parcel_id: joi_1.default.number().required(),
            status: joi_1.default.string().required(),
        });
    }
}
exports.AdminParcelValidator = AdminParcelValidator;
