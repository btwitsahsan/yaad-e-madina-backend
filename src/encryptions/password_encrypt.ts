require("dotenv").config();
import { createHash, randomBytes } from "crypto";

const PASSWORD_HASH_SECRET = process.env.PASSWORD_HASH_SECRET;
const HASH_ALGORITHM = "sha256";
const HASH_ENCODING = "hex";
const SALT_LENGTH = 16;

const salt = () => {
  return randomBytes(SALT_LENGTH).toString("hex");
};

export const encrpt_admin_password = (password: string) => {
  const hash = createHash(HASH_ALGORITHM);
  hash.update(password + salt + PASSWORD_HASH_SECRET);
  return hash.digest(HASH_ENCODING);
};

export const verify_admin_password = (
  password: string,
  hashedPassword: string
) => {
  const hash = createHash(HASH_ALGORITHM);
  hash.update(password + salt + PASSWORD_HASH_SECRET);
  return hashedPassword === hash.digest(HASH_ENCODING);
};
