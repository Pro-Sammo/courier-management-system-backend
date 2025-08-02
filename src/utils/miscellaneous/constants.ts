export const origin: string[] = [
	"http://localhost:3000",
	"http://localhost:3001",
	"http://localhost:3002",
	"http://localhost:5000",
	"http://localhost:5173",
	"http://10.10.220.47:5000",
	"http://10.10.220.46:3000",
	"http://10.10.220.46:3001",
	"http://10.10.220.46:3002",
];


//Project Info
export const PROJECT_NAME = "Courier Management System";
export const PROJECT_LOGO =
	"https://apsissolutions.com/wp-content/uploads/2021/02/Delivery-Management.png";

export const PROJECT_LINK = "http://10.10.220.31:3000";
export const CLIENT_URL = "http://10.10.220.47:5000";

// Email subject
export const OTP_EMAIL_SUBJECT = "Your One Time Password For Verification";

// Default data get limit
export const DATA_LIMIT = 100;
export const OTP_DEFAULT_EXPIRY = 3;

//error logs level
export const ERROR_LEVEL_DEBUG = "DEBUG";
export const ERROR_LEVEL_INFO = "INFO";
export const ERROR_LEVEL_WARNING = "WARNING";
export const ERROR_LEVEL_ERROR = "ERROR";
export const ERROR_LEVEL_CRITICAL = "CRITICAL";

// OTP for
export const OTP_FOR = "Verification";


//Role
export const ROLE = {
	ADMIN: "admin",
	AGENT: "agent",
	CUSTOMER: "customer",
} as const;

export const PARCEL_STATUS = {
	PENDING:"PENDING",
	PICKED_UP:"PICKED UP",
	IN_TRANSIT:"IN TRANSIT",
	DELIVERED:"DELIVERED",
	FAILED:"FAILED"
}

export const CUSTOMER_SUPPORT_EMAIL = "courierms@gmail.com"