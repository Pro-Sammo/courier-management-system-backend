"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ioInjector = void 0;
const socket_1 = require("../../app/socket");
const ioInjector = (req, res, next) => {
    req.io = socket_1.io;
    next();
};
exports.ioInjector = ioInjector;
