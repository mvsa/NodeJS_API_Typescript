"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const db_1 = __importDefault(require("./database/db"));
const auth_1 = __importDefault(require("./config/auth"));
const uploads_1 = __importDefault(require("./utils/uploads"));
const newsRouter_1 = __importDefault(require("./routes/newsRouter"));
class Startup {
    constructor() {
        this.app = (0, express_1.default)();
        this._db = new db_1.default();
        this._db.createConnection();
        this.middleware();
        this.routes();
    }
    enableCors() {
        const options = {
            methods: "GET,OPTIONS,PUT,POST,DELETE",
            origin: "*" //poderia passar endereço do front a qual ele iria aceitar
        };
        this.app.use((0, cors_1.default)(options));
    }
    middleware() {
        this.enableCors();
        this.app.use(body_parser_1.default.json()); //deprecated
        this.app.use(body_parser_1.default.urlencoded({ extended: false })); //para que seja possivel trabalhar com query string(?)
        this.app.use((0, compression_1.default)());
        //permite que acesso do express a pasta estatica para podermos baixar files(?)
        this.app.use('/exports', express_1.default.static(process.cwd() + '/exports'));
    }
    //As rotas poderiam ser encapsuladas para evitar repetição de codigo
    routes() {
        this.app.route("/uploads").post(uploads_1.default.single('file'), (req, res) => {
            try {
                res.send("Arquivo enviado");
            }
            catch (err) {
                console.error('erro', err);
            }
        });
        this.app.route('/').get((req, rest) => {
            rest.send({ versao: '0.0.1' });
        });
        this.app.use(auth_1.default.validate);
        //News Routers
        this.app.use("/api/v1", newsRouter_1.default);
    }
}
exports.default = new Startup();
