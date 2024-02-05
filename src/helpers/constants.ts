// Application constants
export const PORT: number = 3001;
export const CLIENT_PORT: number = 3000;
export const SESSION_TOKEN_COOKIE: string = "BACKEND-AUTH-AUTION-SOFTWARE";
export const DOMAIN: string = "localhost";
export const IDENTITY = "identity";

//Success Messages
export const LOG_OUT_SUCCESS = "Successfully loggedout";

// Error Messages
export const INVALID_SESSION: string =
  "Session token not found, Please login to complete this transaction";
export const INVALID_LOGIN_DETAILS: string =
  "Login details provided are invalid";
export const USER_NOT_FOUND: string = "User does not exist";
export const WRONG_PASSWORD: string = "Wrong password";
export const INVALID_USER_DETAILS: string = "User details provided are invalid";
export const DUPLICATE_USER: string = "User already exist";
export const INVALID_REQUEST: string = "Invalid request";
export const SYSTEM_ERROR: string = "System error occured";
export const SOMETHING_WENT_WRONG: string =
  "Something went wrong, Please contact admin";
export const INVALID_PROJECT_DETAILS: string =
  "Project details provided are invalid";
