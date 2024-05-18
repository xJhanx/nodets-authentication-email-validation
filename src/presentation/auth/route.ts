import { Router } from "express";
import { AuthController } from "./controller";
import { AuthService } from "./services/auth.service";
import { EmailService } from "./services/email";
import { envs } from "../../config";

export class AuthRoutes {

    static get routes() {
        const router = Router();
        const email = new EmailService(
            envs.MAILER_SERVICE,
            envs.MAILER_EMAIL,
            envs.MAILER_SECRET_KEY
        );
        const service = new AuthService(email);
        const controller = new AuthController(service);

        router.post('/login',controller.login);
        router.post('/register',controller.register);
        router.get('/validate-email/:token',controller.validateEmail);


        return router;

    }
}
