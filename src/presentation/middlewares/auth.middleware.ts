import { NextFunction, Request, Response } from "express";
import { JWTAdapter } from "../../config";
import { UserModel } from "../../data";
import { UserEntity } from "../../domain";

export class AuthMiddleware {


    /**
     * 
     * @param req 
     * @param res 
     * @param next // function express 
     */
    static validateJWT = async (req: Request, res: Response, next: NextFunction) => {
        
        const authorization = req.header('Authorization');
        
        if(!authorization) return res.status(401).send({error: 'No token provided'});
        if(!authorization.startsWith('Bearer ')) return res.status(401).send({error: 'Invalid token - starts with Bearer'});

        const token = authorization.split(' ').at(1) || '';
        try {
            const payload = await JWTAdapter.validateTokenUser<{id: string}>(token);
            if(!payload) return res.status(401).send({error: 'Invalid validate token'});

            const user = await UserModel.findOne({id: payload.id});
            if(!user) return res.status(401).send({error: 'Error Invalid user token'});

            req.body.user = UserEntity.fromObject(user);
            next();
        } catch (error) {
            console.log(error);
            res.status(401).send({error: 'Internal server error'});
        }
    }
}