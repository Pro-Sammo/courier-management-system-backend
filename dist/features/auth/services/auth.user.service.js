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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_service_1 = __importDefault(require("../../../abstract/abstract.service"));
const lib_1 = __importDefault(require("../../../utils/lib/lib"));
const config_1 = __importDefault(require("../../../app/config"));
class UserAuthService extends abstract_service_1.default {
    //register user
    registerUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const reqBody = req.body;
                const files = req.files || [];
                if (files.length) {
                    reqBody["photo"] = files[0].filename;
                }
                const { email, phone, password } = reqBody, rest = __rest(reqBody, ["email", "phone", "password"]);
                const userModel = this.Model.UserModel(trx);
                const checkUser = yield userModel.getProfileDetails({
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
                    }
                    else if (checkUser[0].phone === phone) {
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
                const hashedPass = yield lib_1.default.hashValue(password);
                //register user
                const registration = yield userModel.registerUser(Object.assign(Object.assign({}, rest), { password: hashedPass }));
                //retrieve token data
                const tokenData = {
                    id: registration[0].id,
                    name: rest.name,
                    email: rest.email,
                    phone: rest.phone,
                    photo: rest === null || rest === void 0 ? void 0 : rest.photo,
                    role: rest.role,
                    status: true,
                    create_date: new Date(),
                };
                const token = lib_1.default.createToken(tokenData, config_1.default.JWT_SECRET_USER, "48h");
                return {
                    success: true,
                    code: this.StatusCode.HTTP_SUCCESSFUL,
                    message: this.ResMsg.USER_CREATED,
                    data: tokenData,
                    token,
                };
            }));
        });
    }
    //login
    loginUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const userModel = this.Model.UserModel();
            const checkUser = yield userModel.getProfileDetails({ email });
            if (!checkUser.length) {
                return {
                    success: false,
                    code: this.StatusCode.HTTP_BAD_REQUEST,
                    message: this.ResMsg.WRONG_CREDENTIALS,
                };
            }
            const _a = checkUser[0], { password: hashPass } = _a, rest = __rest(_a, ["password"]);
            const checkPass = yield lib_1.default.compareHashValue(password, hashPass);
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
            const token = lib_1.default.createToken(tokenData, config_1.default.JWT_SECRET_USER, '48h');
            return {
                success: true,
                code: this.StatusCode.HTTP_OK,
                message: this.ResMsg.LOGIN_SUCCESSFUL,
                data: rest,
                token,
            };
        });
    }
}
exports.default = UserAuthService;
