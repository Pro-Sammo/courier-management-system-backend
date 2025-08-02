"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_controller_1 = __importDefault(require("../../../abstract/abstract.controller"));
const auth_admin_service_1 = __importDefault(require("../services/auth.admin.service"));
class AdminAuthController extends abstract_controller_1.default {
    constructor() {
        super();
        this.services = new auth_admin_service_1.default();
    }
}
exports.default = AdminAuthController;
