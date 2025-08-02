"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerDashboardRouter = void 0;
const abstract_router_1 = __importDefault(require("../../../abstract/abstract.router"));
const customer_dashboard_controller_1 = require("../controller/customer.dashboard.controller");
class CustomerDashboardRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.controller = new customer_dashboard_controller_1.CustomerDashboardController();
        this.callRouter();
    }
    callRouter() {
        this.router.route('/').get(this.controller.getDashboardData);
    }
}
exports.CustomerDashboardRouter = CustomerDashboardRouter;
