"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUserRouter = void 0;
const abstract_router_1 = __importDefault(require("../../../abstract/abstract.router"));
const admin_user_controller_1 = require("../controller/admin.user.controller");
class AdminUserRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.controller = new admin_user_controller_1.AdminUserController();
        this.callRouter();
    }
    callRouter() {
        this.router.route("/").get(this.controller.getAllUserList);
        this.router.route("/update-role").post(this.controller.updateUserRole);
    }
}
exports.AdminUserRouter = AdminUserRouter;
