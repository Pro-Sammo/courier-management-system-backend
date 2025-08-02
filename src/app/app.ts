import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import { Server } from "http";
import morgan from "morgan";
import ErrorHandler from "../middleware/errorHandler/errorHandler";
import CustomError from "../utils/lib/customError";
import { origin } from "../utils/miscellaneous/constants";
import RootRouter from "./router";
import { SocketServer, io } from "./socket";
import { ioInjector } from "../middleware/ioInjector/ioInjector";
import Models from "../models/rootModel";

class App {
  public app: Application = express();
  private server: Server;
  private port: number;
  private origin: string[] = origin;
  constructor(port: number) {
    this.server = SocketServer(this.app);
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
  private async runCron() {}

  //start server
  public async startServer() {
    this.server.listen(this.port, () => {
      console.log(
        `Courier management server has started successfully at port: ${this.port}...🚀`
      );
    });
  }

  //init middleware
  private initMiddleware() {
    this.app.use(express.json({ limit: "2mb" }));
    this.app.use(express.urlencoded({ limit: "2mb", extended: true }));
    this.app.use(morgan("dev"));
    this.app.use(cors({ origin: this.origin, credentials: true }));
    this.app.use(ioInjector);
  }

  // socket connection
  private socket() {
    const userSocketMap = new Map();
    io.on("connection", (socket) => {
      const userId = socket.handshake.auth.userId;
      const role = socket.handshake.auth.userRole;
      console.log("✅ New client connected: ", socket.id);
      if (userId) {
        userSocketMap.set(userId, socket.id);
      }

      socket.on("update-agent-location", async ({ location, timestamp }) => {
        const agentId = userId;
        console.log("A agent started to share live location->", agentId);
        const parcelModel = new Models().ParcelModel();
        const assignedParcels = await parcelModel.getParcelsByAgent({
          agent_id: agentId,
        });


        assignedParcels.forEach(({ customer_id }) => {
          
          const targetSocketId = userSocketMap.get(Number(customer_id));
          if (targetSocketId) {
            io.to(targetSocketId).emit(`agent-location:${agentId}`, {
              location,
              timestamp,
            });
          }
        });
      });

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
  private initRouters() {
    this.app.get("/", (_req: Request, res: Response) => {
      res.send(`Courier management server is running successfully..🚀`);
    });

    this.app.get("/api", (_req: Request, res: Response) => {
      res.send(`Courier management API is active...🚀`);
    });

    this.app.use("/api/v1", new RootRouter().Router);
  }

  // not found router
  private notFoundRouter() {
    this.app.use("*", (_req: Request, _res: Response, next: NextFunction) => {
      next(new CustomError("Cannot found the route", 404));
    });
  }

  // error handler
  private errorHandle() {
    this.app.use(new ErrorHandler().handleErrors);
  }

  //disable x-powered-by
  private disableXPoweredBy() {
    this.app.disable("x-powered-by");
  }
}

export default App;
