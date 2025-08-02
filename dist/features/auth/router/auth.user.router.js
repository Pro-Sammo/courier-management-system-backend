"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../../abstract/abstract.router"));
const auth_user_controller_1 = __importDefault(require("../controller/auth.user.controller"));
class UserAuthRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.controller = new auth_user_controller_1.default();
        this.callRouter();
    }
    callRouter() {
        //registration
        this.router
            .route("/registration")
            .post(this.uploader.cloudUploadRaw(this.fileFolders.USER_FILES), this.controller.registration);
        //login
        this.router.route("/login").post(this.controller.login);
    }
}
exports.default = UserAuthRouter;
