import crypto from "crypto";

const KEY_LENGTH = 64;

// Returns "salt:hash" - every password gets its own random salt
export const hashPassword = (password) => {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto.scryptSync(password, salt, KEY_LENGTH).toString("hex");
    return `${salt}:${hash}`;
};

export const validatePassword = (password, storedHash) => {
    const [salt, hash] = storedHash.split(":");
    const expected = Buffer.from(hash ?? "", "hex");
    if (!salt || expected.length !== KEY_LENGTH) {
        return false;
    }
    const actual = crypto.scryptSync(password, salt, KEY_LENGTH);
    return crypto.timingSafeEqual(actual, expected);
};
