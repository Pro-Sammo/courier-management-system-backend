"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_profile_router_1 = __importDefault(require("./router/admin.profile.router"));
const admin_agent_router_1 = require("./router/admin.agent.router");
const admin_parcel_router_1 = require("./router/admin.parcel.router");
const admin_user_router_1 = require("./router/admin.user.router");
const admin_dashboard_router_1 = require("./router/admin.dashboard.router");
class AdminRootRouter {
    constructor() {
        this.Router = (0, express_1.Router)();
        this.adminProfileRouter = new admin_profile_router_1.default();
        this.adminAgentRouter = new admin_agent_router_1.AdminAgentRouter();
        this.adminParcelRouter = new admin_parcel_router_1.AdminParcelRouter();
        this.adminUserRouter = new admin_user_router_1.AdminUserRouter();
        this.adminDashboardRouter = new admin_dashboard_router_1.AdminDashboardRouter();
        this.callRouter();
    }
    callRouter() {
        // profile router
        this.Router.use("/profile", this.adminProfileRouter.router);
        // agent router
        this.Router.use("/agent", this.adminAgentRouter.router);
        // parcel router
        this.Router.use("/parcel", this.adminParcelRouter.router);
        //user router
        this.Router.use('/user', this.adminUserRouter.router);
        //dashboard router
        this.Router.use("/dashboard", this.adminDashboardRouter.router);
    }
}
exports.default = AdminRootRouter;
