import NewsRepository from '../repositories/newsRepository';
import NewsSchema from '../models/newSchema';

interface News{

}

class NewsService{

    get(){
        return NewsRepository.find({});
    }

    getById(_id:string){
        return NewsRepository.findById(_id);
    }

    create(news:News){
        return NewsRepository.create(news);
    }

    update(_id:string, news:News){
        return NewsRepository.findByIdAndUpdate(_id, news)
    }

    delete(_id:string){
        return NewsRepository.findByIdAndRemove(_id);
    }
}




export default new NewsService();

//Não foram realizadas quaisquer tipagens pelo instrutor
//O arquivo de service deveria reunir apenas codigos referentes a regras de negocio dentro
//da api
//o Instrutor está utilizando também para encapsular os metodos do repository default do
//mongoose, essa estratégia segue algum padrao(?)