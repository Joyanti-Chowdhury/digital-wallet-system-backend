"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const generateToken = (payload, secret, expiresIn) => {
    console.log(secret, payload, expiresIn, "secret");
    const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: expiresIn });
    return token;
};
exports.generateToken = generateToken;
const verifyToken = (token, secret) => {
    console.log(token, secret);
    const verifiedToken = jsonwebtoken_1.default.verify(token, secret);
    return verifiedToken;
};
exports.verifyToken = verifyToken;
