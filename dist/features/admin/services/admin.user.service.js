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
exports.AdminUserService = void 0;
const abstract_service_1 = __importDefault(require("../../../abstract/abstract.service"));
class AdminUserService extends abstract_service_1.default {
    getAllUserList(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { role, filter } = req.query;
            const userModel = this.Model.UserModel();
            const users = yield userModel.getAllUserList({ role, filter });
            return {
                success: true,
                code: this.StatusCode.HTTP_OK,
                message: this.ResMsg.HTTP_OK,
                data: users,
            };
        });
    }
    updateUserRole(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_id, role } = req.body;
            const userModel = this.Model.UserModel();
            const check = yield userModel.getProfileDetails({ id: user_id });
            if (!check.length) {
                return {
                    success: false,
                    code: this.StatusCode.HTTP_NOT_FOUND,
                    message: this.ResMsg.HTTP_NOT_FOUND,
                };
            }
            yield userModel.updateUserRole({ user_id, role });
            return {
                success: true,
                code: this.StatusCode.HTTP_SUCCESSFUL,
                message: this.ResMsg.HTTP_SUCCESSFUL,
            };
        });
    }
}
exports.AdminUserService = AdminUserService;
