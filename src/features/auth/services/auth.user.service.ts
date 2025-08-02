import { Request } from "express";
import AbstractServices from "../../../abstract/abstract.service";
import Lib from "../../../utils/lib/lib";
import { ROLE } from "../../../utils/miscellaneous/constants";
import config from "../../../app/config";
import { ILoginPayload } from "../utils/types/user.types";

class UserAuthService extends AbstractServices {

  //register user
  public async registerUser(req: Request) {
    return this.db.transaction(async (trx) => {
      const reqBody = req.body;
      const files = (req.files as Express.Multer.File[]) || [];

      if (files.length) {
        reqBody["photo"] = files[0].filename;
      }

      const { email, phone, password, ...rest } = reqBody;

      const userModel = this.Model.UserModel(trx);

      const checkUser = await userModel.getProfileDetails({
        email,
        phone,
      });

      if (checkUser.length) {
        if (checkUser[0].email === email) {
          return {
            success: false,
            code: this.StatusCode.HTTP_BAD_REQUEST,
            message: this.ResMsg.EMAIL_EXISTS,
          };
        } else if (checkUser[0].phone === phone) {
          return {
            success: false,
            code: this.StatusCode.HTTP_BAD_REQUEST,
            message: this.ResMsg.PHONE_EXISTS,
          };
        }
      }

      rest.email = email;
      rest.phone = phone;

      //hash password
      const hashedPass = await Lib.hashValue(password);

      //register user
      const registration = await userModel.registerUser({
        ...rest,
        password: hashedPass,
        role: ROLE.CUSTOMER,
      });

      //retrieve token data
      const tokenData = {
        id: registration[0].id,
        name: rest.name,
        email: rest.email,
        phone: rest.phone,
        photo: rest?.photo,
        role: ROLE.CUSTOMER,
        status: true,
        create_date: new Date(),
      };

      const token = Lib.createToken(tokenData, config.JWT_SECRET_USER, "48h");

      return {
        success: true,
        code: this.StatusCode.HTTP_SUCCESSFUL,
        message: this.ResMsg.USER_CREATED,
        data: tokenData,
        token,
      };
    });
  }


  //login
   public async loginUser(req: Request) {
    const { email, password } = req.body as ILoginPayload;
    const userModel = this.Model.UserModel();
    const checkUser = await userModel.getProfileDetails({ email });

    if (!checkUser.length) {
      return {
        success: false,
        code: this.StatusCode.HTTP_BAD_REQUEST,
        message: this.ResMsg.WRONG_CREDENTIALS,
      };
    }

    const { password: hashPass, ...rest } = checkUser[0];
    const checkPass = await Lib.compareHashValue(password, hashPass);

    if (!checkPass) {
      return {
        success: false,
        code: this.StatusCode.HTTP_BAD_REQUEST,
        message: this.ResMsg.WRONG_CREDENTIALS,
      };
    }

    if (rest.status === false) {
      return {
        success: false,
        code: this.StatusCode.HTTP_FORBIDDEN,
        message: 'Your account has been disabled',
      };
    }


     const tokenData = {
        id: rest.id,
        name: rest.name,
        email: rest.email,
        phone: rest.phone,
        photo: rest.photo,
        role: rest.role,
        status: rest.status,
      };


    const token = Lib.createToken(tokenData, config.JWT_SECRET_USER, '48h');
	
    return {
      success: true,
      code: this.StatusCode.HTTP_OK,
      message: this.ResMsg.LOGIN_SUCCESSFUL,
      data: rest,
      token,
    };
  }
}

export default UserAuthService;
