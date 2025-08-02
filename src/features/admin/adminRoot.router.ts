import { Router } from "express";
import AdminProfileRouter from "./router/admin.profile.router";
import { AdminAgentRouter } from "./router/admin.agent.router";
import { AdminParcelRouter } from "./router/admin.parcel.router";
import { AdminUserRouter } from "./router/admin.user.router";
import { AdminDashboardRouter } from "./router/admin.dashboard.router";

export default class AdminRootRouter {
	public Router = Router();
	private adminProfileRouter = new AdminProfileRouter();
	private adminAgentRouter = new AdminAgentRouter();
	private adminParcelRouter = new AdminParcelRouter();
	private adminUserRouter = new AdminUserRouter();
	private adminDashboardRouter = new AdminDashboardRouter();

	constructor() {
		this.callRouter();
	}

	private callRouter() {

		// profile router
		this.Router.use("/profile", this.adminProfileRouter.router);

		// agent router
		this.Router.use("/agent", this.adminAgentRouter.router);

		// parcel router
		this.Router.use("/parcel", this.adminParcelRouter.router);

		//user router
		this.Router.use('/user', this.adminUserRouter.router);

		//dashboard router
		this.Router.use("/dashboard", this.adminDashboardRouter.router);
	}
}
