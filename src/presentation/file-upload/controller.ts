import { Request, Response } from "express"
import { UploadFileService } from "./services/upload.service"
import { UploadedFile } from "express-fileupload";
import path from "path";
import fs from "fs";

export class FileUploadController {

    constructor(private readonly uploadFileService : UploadFileService) {}


    public uploadFile = async (req: Request, res: Response) => {
        const folder = req.params.type;
        const file = req.body.files.at(0) as UploadedFile;        
        this.uploadFileService.upload(file,folder).then((message) => res.send(message)).catch((error) => res.send(error))
    }

    public uploadMultipleFiles = async (req: Request, res: Response) => {
        const files = req.body.files as UploadedFile[];        
        const folder = req.params.type;

        this.uploadFileService.uploadMultiple(files,folder).
        then((message) => res.send(message)).
        catch((error) => res.send(error))
    }

    public downloadFile = async (req: Request, res: Response) => {
        const {type = '', fileName = ''} = req.params;

        const filepath = path.resolve(__dirname, `../../../uploads/${type}/${fileName}`);
        if(!fs.existsSync(filepath)){
            return res.status(404).send('File not found');
        }
        res.sendFile(filepath);
    }

}