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
exports.AgentParcelService = void 0;
const abstract_service_1 = __importDefault(require("../../../abstract/abstract.service"));
const constants_1 = require("../../../utils/miscellaneous/constants");
const lib_1 = __importDefault(require("../../../utils/lib/lib"));
const sendParcelUpdateEmail_1 = require("../../../utils/templates/sendParcelUpdateEmail");
const dayjs_1 = __importDefault(require("dayjs"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(timezone_1.default);
class AgentParcelService extends abstract_service_1.default {
    getAssignedParcels(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.agent;
            const { status } = req.query;
            const parcelModel = this.Model.ParcelModel();
            const data = yield parcelModel.getAssignedParcelList({
                agent_id: id,
                status,
            });
            return {
                success: true,
                code: this.StatusCode.HTTP_OK,
                message: this.ResMsg.HTTP_OK,
                data: data || [],
            };
        });
    }
    updateParcelStatus(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: agent_id } = req.agent;
            const { id: parcel_id } = req.params;
            const { status, agent_note } = req.body;
            const parcelModel = this.Model.ParcelModel();
            const parcel = yield parcelModel.getAgentSingelParcel({
                parcel_id: Number(parcel_id),
                agent_id: agent_id,
            });
            if (!parcel) {
                return {
                    success: false,
                    code: this.StatusCode.HTTP_NOT_FOUND,
                    message: this.ResMsg.HTTP_NOT_FOUND,
                };
            }
            let note = "";
            if (agent_note) {
                note = agent_note;
            }
            else {
                if (status === constants_1.PARCEL_STATUS.PICKED_UP) {
                    note = "Your parcel has been picked up from the sender.";
                }
                else if (status === constants_1.PARCEL_STATUS.IN_TRANSIT) {
                    note = "Your shipment is currently on its way to the destination.";
                }
                else if (status === constants_1.PARCEL_STATUS.DELIVERED) {
                    note = "Your parcel has been delivered.";
                }
                else if (status === constants_1.PARCEL_STATUS.FAILED) {
                    note = "The shipment couldn't be completed — please contact support.";
                }
            }
            yield parcelModel.changeParcelStatus({
                parcel_id: Number(parcel_id),
                status,
            });
            yield parcelModel.setParcelStatusLogs({
                parcel_id: Number(parcel_id),
                status,
                note,
                updated_at: new Date(),
                updated_by: req.agent.id,
            });
            if (status === constants_1.PARCEL_STATUS.DELIVERED) {
                yield parcelModel.setParcelPaymentStatus({
                    parcel_id: Number(parcel_id),
                    is_paid: true,
                });
            }
            else if (status === constants_1.PARCEL_STATUS.FAILED &&
                parcel.payment_mode === "prepaid") {
                yield parcelModel.setParcelPaymentStatus({
                    parcel_id: Number(parcel_id),
                    is_paid: false,
                });
            }
            req.io.emit("updateParcelStatus", { parcel_id, status });
            const userModel = this.Model.UserModel();
            const customer = yield userModel.getProfileDetails({ id: parcel.user_id });
            const currentTime = (0, dayjs_1.default)().format("ddd, DD MMM YYYY hh:mm A");
            yield lib_1.default.sendEmail({
                email: customer[0].email,
                emailBody: (0, sendParcelUpdateEmail_1.sendParcelUpdateEmail)({
                    customerName: customer[0].name,
                    trackingId: parcel.tracking_id,
                    updatedAt: currentTime,
                    updateMessage: note,
                    trackingLink: `${constants_1.CLIENT_URL}/customer/track/${parcel.tracking_id}`,
                }),
                emailSub: `${constants_1.PROJECT_NAME} - ${note} | ${parcel.tracking_id}`,
            });
            return {
                success: true,
                code: this.StatusCode.HTTP_OK,
                message: this.ResMsg.HTTP_OK,
            };
        });
    }
}
exports.AgentParcelService = AgentParcelService;
