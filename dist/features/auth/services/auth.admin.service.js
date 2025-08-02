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
const abstract_service_1 = __importDefault(require("../../../abstract/abstract.service"));
class AdminAuthService extends abstract_service_1.default {
    //login
    loginService(req) {
        return __awaiter(this, void 0, void 0, function* () {
            // const { email, password } = req.body as {
            // 	email: string;
            // 	password: string;
            // };
            // return await this.db.transaction(async (trx) => {
            // 	const userModel = this.Model.UserModel(trx);
            // 	const commonModel = this.Model.commonModel(trx);
            // 	const checkUser =
            // 		await userModel.getSingleCommonAuthUser<IAdminAuthView>({
            // 			schema_name: "admin",
            // 			table_name: USER_AUTHENTICATION_VIEW.ADMIN,
            // 			email,
            // 		});
            // 	if (!checkUser) {
            // 		return {
            // 			success: false,
            // 			code: this.StatusCode.HTTP_BAD_REQUEST,
            // 			message: this.ResMsg.WRONG_CREDENTIALS,
            // 		};
            // 	}
            // 	const { password_hash: hashPass, ...rest } = checkUser;
            // 	const checkPass = await Lib.compareHashValue(password, hashPass);
            // 	if (!checkPass) {
            // 		return {
            // 			success: false,
            // 			code: this.StatusCode.HTTP_BAD_REQUEST,
            // 			message: this.ResMsg.WRONG_CREDENTIALS,
            // 		};
            // 	}
            // 	if (!rest.user_status) {
            // 		return {
            // 			success: false,
            // 			code: this.StatusCode.HTTP_FORBIDDEN,
            // 			message: `Account Inactive: Your account status is 'Inactive'.`,
            // 		};
            // 	}
            // 	if (rest.is_2fa_on) {
            // 		const checkOtp = await commonModel.getOTP({
            // 			email: checkUser.email,
            // 			type: OTP_TYPES.two_fa_admin,
            // 		});
            // 		if (checkOtp.length) {
            // 			return {
            // 				success: false,
            // 				code: this.StatusCode.HTTP_GONE,
            // 				message: this.ResMsg.THREE_TIMES_EXPIRED,
            // 			};
            // 		}
            // 		const generateOtp = Lib.otpGenNumber(6);
            // 		const hashed_otp = await Lib.hashValue(generateOtp);
            // 		const insertOtp = await commonModel.insertOTP({
            // 			email: checkUser.email,
            // 			type: OTP_TYPES.two_fa_admin,
            // 			hashed_otp,
            // 		});
            // 		if (!insertOtp) {
            // 			return {
            // 				success: false,
            // 				code: this.StatusCode.HTTP_INTERNAL_SERVER_ERROR,
            // 				message: "Cannot send email at the moment ",
            // 			};
            // 		}
            // 		await Lib.sendEmailDefault({
            // 			email: checkUser.email,
            // 			emailSub: "Two Factor Verification",
            // 			emailBody: sendEmailOtpTemplate(
            // 				generateOtp,
            // 				"two factor verification"
            // 			),
            // 		});
            // 		return {
            // 			success: true,
            // 			code: this.StatusCode.HTTP_OK,
            // 			message: this.ResMsg.LOGIN_SUCCESSFUL,
            // 			data: {
            // 				email: rest.email,
            // 				is_2fa_on: true,
            // 			},
            // 		};
            // 	} else {
            // 		await this.insertAdminAudit(trx, {
            // 			details: `Admin User ${rest.username}(${rest.email}) has logged in.`,
            // 			endpoint: `${req.method} ${req.originalUrl}`,
            // 			created_by: rest.user_id,
            // 			type: "CREATE",
            // 		});
            // 		const token_data = {
            // 			user_id: rest.user_id,
            // 			username: rest.username,
            // 			name: rest.name,
            // 			phone_number: rest.phone_number,
            // 			role_id: rest.role_id,
            // 			photo: rest.photo,
            // 			status: rest.user_status,
            // 			email: rest.email,
            // 		};
            // 		const token = Lib.createToken(
            // 			token_data,
            // 			config.JWT_SECRET_ADMIN,
            // 			LOGIN_TOKEN_EXPIRES_IN
            // 		);
            // 		return {
            // 			success: true,
            // 			code: this.StatusCode.HTTP_OK,
            // 			message: this.ResMsg.LOGIN_SUCCESSFUL,
            // 			data: rest,
            // 			token,
            // 		};
            // 	}
            // });
        });
    }
    // The loginData is used to retrieve user information after successfully verifying the user through two-factor authentication.
    LoginData(req) {
        return __awaiter(this, void 0, void 0, function* () {
            // const { token, email } = req.body as { token: string; email: string };
            // const token_verify: any = Lib.verifyToken(
            // 	token,
            // 	config.JWT_SECRET_ADMIN
            // );
            // const user_model = this.Model.UserModel();
            // if (!token_verify) {
            // 	return {
            // 		success: false,
            // 		code: this.StatusCode.HTTP_UNAUTHORIZED,
            // 		message: this.ResMsg.HTTP_UNAUTHORIZED,
            // 	};
            // }
            // const { email: verify_email } = token_verify;
            // if (email === verify_email) {
            // 	const checkUser =
            // 		await user_model.getSingleCommonAuthUser<IAdminAuthView>({
            // 			schema_name: "admin",
            // 			table_name: USER_AUTHENTICATION_VIEW.ADMIN,
            // 			email,
            // 		});
            // 	if (!checkUser) {
            // 		return {
            // 			success: false,
            // 			code: this.StatusCode.HTTP_BAD_REQUEST,
            // 			message: this.ResMsg.WRONG_CREDENTIALS,
            // 		};
            // 	}
            // 	const { password_hash: hashPass, ...rest } = checkUser;
            // 	if (!rest.user_status) {
            // 		return {
            // 			success: false,
            // 			code: this.StatusCode.HTTP_FORBIDDEN,
            // 			message: `Account Inactive: Your account status is 'Inactive'.`,
            // 		};
            // 	}
            // 	const token_data = {
            // 		user_id: rest.user_id,
            // 		username: rest.username,
            // 		name: rest.name,
            // 		phone_number: rest.phone_number,
            // 		role_id: rest.role_id,
            // 		photo: rest.photo,
            // 		status: rest.user_status,
            // 		email: rest.email,
            // 	};
            // 	const token = Lib.createToken(
            // 		token_data,
            // 		config.JWT_SECRET_ADMIN,
            // 		LOGIN_TOKEN_EXPIRES_IN
            // 	);
            // 	return {
            // 		success: true,
            // 		code: this.StatusCode.HTTP_OK,
            // 		message: this.ResMsg.LOGIN_SUCCESSFUL,
            // 		data: token_data,
            // 		token,
            // 	};
            // } else {
            // 	return {
            // 		success: false,
            // 		code: this.StatusCode.HTTP_FORBIDDEN,
            // 		message: this.StatusCode.HTTP_FORBIDDEN,
            // 	};
            // }
        });
    }
    //forget pass
    forgetPassword(req) {
        return __awaiter(this, void 0, void 0, function* () {
            // const { token, email, password } = req.body as IForgetPasswordPayload;
            // const token_verify: any = Lib.verifyToken(
            // 	token,
            // 	config.JWT_SECRET_ADMIN
            // );
            // if (!token_verify) {
            // 	return {
            // 		success: false,
            // 		code: this.StatusCode.HTTP_UNAUTHORIZED,
            // 		message: this.ResMsg.HTTP_UNAUTHORIZED,
            // 	};
            // }
            // const { email: verify_email } = token_verify;
            // if (email === verify_email) {
            // 	const hashed_pass = await Lib.hashValue(password);
            // 	const model = this.Model.UserModel();
            // 	const [get_user] = await model.checkUser({
            // 		email,
            // 		type: USER_TYPE.ADMIN,
            // 	});
            // 	await model.updateProfile(
            // 		{ password_hash: hashed_pass },
            // 		{ id: get_user.id }
            // 	);
            // 	return {
            // 		success: true,
            // 		code: this.StatusCode.HTTP_OK,
            // 		message: this.ResMsg.PASSWORD_CHANGED,
            // 	};
            // } else {
            // 	return {
            // 		success: false,
            // 		code: this.StatusCode.HTTP_FORBIDDEN,
            // 		message: this.StatusCode.HTTP_FORBIDDEN,
            // 	};
            // }
        });
    }
}
exports.default = AdminAuthService;
