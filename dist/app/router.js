"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminRoot_router_1 = __importDefault(require("../features/admin/adminRoot.router"));
const authRoot_router_1 = __importDefault(require("../features/auth/authRoot.router"));
const publicRouter_1 = __importDefault(require("../features/public/router/publicRouter"));
const authChecker_1 = __importDefault(require("../middleware/authChecker/authChecker"));
const customerRoot_router_1 = __importDefault(require("../features/customer/customerRoot.router"));
const agentRoot_router_1 = __importDefault(require("../features/agent/agentRoot.router"));
class RootRouter {
    constructor() {
        this.Router = (0, express_1.Router)();
        this.publicRootRouter = new publicRouter_1.default();
        this.authRootRouter = new authRoot_router_1.default();
        this.adminRootRouter = new adminRoot_router_1.default();
        this.customerRootRouter = new customerRoot_router_1.default();
        this.agentRootRouter = new agentRoot_router_1.default();
        // Auth checker
        this.authChecker = new authChecker_1.default();
        this.callRouter();
    }
    callRouter() {
        // Public Routes
        this.Router.use("/public", this.publicRootRouter.router);
        // Auth Routes
        this.Router.use("/auth", this.authRootRouter.AuthRouter);
        // Admin Routes
        this.Router.use("/admin", this.authChecker.adminAuthChecker, this.adminRootRouter.Router);
        //User Router
        this.Router.use("/customer", this.authChecker.customerAuthChecker, this.customerRootRouter.Router);
        // // Agent Router
        this.Router.use("/agent", this.authChecker.agentAuthChecker, this.agentRootRouter.Router);
    }
}
exports.default = RootRouter;
