import crypto from "crypto";

// Generates a URL-safe random short code, e.g. "aZ3kLp"
const generateCode = (length = 6) => {
  return crypto
    .randomBytes(length)
    .toString("base64")
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, length);
};

export default generateCode;
