"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const agent_profile_router_1 = __importDefault(require("./router/agent.profile.router"));
const agent_parcel_router_1 = __importDefault(require("./router/agent.parcel.router"));
const agent_dashboard_router_1 = require("./router/agent.dashboard.router");
class AgentRootRouter {
    constructor() {
        this.Router = (0, express_1.Router)();
        this.agentProfileRouter = new agent_profile_router_1.default();
        this.agentParcelRouter = new agent_parcel_router_1.default();
        this.agentDashboardRouter = new agent_dashboard_router_1.AgentDashboardRouter();
        this.callRouter();
    }
    callRouter() {
        //profile router
        this.Router.use("/profile", this.agentProfileRouter.router);
        //agent router
        this.Router.use("/parcel", this.agentParcelRouter.router);
        //dashboard router
        this.Router.use("/dashboard", this.agentDashboardRouter.router);
    }
}
exports.default = AgentRootRouter;
