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
const schema_1 = __importDefault(require("../../utils/miscellaneous/schema"));
class UserModel extends schema_1.default {
    constructor(db) {
        super();
        this.db = db;
    }
    //register user
    registerUser(paylaod) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db("users")
                .withSchema(this.DBO_SCHEMA)
                .insert(paylaod, "id");
        });
    }
    //profile
    getProfileDetails(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db("users")
                .withSchema(this.DBO_SCHEMA)
                .select("*")
                .where((qb) => {
                if (query.id) {
                    qb.where("id", query.id);
                }
                if (query.email) {
                    qb.orWhere("email", query.email);
                }
                if (query.phone) {
                    qb.orWhere("phone", query.phone);
                }
                if (query.role) {
                    qb.orWhere("role", query.role);
                }
            });
        });
    }
    getAgentUserList(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db("users as u")
                .withSchema(this.DBO_SCHEMA)
                .leftJoin("parcels as p", "u.id", "p.agent_id")
                .select("u.id", "u.name", "u.photo", "u.phone")
                .count("p.id as parcels")
                .where("u.role", query.role)
                .groupBy("u.id", "u.name", "u.photo");
        });
    }
    getAllUserList(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db("users as u")
                .withSchema(this.DBO_SCHEMA)
                .select("u.id", "u.name", "u.photo", "u.role", "u.email", "u.phone")
                .where((qb) => {
                if (query.role) {
                    qb.where("u.role", query.role);
                }
                if (query.filter) {
                    qb.where("u.name", "like", `%${query.filter}%`);
                }
            }).orderBy("u.id", "desc");
        });
    }
    updateUserRole(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db("users")
                .withSchema(this.DBO_SCHEMA)
                .where("id", payload.user_id)
                .update({ role: payload.role });
        });
    }
}
exports.default = UserModel;
