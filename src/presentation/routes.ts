import { Router } from 'express';
import { AuthRoutes } from './auth/route';
import { CategoryRouter } from './categories/router';
import { ProductRouter } from './products/router';
import { FileUploadRoutes } from './file-upload/routes';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
    router.use('/api/auth', AuthRoutes.routes);
    router.use('/api/category',CategoryRouter.routes);
    router.use('/api/product',ProductRouter.routes);
    router.use('/api/file-upload',FileUploadRoutes.routes);
    return router;
  }


}

