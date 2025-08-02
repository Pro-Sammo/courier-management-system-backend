"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../app/database");
const user_model_1 = __importDefault(require("./userModel/user.model"));
const parcelModel_1 = require("./parcelModel/parcelModel");
const lasServiceEntryModel_1 = require("./lastServiceEntryModel/lasServiceEntryModel");
class Models {
    UserModel(trx) {
        return new user_model_1.default(trx || database_1.db);
    }
    ParcelModel(trx) {
        return new parcelModel_1.ParcelModel(trx || database_1.db);
    }
    LastServiceEntryModel(trx) {
        return new lasServiceEntryModel_1.LastServiceEntryModel(trx || database_1.db);
    }
}
exports.default = Models;
