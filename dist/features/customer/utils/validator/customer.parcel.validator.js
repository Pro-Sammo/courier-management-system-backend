"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerParcelValidator = void 0;
const joi_1 = __importDefault(require("joi"));
class CustomerParcelValidator {
    constructor() {
        this.createParcelValidator = joi_1.default.object({
            sender_name: joi_1.default.string()
                .trim()
                .min(2)
                .max(100)
                .required()
                .label("Sender Name"),
            sender_phone: joi_1.default.string().required().label("Sender Phone"),
            pickup_address: joi_1.default.string().trim().required().label("Pickup Address"),
            receiver_name: joi_1.default.string()
                .trim()
                .min(2)
                .max(100)
                .required()
                .label("Receiver Name"),
            receiver_phone: joi_1.default.string().required().label("Receiver Phone"),
            delivery_address: joi_1.default.string().trim().required().label("Delivery Address"),
            parcel_type: joi_1.default.string()
                .valid("documents", "electronics", "fragile", "clothing", "food", "other")
                .required()
                .label("Parcel Type"),
            parcel_weight: joi_1.default.number()
                .positive()
                .precision(2)
                .required()
                .label("Parcel Weight (kg)"),
            parcel_description: joi_1.default.string()
                .max(500)
                .label("Parcel Description")
                .allow(""),
            payment_mode: joi_1.default.string()
                .valid("prepaid", "cod")
                .required()
                .label("Payment Mode"),
            amount: joi_1.default.number().positive().precision(2).optional().label("Amount"),
            is_paid: joi_1.default.boolean().optional().label("Is Paid"),
            delivery_lng: joi_1.default.number().required().label("Delivery Longitude"),
            delivery_lat: joi_1.default.number().required().label("Delivery Latitude"),
            pickup_lng: joi_1.default.number().required().label("Pickup Longitude"),
            pickup_lat: joi_1.default.number().required().label("Pickup Latitude"),
        });
        this.getParcelListQueryValidator = joi_1.default.object({
            limit: joi_1.default.number().optional(),
            skip: joi_1.default.number().optional(),
            status: joi_1.default.string().optional(),
            tracking_id: joi_1.default.string().optional(),
        });
        this.getSingleParcelValidator = joi_1.default.object({
            id: joi_1.default.number().required(),
        });
        this.getSingleParcelByTrackingIdValidator = joi_1.default.object({
            tracking_id: joi_1.default.string().required(),
        });
    }
}
exports.CustomerParcelValidator = CustomerParcelValidator;
