"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const parcelStatusSchema = new mongoose_1.Schema({
    parcel: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Parcel', required: true },
    status: {
        type: String,
        enum: ['Booked', 'Picked Up', 'In Transit', 'Delivered', 'Failed'],
        required: true
    },
    updatedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    location: {
        lat: Number,
        lng: Number,
    },
    timestamp: { type: Date, default: Date.now },
});
exports.default = (0, mongoose_1.model)('ParcelStatus', parcelStatusSchema);
