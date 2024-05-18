import { NextFunction, Request, Response } from "express";

export class FileMiddleware {

    static fileUpload() {
        return async (req: Request, res: Response, next : NextFunction) => {

            if(!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).send('No files were uploaded. o para ver el archivo deshabilita el middleware , me dio pereza ');
            }

            if (!Array.isArray(req.files)) {
                req.body.files = [req.files.file];
            } else {
                req.body.files = req.files.file;
            }
            next();
        }
    }
}