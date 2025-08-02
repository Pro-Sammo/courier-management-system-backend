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
exports.AdminParcelService = void 0;
const abstract_service_1 = __importDefault(require("../../../abstract/abstract.service"));
class AdminParcelService extends abstract_service_1.default {
    getAdminPacelList(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { status, tracking_id, limit, skip } = req.query;
            const parcelModel = this.Model.ParcelModel();
            const { data, total } = yield parcelModel.getAdminPacelList({
                status,
                tracking_id,
                limit,
                skip,
            });
            return {
                success: true,
                code: this.StatusCode.HTTP_OK,
                message: this.ResMsg.HTTP_OK,
                total: total || 0,
                data: data || [],
            };
        });
    }
    assignAgentToParcel(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const { parcel_id, agent_id } = req.body;
                const parcelModel = this.Model.ParcelModel(trx);
                const userModel = this.Model.UserModel(trx);
                const parcel = yield parcelModel.getAdminSingleParcel({ parcel_id });
                if (!parcel) {
                    return {
                        success: false,
                        code: this.StatusCode.HTTP_NOT_FOUND,
                        message: this.ResMsg.HTTP_NOT_FOUND,
                    };
                }
                const agent = yield userModel.getProfileDetails({ id: agent_id });
                if (!agent) {
                    return {
                        success: false,
                        code: this.StatusCode.HTTP_NOT_FOUND,
                        message: this.ResMsg.HTTP_NOT_FOUND,
                    };
                }
                yield parcelModel.assignAgentToParcel({ parcel_id, agent_id });
                return {
                    success: true,
                    code: this.StatusCode.HTTP_OK,
                    message: this.ResMsg.HTTP_OK,
                };
            }));
        });
    }
    changeParcelStatus(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { parcel_id, status } = req.body;
            console.log("called---------------->>");
            const parcelModel = this.Model.ParcelModel();
            const parcel = yield parcelModel.getAdminSingleParcel({ parcel_id });
            if (!parcel) {
                return {
                    success: false,
                    code: this.StatusCode.HTTP_NOT_FOUND,
                    message: this.ResMsg.HTTP_NOT_FOUND,
                };
            }
            yield parcelModel.changeParcelStatus({ parcel_id, status });
            return {
                success: true,
                code: this.StatusCode.HTTP_OK,
                message: this.ResMsg.HTTP_OK,
            };
        });
    }
}
exports.AdminParcelService = AdminParcelService;
