import express from "express";
import bodyparser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import { graphqlHTTP } from "express-graphql";

import Db from './database/db';
import Auth from './config/auth';
import upload from './utils/uploads';
import newsRouter from './routes/newsRouter';
import schema from "./graphql/schemas";
import resolvers from "./graphql/resolver";

class Startup {
    public app: express.Application;
    private _db: Db;
    private bodyparser: any;

    constructor() {
        this.app = express();
        this._db = new Db();
        this._db.createConnection();
        this.middleware();
        this.routes();
    }

    enableCors() {
        const options: cors.CorsOptions = {
            methods: "GET,OPTIONS,PUT,POST,DELETE",
            origin: "*" //poderia passar endereço do front a qual ele iria aceitar
        }

        this.app.use(cors(options))
    }

    middleware() {
        this.enableCors();
        this.app.use(bodyparser.json());//deprecated
        this.app.use(bodyparser.urlencoded({ extended: false })); //para que seja possivel trabalhar com query string(?)
        this.app.use(compression());
        //permite que acesso do express a pasta estatica para podermos baixar files(?)
        this.app.use('/exports', express.static(process.cwd() + '/exports'));
    }


    //As rotas poderiam ser encapsuladas para evitar repetição de codigo
    routes() {
        this.app.route("/uploads").post(upload.single('file'), (req, res) => {
            try {
                res.send("Arquivo enviado")
            } catch (err) {
                console.error('erro', err)
            }
        });

        this.app.use('/graphql', graphqlHTTP({
            schema,
            rootValue:resolvers,
            graphiql:true  //debug mode (navegador)
            
        }))


        this.app.route('/').get((req, rest) => {
            rest.send({ versao: '0.0.1' })
        });
        this.app.use(Auth.validate);
        //News Routers
        this.app.use("/api/v1", newsRouter)
    }
}

export default new Startup();