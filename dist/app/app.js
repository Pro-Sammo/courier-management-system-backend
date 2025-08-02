"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const errorHandler_1 = __importDefault(require("../middleware/errorHandler/errorHandler"));
const customError_1 = __importDefault(require("../utils/lib/customError"));
const constants_1 = require("../utils/miscellaneous/constants");
const router_1 = __importDefault(require("./router"));
const socket_1 = require("./socket");
const ioInjector_1 = require("../middleware/ioInjector/ioInjector");
const rootModel_1 = __importDefault(require("../models/rootModel"));
class App {
    constructor(port) {
        this.app = (0, express_1.default)();
        this.origin = constants_1.origin;
        this.server = (0, socket_1.SocketServer)(this.app);
        this.port = port;
        this.initMiddleware();
        this.initRouters();
        this.socket();
        this.runCron();
        this.notFoundRouter();
        this.errorHandle();
        this.disableXPoweredBy();
    }
    // Run cron jobs
    runCron() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    //start server
    startServer() {
        return __awaiter(this, void 0, void 0, function* () {
            this.server.listen(this.port, () => {
                console.log(`Courier management server has started successfully at port: ${this.port}...🚀`);
            });
        });
    }
    //init middleware
    initMiddleware() {
        this.app.use(express_1.default.json({ limit: "2mb" }));
        this.app.use(express_1.default.urlencoded({ limit: "2mb", extended: true }));
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use((0, cors_1.default)({ origin: this.origin, credentials: true }));
        this.app.use(ioInjector_1.ioInjector);
    }
    // socket connection
    socket() {
        const userSocketMap = new Map();
        socket_1.io.on("connection", (socket) => {
            const userId = socket.handshake.auth.userId;
            const role = socket.handshake.auth.userRole;
            console.log("✅ New client connected: ", socket.id);
            if (userId) {
                userSocketMap.set(userId, socket.id);
            }
            socket.on("update-agent-location", (_a) => __awaiter(this, [_a], void 0, function* ({ location, timestamp }) {
                const agentId = userId;
                console.log("A agent started to share live location->", agentId);
                const parcelModel = new rootModel_1.default().ParcelModel();
                const assignedParcels = yield parcelModel.getParcelsByAgent({
                    agent_id: agentId,
                });
                assignedParcels.forEach(({ customer_id }) => {
                    const targetSocketId = userSocketMap.get(Number(customer_id));
                    if (targetSocketId) {
                        socket_1.io.to(targetSocketId).emit(`agent-location:${agentId}`, {
                            location,
                            timestamp,
                        });
                    }
                });
            }));
            socket.on("disconnect", () => {
                console.log("❌ Client disconnected: ", socket.id);
                for (const [uid, sid] of userSocketMap.entries()) {
                    if (sid === socket.id) {
                        userSocketMap.delete(uid);
                        break;
                    }
                }
            });
        });
    }
    // init routers
    initRouters() {
        this.app.get("/", (_req, res) => {
            res.send(`Courier management server is running successfully..🚀`);
        });
        this.app.get("/api", (_req, res) => {
            res.send(`Courier management API is active...🚀`);
        });
        this.app.use("/api/v1", new router_1.default().Router);
    }
    // not found router
    notFoundRouter() {
        this.app.use("*", (_req, _res, next) => {
            next(new customError_1.default("Cannot found the route", 404));
        });
    }
    // error handler
    errorHandle() {
        this.app.use(new errorHandler_1.default().handleErrors);
    }
    //disable x-powered-by
    disableXPoweredBy() {
        this.app.disable("x-powered-by");
    }
}
exports.default = App;
