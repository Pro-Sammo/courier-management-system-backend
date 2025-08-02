"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAgentRouter = void 0;
const abstract_router_1 = __importDefault(require("../../../abstract/abstract.router"));
const admin_agent_controller_1 = require("../controller/admin.agent.controller");
class AdminAgentRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.controller = new admin_agent_controller_1.AdminAgentController();
        this.callRouter();
    }
    callRouter() {
        this.router.route("/").get(this.controller.getAgentList);
    }
}
exports.AdminAgentRouter = AdminAgentRouter;
