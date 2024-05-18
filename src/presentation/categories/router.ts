import { Router } from "express";
import { CategoryController } from "./controller";
import { categoryService } from "./services/category";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class CategoryRouter {

    static get routes() {

        const router = Router();
        const serviceCategory = new categoryService();
        const categoryController = new CategoryController(serviceCategory);

        router.get('/', categoryController.getCategories);
        router.get('/getCategories',[AuthMiddleware.validateJWT], categoryController.getCategories);
        router.post('/create',[AuthMiddleware.validateJWT], categoryController.createCategory);

        return router;
    }
}