"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../../abstract/abstract.router"));
const admin_profile_controller_1 = __importDefault(require("../controller/admin.profile.controller"));
class AdminProfileRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.controller = new admin_profile_controller_1.default();
        this.callRouter();
    }
    callRouter() {
        this.router
            .route("/")
            .get(this.controller.getProfile);
    }
}
exports.default = AdminProfileRouter;
