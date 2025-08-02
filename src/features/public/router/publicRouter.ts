import AbstractRouter from "../../../abstract/abstract.router";
import PublicController from "../controller/publicController";
class PublicRouter extends AbstractRouter {
  private Controller = new PublicController();

  constructor() {
    super();
    this.callRouter();
  }

  private callRouter() {
    // send email otp router
    
  }
}

export default PublicRouter;
