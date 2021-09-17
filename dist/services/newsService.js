"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const newsRepository_1 = __importDefault(require("../repositories/newsRepository"));
class NewsService {
    search(term, page, perPage) {
        return newsRepository_1.default.find({ 'title': new RegExp(`.*${term}*.`, 'i') })
            .skip((page - 1) * perPage) // numero de registros (docs) a serem pulados
            .limit(perPage);
    }
    get() {
        //  const startDate = new Date("2021-09-16T14:13:23.426Z");
        //  const endDate = new Date("2021-09-17T14:14:23.426Z");
        return newsRepository_1.default.find({ 'active': true }, 'title hat text publishDate')
            //   return NewsRepository.find({'publishDate' : {$gt:startDate,$lt:endDate}}, 'title hat publishDate')
            .sort({ publishDate: -1 }).limit(4);
        //posso fazer um .sort no retorno
    }
    getById(_id) {
        return newsRepository_1.default.findById(_id);
    }
    create(news) {
        news.publishDate = new Date();
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
