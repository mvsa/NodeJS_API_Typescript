"use strict";
//no codigo original o instrutor criou esse arquivo de conexão de bd na mesma pasta utils
//que ele denomina "infra"
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//em DEV a DB_URL era:   private DB_URL = 'mongodb://localhost:27017/db_portal'
//NECESSARIO implementar uso do .ENV
const mongoose_1 = __importDefault(require("mongoose"));
class Db {
    constructor() {
        this.DB_URL_DEV = 'mongodb://localhost:27017/db_portal';
        this.DB_URL_PROD = 'mongodb://link-db/db_portal';
    }
    createConnection() {
        mongoose_1.default.connect(this.DB_URL_PROD);
    }
}
exports.default = Db;
