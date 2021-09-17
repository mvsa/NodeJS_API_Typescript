import js2csv from "json2csv";
import {v4 as uuid} from "uuid";
import fs from 'fs';


const fields: string[] = ['_id', 'hat', 'title', 'text', 'author', 'img', 'publishDate', 'link', 'active'];
const opts: object = { fields };

class ExportFiles {

    tocsv = (news: any) => {
        try {
            const csv = js2csv.parse(news, opts);
            const filename = "/" + uuid() + ".csv";
            fs.writeFile('./exports' + filename, csv, (err) => {
                if (err) throw new Error("ERRO");
                console.log('Arquivo criado');
            });
            return filename;
        } catch (error) {
            console.error('Erro', error);
        }
    }

}

export default new ExportFiles();

