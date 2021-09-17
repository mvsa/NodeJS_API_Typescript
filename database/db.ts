//no codigo original o instrutor criou esse arquivo de conexão de bd na mesma pasta utils
//que ele denomina "infra"

//em DEV a DB_URL era:   private DB_URL = 'mongodb://localhost:27017/db_portal'

//NECESSARIO implementar uso do .ENV
import mongoose from 'mongoose'

class Db{
    private DB_URL_DEV= 'mongodb://localhost:27017/db_portal';
    private DB_URL_PROD = 'mongodb://link-db/db_portal';

    createConnection(){
        mongoose.connect(this.DB_URL_DEV);
    }
}


export default Db;