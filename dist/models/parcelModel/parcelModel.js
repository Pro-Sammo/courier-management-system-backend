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
exports.ParcelModel = void 0;
const constants_1 = require("../../utils/miscellaneous/constants");
const schema_1 = __importDefault(require("../../utils/miscellaneous/schema"));
class ParcelModel extends schema_1.default {
    constructor(db) {
        super();
        this.db = db;
    }
    createParcel(paylaod) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db("parcels").withSchema(this.DBO_SCHEMA).insert(paylaod, "id");
        });
    }
    getParcelList(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db("parcels as p")
                .withSchema(this.DBO_SCHEMA)
                .select("p.*", "u.name as agent_name", "u.phone as agent_phone", "u.photo as agent_photo")
                .leftJoin("users as u", "u.id", "p.agent_id")
                .where((qb) => {
                qb.where("p.customer_id", query.customer_id);
                if (query.status) {
                    qb.where("p.status", query.status);
                }
                if (query.tracking_id) {
                    qb.where("p.tracking_id", query.tracking_id);
                }
            })
                .limit(query.limit || 1000)
                .offset(query.skip || 0);
            const total = yield this.db("parcels")
                .withSchema(this.DBO_SCHEMA)
                .count("id as total")
                .where((qb) => {
                qb.where("customer_id", query.customer_id);
                if (query.status) {
                    qb.where("status", query.status);
                }
                if (query.tracking_id) {
                    qb.where("tracking_id", query.tracking_id);
                }
            });
            return { data: result, total: Number(total[0].total) };
        });
    }
    getSingleParcel(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db("parcels")
                .withSchema(this.DBO_SCHEMA)
                .select("*")
                .where((qb) => {
                qb.where("id", query.parcel_id);
                qb.where("customer_id", query.customer_id);
            })
                .first();
        });
    }
    getSingleParcelByTrackingId(tracking_id, customer_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db("parcels as p")
                .withSchema(this.DBO_SCHEMA)
                .select("p.id", "p.tracking_id", "p.status", "p.agent_id", "p.sender_name", "p.sender_phone", "p.receiver_name", "p.receiver_phone", "p.pickup_address", "p.delivery_address", "p.created_at", "p.amount", "p.payment_mode", "u.name as agent_name", "u.phone as agent_phone", "p.pickup_lat", "p.pickup_lng", "p.delivery_lat", "p.delivery_lng")
                .where((qb) => {
                qb.where("p.tracking_id", tracking_id);
                qb.where("p.customer_id", customer_id);
            })
                .leftJoin("users as u", "u.id", "p.agent_id")
                .first();
        });
    }
    getAdminPacelList(query) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const baseQuery = this.db("parcels as p")
                .withSchema(this.DBO_SCHEMA)
                .leftJoin("users as cu", "cu.id", "p.customer_id");
            const dataQuery = baseQuery
                .clone()
                .select("p.id", "p.tracking_id", "p.sender_name", "p.sender_phone", "p.receiver_name", "p.receiver_phone", "p.pickup_address", "p.delivery_address", "p.parcel_weight", "p.parcel_type", "p.parcel_description", "p.payment_mode", "p.amount", "p.is_paid", "p.created_at", "p.status", "p.agent_id", "cu.name as customer_name", "cu.email as customer_email", "cu.phone as customer_phone", "cu.photo as customer_photo")
                .modify((qb) => {
                if (query.status) {
                    qb.where("p.status", query.status);
                }
                if (query.tracking_id) {
                    qb.where("p.tracking_id", query.tracking_id);
                }
            })
                .limit(query.limit || 100)
                .offset(query.skip || 0)
                .orderBy("p.id", "desc");
            const countQuery = baseQuery
                .clone()
                .count("p.id as total")
                .modify((qb) => {
                if (query.status) {
                    qb.where("p.status", query.status);
                }
                if (query.tracking_id) {
                    qb.where("p.tracking_id", query.tracking_id);
                }
            });
            const [result, total] = yield Promise.all([dataQuery, countQuery]);
            return {
                data: result,
                total: Number(((_a = total[0]) === null || _a === void 0 ? void 0 : _a.total) || 0),
            };
        });
    }
    getAdminSingleParcel(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db("parcels")
                .withSchema(this.DBO_SCHEMA)
                .select("*")
                .where("id", query.parcel_id)
                .first();
        });
    }
    getAgentSingelParcel(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db("parcels")
                .withSchema(this.DBO_SCHEMA)
                .select("*")
                .where("id", query.parcel_id)
                .andWhere("agent_id", query.agent_id)
                .first();
        });
    }
    assignAgentToParcel(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db("parcels")
                .withSchema(this.DBO_SCHEMA)
                .where("id", query.parcel_id)
                .update({ agent_id: query.agent_id });
        });
    }
    changeParcelStatus(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db("parcels")
                .withSchema(this.DBO_SCHEMA)
                .where("id", query.parcel_id)
                .update({ status: query.status });
        });
    }
    getAssignedParcelList(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db("parcels")
                .withSchema(this.DBO_SCHEMA)
                .select("id", "tracking_id", "status", "sender_name", "sender_phone", "receiver_name", "receiver_phone", "pickup_address", "delivery_address", "created_at", "amount", "payment_mode", "pickup_lat", "pickup_lng", "delivery_lat", "delivery_lng", "parcel_description", "parcel_weight", "parcel_type", "is_paid")
                .where((qb) => {
                qb.where("agent_id", query.agent_id);
                if (query.status) {
                    qb.where("status", query.status);
                }
            })
                .orderBy("id", "desc");
        });
    }
    setParcelStatusLogs(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db("parcel_status_logs")
                .withSchema(this.DBO_SCHEMA)
                .insert(payload);
        });
    }
    trackParcel(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db("parcel_status_logs")
                .withSchema(this.DBO_SCHEMA)
                .select("*")
                .where((qb) => {
                qb.where("parcel_id", query.parcel_id);
            });
        });
    }
    getParcelsByAgent(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db("parcels")
                .withSchema(this.DBO_SCHEMA)
                .select("customer_id")
                .where((qb) => {
                qb.where("agent_id", query.agent_id);
                qb.whereNot("status", constants_1.PARCEL_STATUS.DELIVERED);
                qb.whereNot("status", constants_1.PARCEL_STATUS.FAILED);
            });
        });
    }
    getDashBoradDataForCustomer(customer_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = this.db;
            const rows = yield db
                .with("statuses", (qb) => {
                qb.select(db.raw(`UNNEST(ARRAY['PENDING', 'PICKED UP', 'IN TRANSIT', 'DELIVERED', 'FAILED']) AS status`));
            })
                .select("statuses.status")
                .count("parcels.id as total")
                .from("statuses")
                .leftJoin("dbo.parcels as parcels", function () {
                this.on("parcels.status", "=", "statuses.status").andOn("parcels.customer_id", "=", db.raw("?", [customer_id]));
            })
                .groupBy("statuses.status")
                .orderBy("statuses.status");
            const data = {};
            rows.forEach((row) => {
                data[row.status] = Number(row.total);
            });
            const recentBooking = yield db("parcels")
                .withSchema(this.DBO_SCHEMA)
                .select("id", "tracking_id", "status", "created_at", "amount", "payment_mode", "delivery_address", "receiver_name", "receiver_phone")
                .where("customer_id", customer_id)
                .orderBy("id", "desc")
                .limit(5);
            return Object.assign(Object.assign({}, data), { recentBooking });
        });
    }
    setParcelPaymentStatus(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db("parcels")
                .withSchema(this.DBO_SCHEMA)
                .where("id", payload.parcel_id)
                .update({ is_paid: payload.is_paid });
        });
    }
    getDashboradDataForAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = this.db;
            const [state] = yield db
                .select(db.raw(`
        COUNT(*) AS total_parcels,
        COUNT(*) FILTER (WHERE p.payment_mode = 'cod') AS total_cod_count,
        COUNT(*) FILTER (WHERE p.status = 'PENDING') AS pending_deliveries,
        COUNT(*) FILTER (WHERE p.status = 'DELIVERED') AS delivered_count,
        SUM(p.amount) FILTER (WHERE p.is_paid = true AND p.status = 'DELIVERED') AS total_revenue
      `))
                .from("dbo.parcels as p");
            const daily_booking = yield db("dbo.parcels as p")
                .join("dbo.users as u", "p.customer_id", "u.id")
                .select("p.id", "p.tracking_id", "u.name as customer_name", "p.sender_name", "p.receiver_name", "p.status", "p.amount", "p.is_paid", "p.created_at")
                .whereRaw("DATE(p.created_at) = CURRENT_DATE")
                .orderBy("p.created_at", "desc");
            const failed_deliveries = yield db("dbo.parcels as p")
                .join("dbo.users as u", "p.customer_id", "u.id")
                .select("p.id", "p.tracking_id", "u.name as customer_name", "p.sender_name", "p.receiver_name", "p.amount", "p.status", "p.status_history", "p.created_at", "p.updated_at")
                .where("p.status", "FAILED")
                .orderBy("p.updated_at", "desc");
            return {
                state,
                daily_booking,
                failed_deliveries,
            };
        });
    }
    getDashboardDataForAgent(agent_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const dashboardData = yield this.db("dbo.parcels as p")
                .select([
                this.db.raw(`
        COUNT(*) FILTER (WHERE DATE(p.created_at) = CURRENT_DATE) AS total_assigned_today
      `),
                this.db.raw(`
        COUNT(*) FILTER (WHERE DATE(p.created_at) = CURRENT_DATE AND p.status = 'PENDING') AS pending_count
      `),
                this.db.raw(`
        COUNT(*) FILTER (WHERE DATE(p.created_at) = CURRENT_DATE AND p.status = 'PICKED UP') AS picked_up_count
      `),
                this.db.raw(`
        COUNT(*) FILTER (WHERE DATE(p.created_at) = CURRENT_DATE AND p.status = 'IN TRANSIT') AS in_transit_count
      `),
                this.db.raw(`
        COUNT(*) FILTER (WHERE DATE(p.created_at) = CURRENT_DATE AND p.status = 'DELIVERED') AS delivered_count
      `),
                this.db.raw(`
        COUNT(*) FILTER (WHERE DATE(p.created_at) = CURRENT_DATE AND p.status = 'FAILED') AS failed_count
      `),
                this.db.raw(`
        COALESCE(
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', p.id,
              'tracking_id', p.tracking_id,
              'receiver_name', p.receiver_name,
              'receiver_phone', p.receiver_phone,
              'delivery_address', p.delivery_address,
              'status', p.status,
              'created_at', p.created_at,
              'estimated_time', p.estimated_time,
              'parcel_type', p.parcel_type,
              'payment_mode', p.payment_mode,
              'amount', p.amount,
              'is_paid', p.is_paid
            )
          ) FILTER (WHERE DATE(p.created_at) = CURRENT_DATE), '[]'::json
        ) AS assigned_parcel_details
      `),
            ])
                .where("p.agent_id", agent_id)
                .first();
            return dashboardData;
        });
    }
}
exports.ParcelModel = ParcelModel;
