import { NextFunction, Request, Response } from "express";

export class TypeMiddleware {

    static validTypes(validTypes: string[]) {

        return async (req: Request, res: Response, next: NextFunction) => {
            const type = req.url.split('/').at(2);
            console.log(type);
            if (!validTypes.includes(type!)) return res.status(400).send('Invalid type');

            next();
        }

    }
}