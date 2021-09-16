import NewsService from '../services/newsService';
import { Request, Response } from 'express'
import * as HttpStatus from 'http-status';
import redis from 'redis';

import Helper from "../utils/helper"

class NewsController {

    get(req: Request, res: Response) {

       // const cliente = redis.createClient(); local
        const cliente = redis.createClient(6379,'redis');

        cliente.get('news', (err, reply) => {
            if (reply) {  //se ja tiver algo no redis com a chave 'news'
                Helper.sendResponse(res, HttpStatus.OK, JSON.parse(reply));  //retorna os dados do redis (mais rapido)
            } else {
                //se não tiver, tras do banco e seta no redis para a proxima
                NewsService.get()
                    .then(news => {
                        cliente.set('news', JSON.stringify(news));
                        cliente.expire('news', 20);  //expirar em 20 sec
                        Helper.sendResponse(res, HttpStatus.OK, news);
                    })
                    .catch(err => console.error('erro', err));
            }
        })
    }

    getById(req: Request, res: Response) {
        const _id = req.params.id;

        NewsService.getById(_id)
            .then(news => Helper.sendResponse(res, HttpStatus.OK, news))
            .catch(err => console.error('erro', err));
    }

    create(req: Request, res: Response) {
        const vm = req.body;

        NewsService.create(vm)
            .then(news => Helper.sendResponse(res, HttpStatus.CREATED, "Noticia cadastrada com sucesso"))
            .catch(err => console.error('erro', err));
    }

    update(req: Request, res: Response) {
        const _id = req.params.id;
        const news = req.body;

        NewsService.update(_id, news)
            .then(news => Helper.sendResponse(res, HttpStatus.OK, `Noticia foi atualizada`))
            .catch(err => console.error('erro', err));

    }

    delete(req: Request, res: Response) {
        const _id = req.params.id

        NewsService.delete(_id)
            .then(() => Helper.sendResponse(res, HttpStatus.OK, 'Noticia deletado com sucessos'))
            .catch(err => console.error('erro', err));
    }

}

export default new NewsController();

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