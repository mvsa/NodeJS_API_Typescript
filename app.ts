import express from "express";
import bodyparser from 'body-parser';
import cors from 'cors';

import Db from './database/db';
import NewsController from './controller/newsController';
import Auth from './config/auth';

import upload from './utils/uploads';

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

    enableCors(){
        const options: cors.CorsOptions = {
            methods: "GET,OPTIONS,PUT,POST,DELETE",
            origin:"*" //poderia passar endereço do front a qual ele iria aceitar
        }

        this.app.use(cors(options))
    }

    middleware(){
        this.enableCors();
        this.app.use(bodyparser.json());
        this.app.use(bodyparser.urlencoded({extended:false})); //para que seja possivel trabalhar com query string(?)
    }


    //As rotas poderiam ser encapsuladas para evitar repetição de codigo
    routes(){
        this.app.route("/uploads").post(upload.single('file'),(req,res)=>{
            try{
                res.send("Arquivo enviado")
            }catch(err){
                console.error('erro', err)
            }   
        });

        this.app.use(Auth.validate);
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