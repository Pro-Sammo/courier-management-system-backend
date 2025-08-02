import AbstractRouter from "../../../abstract/abstract.router";
import AdminAuthController from "../controller/auth.user.controller";

export default class UserAuthRouter extends AbstractRouter {
  private controller = new AdminAuthController();
  constructor() {
    super();
    this.callRouter();
  }

  private callRouter() {
    //registration
    this.router
      .route("/registration")
      .post(
        this.uploader.cloudUploadRaw(this.fileFolders.USER_FILES),
        this.controller.registration
      );

    //login
    this.router.route("/login").post(this.controller.login);
  }
}
