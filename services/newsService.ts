import NewsRepository from '../repositories/newsRepository';


interface News{
    publishDate: Date
}

class NewsService{

    search(term:string, page:any, perPage:any){
        return NewsRepository.find({'title' : new RegExp(`.*${term}*.`,'i')})
        .skip((page - 1 ) * perPage) // numero de registros (docs) a serem pulados
        .limit(perPage);
    }

    get(){

      //  const startDate = new Date("2021-09-16T14:13:23.426Z");
      //  const endDate = new Date("2021-09-17T14:14:23.426Z");
        
       return NewsRepository.find({'active': true}, 'title hat text publishDate')
     //   return NewsRepository.find({'publishDate' : {$gt:startDate,$lt:endDate}}, 'title hat publishDate')
        .sort({publishDate : -1}).limit(4);
        //posso fazer um .sort no retorno
    }

    getById(_id:string){
        return NewsRepository.findById(_id);
    }

    create(news:News){
        news.publishDate = new Date();
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