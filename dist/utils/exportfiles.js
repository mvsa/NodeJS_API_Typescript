"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const json2csv_1 = __importDefault(require("json2csv"));
const uuid_1 = require("uuid");
const fs_1 = __importDefault(require("fs"));
const fields = ['_id', 'hat', 'title', 'text', 'author', 'img', 'publishDate', 'link', 'active'];
const opts = { fields };
class ExportFiles {
    constructor() {
        this.tocsv = (news) => {
            try {
                const csv = json2csv_1.default.parse(news, opts);
                const filename = "/" + (0, uuid_1.v4)() + ".csv";
                fs_1.default.writeFile('./exports' + filename, csv, (err) => {
                    if (err)
                        throw new Error("ERRO");
                    console.log('Arquivo criado');
                });
                return filename;
            }
            catch (error) {
                console.error('Erro', error);
            }
        };
    }
}
exports.default = new ExportFiles();
