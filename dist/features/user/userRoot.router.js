"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profile_router_1 = require("./router/profile.router");
class CustomerRootRouter {
    constructor() {
        this.Router = (0, express_1.Router)();
        this.userProfileRouter = new profile_router_1.UserProfileRouter();
        this.callRouter();
    }
    callRouter() {
        // profile router
        this.Router.use("/profile", this.userProfileRouter.router);
    }
}
exports.default = CustomerRootRouter;
