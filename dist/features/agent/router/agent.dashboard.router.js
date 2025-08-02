"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentDashboardRouter = void 0;
const abstract_router_1 = __importDefault(require("../../../abstract/abstract.router"));
const agent_dashboard_controller_1 = require("../controller/agent.dashboard.controller");
class AgentDashboardRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.controller = new agent_dashboard_controller_1.AgentDashboardController();
        this.callRouter();
    }
    callRouter() {
        this.router.route("/").get(this.controller.getDashboardData);
    }
}
exports.AgentDashboardRouter = AgentDashboardRouter;
