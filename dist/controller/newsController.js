"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const newsService_1 = __importDefault(require("../services/newsService"));
const HttpStatus = __importStar(require("http-status"));
const redis_1 = __importDefault(require("redis"));
const helper_1 = __importDefault(require("../utils/helper"));
class NewsController {
    get(req, res) {
        const cliente = redis_1.default.createClient();
        //const cliente = redis.createClient(6379,'redis'); prd
        cliente.get('news', (err, reply) => {
            if (reply) { //se ja tiver algo no redis com a chave 'news'
                helper_1.default.sendResponse(res, HttpStatus.OK, JSON.parse(reply)); //retorna os dados do redis (mais rapido)
            }
            else {
                //se não tiver, tras do banco e seta no redis para a proxima
                newsService_1.default.get()
                    .then(news => {
                    cliente.set('news', JSON.stringify(news));
                    cliente.expire('news', 20); //expirar em 20 sec
                    helper_1.default.sendResponse(res, HttpStatus.OK, news);
                })
                    .catch(err => console.error('erro', err));
            }
        });
    }
    getById(req, res) {
        const _id = req.params.id;
        newsService_1.default.getById(_id)
            .then(news => helper_1.default.sendResponse(res, HttpStatus.OK, news))
            .catch(err => console.error('erro', err));
    }
    create(req, res) {
        const vm = req.body;
        newsService_1.default.create(vm)
            .then(news => helper_1.default.sendResponse(res, HttpStatus.CREATED, "Noticia cadastrada com sucesso"))
            .catch(err => console.error('erro', err));
    }
    update(req, res) {
        const _id = req.params.id;
        const news = req.body;
        newsService_1.default.update(_id, news)
            .then(news => helper_1.default.sendResponse(res, HttpStatus.OK, `Noticia foi atualizada`))
            .catch(err => console.error('erro', err));
    }
    delete(req, res) {
        const _id = req.params.id;
        newsService_1.default.delete(_id)
            .then(() => helper_1.default.sendResponse(res, HttpStatus.OK, 'Noticia deletado com sucessos'))
            .catch(err => console.error('erro', err));
    }
}
exports.default = new NewsController();
//No codigo original não existe tratamento para as tipagens, fui adicionando as que poderiam
//ajudar a fazer a checagem do TS funcionar
// Julgo desnecessario a instalção de um pacote apenas para retorno de status Code
//o console.error do instrutor seguia da forma:
//console.error.bind(console,err), existe algum beneficio em realizar dessa forma?
//é valido criar uma classe de service apenas para encapsular metodos padroes de repository?
//no curso o instrutor não seta codigos de erro em caso de falha na requisição, a lib
//esta apenas sendo utilizada para os casos de sucesso, e em alguns casos os codigos foram
//utilizados de forma errada pelo instrutor
//Da forma implementada pelo instrutor como retornar o objeto recem criado/atualizado?
//para ser usado em retornos da api?
