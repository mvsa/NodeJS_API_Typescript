import express from "express";
import bodyparser from 'body-parser';

import Db from './database/db';
import NewsController from './controller/newsController';


class Startup{
    public app: express.Application;
    private _db: Db;
    private bodyparser:any;

    constructor() {
        this.app = express(); 
        this._db = new Db();
        this._db.createConnection();
        this.middleware();
        this.routes();    
    }

    middleware(){
        this.app.use(bodyparser.json());
        this.app.use(bodyparser.urlencoded({extended:false})); //para que seja possivel trabalhar com query string(?)
    }
    //As rotas poderiam ser encapsuladas para evitar repetição de codigo
    routes(){
        this.app.route('/').get((req,rest)=>{
            rest.send({versao: '0.0.1'})
        });

        this.app.route("/api/v1/news").get(NewsController.get);
        this.app.route("/api/v1/news/:id").get(NewsController.getById);
        this.app.route("/api/v1/news").post(NewsController.create);
        this.app.route("/api/v1/news/:id").put(NewsController.update);
        this.app.route("/api/v1/news/:id").delete(NewsController.delete);
    }
}

export default new Startup();