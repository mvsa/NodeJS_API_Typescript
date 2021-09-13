"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const newsRepository_1 = __importDefault(require("../repositories/newsRepository"));
class NewsService {
    get() {
        return newsRepository_1.default.find({});
    }
    getById(_id) {
        return newsRepository_1.default.findById(_id);
    }
    create(news) {
        return newsRepository_1.default.create(news);
    }
    update(_id, news) {
        return newsRepository_1.default.findByIdAndUpdate(_id, news);
    }
    delete(_id) {
        return newsRepository_1.default.findByIdAndRemove(_id);
    }
}
exports.default = new NewsService();
//Não foram realizadas quaisquer tipagens pelo instrutor
//O arquivo de service deveria reunir apenas codigos referentes a regras de negocio dentro
//da api
//o Instrutor está utilizando também para encapsular os metodos do repository default do
//mongoose, essa estratégia segue algum padrao(?)
