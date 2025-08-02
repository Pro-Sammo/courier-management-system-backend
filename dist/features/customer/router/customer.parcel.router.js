"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerParcelRouter = void 0;
const abstract_router_1 = __importDefault(require("../../../abstract/abstract.router"));
const customer_parcel_controller_1 = require("../controller/customer.parcel.controller");
class CustomerParcelRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.controller = new customer_parcel_controller_1.CustomerParcelController();
        this.callRouter();
    }
    callRouter() {
        this.router
            .route("/")
            .post(this.controller.createParcel)
            .get(this.controller.getParcelList);
        this.router.route("/track/:tracking_id").get(this.controller.trackParcel);
        this.router.route("/:id").get(this.controller.getSingleParcel);
    }
}
exports.CustomerParcelRouter = CustomerParcelRouter;
