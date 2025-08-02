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
exports.CustomerParcelService = void 0;
const abstract_service_1 = __importDefault(require("../../../abstract/abstract.service"));
const lib_1 = __importDefault(require("../../../utils/lib/lib"));
class CustomerParcelService extends abstract_service_1.default {
    constructor() {
        super();
    }
    createParcel(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const { id } = req.customer;
                const paylaod = req.body;
                const tracking_id = yield lib_1.default.generateTrackingId({ trx });
                paylaod.customer_id = id;
                paylaod.tracking_id = tracking_id;
                const parcelModel = this.Model.ParcelModel(trx);
                const parcel = yield parcelModel.createParcel(paylaod);
                yield parcelModel.setParcelStatusLogs({
                    parcel_id: parcel[0].id,
                    status: "PENDING",
                    updated_at: new Date(),
                    note: "Your package is awaiting pickup.",
                });
                return {
                    success: true,
                    code: this.StatusCode.HTTP_SUCCESSFUL,
                    message: this.ResMsg.HTTP_SUCCESSFUL,
                };
            }));
        });
    }
    getParcelList(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const { id } = req.customer;
                const { status, tracking_id, limit, skip } = req.query;
                const parcelModel = this.Model.ParcelModel(trx);
                const { data, total } = yield parcelModel.getParcelList({
                    status,
                    tracking_id,
                    customer_id: id,
                    limit,
                    skip,
                });
                return {
                    success: true,
                    code: this.StatusCode.HTTP_SUCCESSFUL,
                    message: this.ResMsg.HTTP_SUCCESSFUL,
                    total: total || 0,
                    data: data || [],
                };
            }));
        });
    }
    getSingleParcel(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const { id } = req.customer;
                const { id: parcel_id } = req.params;
                const parcelModel = this.Model.ParcelModel(trx);
                const data = yield parcelModel.getSingleParcel({
                    parcel_id: Number(parcel_id),
                    customer_id: id,
                });
                if (!data) {
                    return {
                        success: false,
                        code: this.StatusCode.HTTP_NOT_FOUND,
                        message: this.ResMsg.HTTP_NOT_FOUND,
                    };
                }
                return {
                    success: true,
                    code: this.StatusCode.HTTP_SUCCESSFUL,
                    message: this.ResMsg.HTTP_SUCCESSFUL,
                    data: data,
                };
            }));
        });
    }
    trackParcel(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const { id } = req.customer;
                const { tracking_id } = req.params;
                const parcelModel = this.Model.ParcelModel(trx);
                const data = yield parcelModel.getSingleParcelByTrackingId(tracking_id, id);
                if (!data) {
                    return {
                        success: false,
                        code: this.StatusCode.HTTP_NOT_FOUND,
                        message: this.ResMsg.HTTP_NOT_FOUND,
                    };
                }
                const tracking = yield parcelModel.trackParcel({
                    parcel_id: Number(data.id),
                });
                return {
                    success: true,
                    code: this.StatusCode.HTTP_SUCCESSFUL,
                    message: this.ResMsg.HTTP_SUCCESSFUL,
                    data: Object.assign(Object.assign({}, data), { tracking: tracking }),
                };
            }));
        });
    }
}
exports.CustomerParcelService = CustomerParcelService;
