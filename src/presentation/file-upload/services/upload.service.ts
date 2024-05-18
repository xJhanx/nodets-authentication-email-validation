import { UploadedFile } from "express-fileupload"
import path from "path";
import fs from "fs";
import { Uuid } from "../../../config";
import { CustomError } from "../../../domain";
export class UploadFileService {


    constructor(public uuid = Uuid) { }
    private pathDefault: string = "uploads/";

    public checkFolder = async (folder: string) => {
        if (!fs.existsSync(folder)) {
            await fs.mkdirSync(folder);
        }
    }

    public upload = async (file: UploadedFile,
        folder: string = 'uploads',
        validExtensions: string[] = ['jpg', 'png', 'jpeg', 'gif']
    ) => {
        try {
            const fileExtension = file.mimetype.split('/')[1];
            const destination = path.resolve(__dirname, `../../../../${this.pathDefault}`, folder);
            if (!validExtensions.includes(fileExtension)) {
                return CustomError.badRequest('Invalid file extension');
            };
            
            await this.checkFolder(destination);
            const nameFile = `${this.uuid.v4()}.${fileExtension}`
            await file.mv(`${destination}/${nameFile}`);
            return nameFile;

        } catch (error) {
            console.log(error);
            return "Error uploading file"
        }
    }

    public uploadMultiple = async (files: UploadedFile[],
        folder: string = 'uploads',
        validExtensions: string[] = ['jpg', 'png', 'jpeg', 'gif']
    ) => {
        try {
            const [filedata]: any = files;
            const fileNames = Promise.all(filedata.map((file: any) =>
                this.upload(file, folder, validExtensions)));
            return fileNames;

        } catch (error) {
            console.log(error);
            return "Error uploading file"
        }
    }


}