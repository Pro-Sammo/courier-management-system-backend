"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_user_router_1 = __importDefault(require("./router/auth.user.router"));
class AuthRootRouter {
    constructor() {
        this.userAuthRouter = new auth_user_router_1.default();
        this.AuthRouter = (0, express_1.Router)();
        this.callRouter();
    }
    callRouter() {
        this.AuthRouter.use("/user", this.userAuthRouter.router);
    }
}
exports.default = AuthRootRouter;
