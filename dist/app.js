"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = __importDefault(require("./database/db"));
const newsController_1 = __importDefault(require("./controller/newsController"));
class Startup {
    constructor() {
        this.app = (0, express_1.default)();
        this._db = new db_1.default();
        this._db.createConnection();
        this.middleware();
        this.routes();
    }
    middleware() {
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: false })); //para que seja possivel trabalhar com query string(?)
    }
    //As rotas poderiam ser encapsuladas para evitar repetição de codigo
    routes() {
        this.app.route('/').get((req, rest) => {
            rest.send({ versao: '0.0.1' });
        });
        this.app.route("/api/v1/news").get(newsController_1.default.get);
        this.app.route("/api/v1/news/:id").get(newsController_1.default.getById);
        this.app.route("/api/v1/news").post(newsController_1.default.create);
        this.app.route("/api/v1/news/:id").put(newsController_1.default.update);
        this.app.route("/api/v1/news/:id").delete(newsController_1.default.delete);
    }
}
exports.default = new Startup();
