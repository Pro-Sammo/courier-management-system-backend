"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminDashboardRouter = void 0;
const abstract_router_1 = __importDefault(require("../../../abstract/abstract.router"));
const admin_dashboard_controller_1 = require("../controller/admin.dashboard.controller");
class AdminDashboardRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.controller = new admin_dashboard_controller_1.AdminDashboardController();
        this.callRouter();
    }
    callRouter() {
        this.router.route("/").get(this.controller.getDashboradData);
    }
}
exports.AdminDashboardRouter = AdminDashboardRouter;
