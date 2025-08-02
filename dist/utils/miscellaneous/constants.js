"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CUSTOMER_SUPPORT_EMAIL = exports.PARCEL_STATUS = exports.ROLE = exports.OTP_FOR = exports.ERROR_LEVEL_CRITICAL = exports.ERROR_LEVEL_ERROR = exports.ERROR_LEVEL_WARNING = exports.ERROR_LEVEL_INFO = exports.ERROR_LEVEL_DEBUG = exports.OTP_DEFAULT_EXPIRY = exports.DATA_LIMIT = exports.OTP_EMAIL_SUBJECT = exports.CLIENT_URL = exports.PROJECT_LOGO = exports.PROJECT_NAME = exports.origin = void 0;
exports.origin = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "http://localhost:5000",
    "http://localhost:5173",
    "http://10.10.220.47:5000",
    "http://10.10.220.46:3000",
    "http://10.10.220.46:3001",
    "http://10.10.220.46:3002",
    "https://main.d3koorpmhi8mya.amplifyapp.com",
    "https://www.main.d3koorpmhi8mya.amplifyapp.com",
    "http://main.d3koorpmhi8mya.amplifyapp.com",
    "http://www.main.d3koorpmhi8mya.amplifyapp.com"
];
//Project Info
exports.PROJECT_NAME = "Courier Management System";
exports.PROJECT_LOGO = "https://apsissolutions.com/wp-content/uploads/2021/02/Delivery-Management.png";
exports.CLIENT_URL = "https://main.d3koorpmhi8mya.amplifyapp.com";
// Email subject
exports.OTP_EMAIL_SUBJECT = "Your One Time Password For Verification";
// Default data get limit
exports.DATA_LIMIT = 100;
exports.OTP_DEFAULT_EXPIRY = 3;
//error logs level
exports.ERROR_LEVEL_DEBUG = "DEBUG";
exports.ERROR_LEVEL_INFO = "INFO";
exports.ERROR_LEVEL_WARNING = "WARNING";
exports.ERROR_LEVEL_ERROR = "ERROR";
exports.ERROR_LEVEL_CRITICAL = "CRITICAL";
// OTP for
exports.OTP_FOR = "Verification";
//Role
exports.ROLE = {
    ADMIN: "admin",
    AGENT: "agent",
    CUSTOMER: "customer",
};
exports.PARCEL_STATUS = {
    PENDING: "PENDING",
    PICKED_UP: "PICKED UP",
    IN_TRANSIT: "IN TRANSIT",
    DELIVERED: "DELIVERED",
    FAILED: "FAILED"
};
exports.CUSTOMER_SUPPORT_EMAIL = "courierms@gmail.com";
