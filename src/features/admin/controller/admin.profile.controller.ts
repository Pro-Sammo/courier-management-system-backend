import { Request, Response } from "express";
import AbstractController from "../../../abstract/abstract.controller";
import AdminProfileService from "../services/admin.profile.service";

class AdminProfileController extends AbstractController {
  private service = new AdminProfileService();

  constructor() {
    super();
  }

  //get profile
  public getProfile = this.asyncWrapper.wrap(
    null,
    async (req: Request, res: Response) => {
      const { code, ...data } = await this.service.getProfile(req);
      res.status(code).json(data);
    }
  );



  

}

export default AdminProfileController;
