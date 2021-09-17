"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = `
    scalar Date

    type Query{
        newslist:[News]
        newsGetById(id:String): News
    }

    type Mutation{
        addNews(input:NewsInput): News
        updateNews(id:String, input:NewsInput): News
        deleteNews(id:String): News
    }

    type News{
        _id:String,
        hat:String,
        title:String,
        text:String,
        author:String,
        img:String,
        publishDate: Date,
        link: String,
        tag:String,
        active: Boolean
    }

    input NewsInput{
        _id:String,
        hat:String,
        title:String,
        text:String,
        author:String,
        img:String,
        publishDate: Date,
        link: String,
        tag:String,
        active: Boolean
    }



`;
// newsGetById(id:string): News
//fauncao(params):Retorno
