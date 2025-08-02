"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminParcelRouter = void 0;
const abstract_router_1 = __importDefault(require("../../../abstract/abstract.router"));
const admin_parcel_controller_1 = require("../controller/admin.parcel.controller");
class AdminParcelRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.controller = new admin_parcel_controller_1.AdminParcelController();
        this.callRouter();
    }
    callRouter() {
        this.router.route("/").get(this.controller.getAdminPacelList);
        this.router
            .route("/assign-agent")
            .post(this.controller.assignAgentToParcel);
        this.router
            .route("/change-status")
            .post(this.controller.changeParcelStatus);
    }
}
exports.AdminParcelRouter = AdminParcelRouter;
