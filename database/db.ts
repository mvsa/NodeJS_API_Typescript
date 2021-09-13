//no codigo original o instrutor criou esse arquivo de conexão de bd na mesma pasta utils
//que ele denomina "infra"

import mongoose from 'mongoose'

class Db{
    private DB_URL = 'mongodb://localhost:27017/db_portal'

    createConnection(){
        mongoose.connect(this.DB_URL);
        console.log('Connected to MongoDb');
    }
}


export default Db;