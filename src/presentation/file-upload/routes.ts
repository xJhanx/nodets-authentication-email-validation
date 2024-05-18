import { Router } from "express";
import { FileUploadController } from "./controller";
import { UploadFileService } from "./services/upload.service";
import { FileMiddleware } from "../middlewares/file.middleware";
import { TypeMiddleware } from "../middlewares/type.middleware";

export class FileUploadRoutes {
    static get routes() {

        const router = Router();
        const service = new UploadFileService();
        const controller = new FileUploadController(service);
        // no es buena practica pero lo subi aqui para qeu lo lo afecte el middel ware pero debi haber creaddo un nuevo controllador
        router.get('/download/:type/:fileName',controller.downloadFile);
        router.use(FileMiddleware.fileUpload());
        /** aqui no sabe que parametros se estan pasando por eso , se saca el param de la url  */
        router.use(TypeMiddleware.validTypes(['users', 'products']));

        router.post('/single/:type',controller.uploadFile);
        router.post('/multiple/:type',controller.uploadMultipleFiles);
        return router;

    }
}