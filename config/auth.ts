import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Configs from './config';


class Auth{
    validate(req:Request,res:Response,next:NextFunction){
        
        const authHeader = req.headers.authorization // req.headers['x-access-token'](?)

        if(!authHeader){
            return res.status(401).send({
                sucess:false,
                message:'Unauthorized'
            })
        }

        //const [, token] = authHeader.split(' ');

        jwt.verify(authHeader, Configs.secret,(err,decoded)=>{
            console.log(decoded)
            if(err){
                return res.status(403).send({
                    sucess:false,
                    message:'Forbidden'
                });
            }else{
                next();
            }
            
        })
    }
}

export default new Auth();