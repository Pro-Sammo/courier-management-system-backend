"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const parcelSchema = new mongoose_1.Schema({
    customer: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    agent: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', default: null },
    pickupAddress: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
    parcelSize: { type: String, enum: ['small', 'medium', 'large'], required: true },
    parcelType: { type: String, enum: ['document', 'fragile', 'box', 'other'], required: true },
    paymentType: { type: String, enum: ['cod', 'prepaid'], required: true },
    status: {
        type: String,
        enum: ['Booked', 'Picked Up', 'In Transit', 'Delivered', 'Failed'],
        default: 'Booked'
    },
    location: {
        lat: Number,
        lng: Number,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Parcel', parcelSchema);
