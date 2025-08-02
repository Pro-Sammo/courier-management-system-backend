"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customer_profile_router_1 = require("./router/customer.profile.router");
const customer_parcel_router_1 = require("./router/customer.parcel.router");
const customer_dashboard_router_1 = require("./router/customer.dashboard.router");
class CustomerRootRouter {
    constructor() {
        this.Router = (0, express_1.Router)();
        this.CustomerProfileRouter = new customer_profile_router_1.CustomerProfileRouter();
        this.CustomerParcelRouter = new customer_parcel_router_1.CustomerParcelRouter();
        this.CustomerDashboardRouter = new customer_dashboard_router_1.CustomerDashboardRouter();
        this.callRouter();
    }
    callRouter() {
        // profile router
        this.Router.use("/profile", this.CustomerProfileRouter.router);
        // parcel router
        this.Router.use("/parcel", this.CustomerParcelRouter.router);
        //dashboard
        this.Router.use("/dashboard", this.CustomerDashboardRouter.router);
    }
}
exports.default = CustomerRootRouter;
