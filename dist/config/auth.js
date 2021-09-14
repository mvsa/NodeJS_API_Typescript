"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("./config"));
class Auth {
    validate(req, res, next) {
        const authHeader = req.headers.authorization; // req.headers['x-access-token'](?)
        if (!authHeader) {
            return res.status(401).send({
                sucess: false,
                message: 'Unauthorized'
            });
        }
        //const [, token] = authHeader.split(' ');
        jsonwebtoken_1.default.verify(authHeader, config_1.default.secret, (err, decoded) => {
            console.log(decoded);
            if (err) {
                return res.status(403).send({
                    sucess: false,
                    message: 'Forbidden'
                });
            }
            else {
                next();
            }
        });
    }
}
exports.default = new Auth();
