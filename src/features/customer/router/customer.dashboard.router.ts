import AbstractRouter from "../../../abstract/abstract.router";
import { CustomerDashboardController } from "../controller/customer.dashboard.controller";

export class CustomerDashboardRouter  extends AbstractRouter{
    private controller = new CustomerDashboardController();

    constructor() {
        super();
        this.callRouter();
    }

    private callRouter(){
        this.router.route('/').get(this.controller.getDashboardData)
    }
}