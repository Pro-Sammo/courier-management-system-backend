import { Router } from "express";
import AdminRootRouter from "../features/admin/adminRoot.router";
import AuthRootRouter from "../features/auth/authRoot.router";
import PublicRouter from "../features/public/router/publicRouter";
import AuthChecker from "../middleware/authChecker/authChecker";
import CustomerRootRouter from "../features/customer/customerRoot.router";
import AgentRootRouter from "../features/agent/agentRoot.router";

export default class RootRouter {
  public Router = Router();
  private publicRootRouter = new PublicRouter();
  private authRootRouter = new AuthRootRouter();
  private adminRootRouter = new AdminRootRouter();
  private customerRootRouter = new CustomerRootRouter();
  private agentRootRouter = new AgentRootRouter();

  // Auth checker
  private authChecker = new AuthChecker();
  constructor() {
    this.callRouter();
  }

  private callRouter() {
    // Public Routes
    this.Router.use("/public", this.publicRootRouter.router);

    // Auth Routes
    this.Router.use("/auth", this.authRootRouter.AuthRouter);

    // Admin Routes
    this.Router.use(
      "/admin",
      this.authChecker.adminAuthChecker,
      this.adminRootRouter.Router
    );

    //User Router
    this.Router.use(
      "/customer",
      this.authChecker.customerAuthChecker,
      this.customerRootRouter.Router
    );

    // // Agent Router
    this.Router.use(
      "/agent",
      this.authChecker.agentAuthChecker,
      this.agentRootRouter.Router
    );
  }
}
