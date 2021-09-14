"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let payload = {
    iss: "api.com",
    iat: new Date().getSeconds(),
    exp: new Date().setMinutes(60),
    name: "Marcos",
    email: "marcos@marcos.com"
};
const token = jsonwebtoken_1.default.sign(payload, "changeme");
console.log(token);
