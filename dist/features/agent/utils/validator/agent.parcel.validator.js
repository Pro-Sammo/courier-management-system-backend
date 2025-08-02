"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentParcelValidator = void 0;
const joi_1 = __importDefault(require("joi"));
class AgentParcelValidator {
    constructor() {
        this.updateParcelStatusValidator = joi_1.default.object({
            status: joi_1.default.string()
                .required()
                .valid("PICKED UP", "IN TRANSIT", "DELIVERED", "FAILED"),
            agent_note: joi_1.default.string().optional().allow("", null),
        });
        this.updateParcelStatusParamValidator = joi_1.default.object({
            id: joi_1.default.number().required(),
        });
    }
}
exports.AgentParcelValidator = AgentParcelValidator;
