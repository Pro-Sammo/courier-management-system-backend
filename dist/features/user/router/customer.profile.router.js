"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfileRouter = void 0;
const abstract_router_1 = __importDefault(require("../../../abstract/abstract.router"));
const customer_profile_controller_1 = require("../controller/customer.profile.controller");
class UserProfileRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.controller = new customer_profile_controller_1.CustomerProfileController();
        this.callRouter();
    }
    callRouter() {
        this.router.route("/").get(this.controller.getUserProfile);
    }
}
exports.UserProfileRouter = UserProfileRouter;
