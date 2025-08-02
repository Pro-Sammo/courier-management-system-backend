"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customer_profile_router_1 = require("./router/customer.profile.router");
class CustomerRootRouter {
    constructor() {
        this.Router = (0, express_1.Router)();
        this.userProfileRouter = new customer_profile_router_1.UserProfileRouter();
        this.callRouter();
    }
    callRouter() {
        // profile router
        this.Router.use("/profile", this.userProfileRouter.router);
    }
}
exports.default = CustomerRootRouter;
