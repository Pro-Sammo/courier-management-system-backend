"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const agentLocationSchema = new mongoose_1.Schema({
    agent: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    location: {
        lat: Number,
        lng: Number,
    },
    timestamp: { type: Date, default: Date.now },
});
exports.default = (0, mongoose_1.model)('AgentLocation', agentLocationSchema);
