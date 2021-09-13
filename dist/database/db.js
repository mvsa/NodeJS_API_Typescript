"use strict";
//no codigo original o instrutor criou esse arquivo de conexão de bd na mesma pasta utils
//que ele denomina "infra"
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//em DEV a DB_URL era:   private DB_URL = 'mongodb://localhost:27017/db_portal'
const mongoose_1 = __importDefault(require("mongoose"));
class Db {
    constructor() {
        this.DB_URL = 'mongodb://link-db/db_portal';
    }
    createConnection() {
        mongoose_1.default.connect(this.DB_URL);
        console.log('Connected to MongoDb');
    }
}
exports.default = Db;
