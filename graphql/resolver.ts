import newsService from "../services/newsService";

const resolvers = {
    newslist: async () => await newsService.get(),

    newsGetById: async (args: any) => {
        return await newsService.getById(args.id);
    },

    addNews: async (args:any) =>{
        return await newsService.create(args.input);
    },

    deleteNews: async (args:any) =>{
        return await newsService.delete(args.id);
    },


    updateNews: async (args:any) =>{
        return await newsService.update(args.input._id, args.input);
    },


};

export default resolvers;