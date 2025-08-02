"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../../abstract/abstract.router"));
const agent_parcel_controller_1 = require("../controller/agent.parcel.controller");
class AgentParcelRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.controller = new agent_parcel_controller_1.AgentParcelController();
        this.callRouter();
    }
    callRouter() {
        this.router
            .route("/")
            .get(this.controller.getAssignedParcels);
        this.router.route("/update-status/:id").post(this.controller.updateParcelStatus);
    }
}
exports.default = AgentParcelRouter;
