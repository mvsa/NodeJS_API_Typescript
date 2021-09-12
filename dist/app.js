"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class Startup {
    constructor() {
        this.app = (0, express_1.default)();
        this.routes();
    }
    routes() {
        this.app.route('/').get((req, rest) => {
            rest.send({ versao: '0.0.1' });
        });
    }
}
exports.default = new Startup();
