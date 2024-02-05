import crypto from "crypto";

const SECRET = "56EF7F3888F7BBE4512375795D11D";

export const random = () => crypto.randomBytes(128).toString("base64");
export const authenticate = (salt: string, password: string) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET)
    .digest("hex");
};
