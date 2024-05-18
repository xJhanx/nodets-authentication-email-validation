import { Request, Response } from "express";
import { HttpStatusCode } from "../../domain/errors/status.codes";
import { LoginDto, RegisterUserDto } from "../../domain";
import { AuthService } from "./services/auth.service";

export class AuthController {

    //Dependenci Injection 
    constructor(public readonly registerUserService : AuthService){
    }


    public register = (req : Request, res : Response) => {
        const [error,user] = RegisterUserDto.create(req.body);
        if(error) return res.status(HttpStatusCode.BAD_REQUEST).send({error});

        this.registerUserService.register(user!).then(
            user => res.status(200).send(user),
        ).catch(
            error => res.send(error)
        );
    }

    public login = async (req : Request, res : Response) => {
        try {
            const [error ,user] = LoginDto.create(req.body);
            if(error) return res.status(HttpStatusCode.BAD_REQUEST).send({error});            
            res.send(await this.registerUserService.loginUser(user!))
        } catch (error) { 
            res.send(error)
        }
    }

    public validateEmail = (req : Request, res : Response) => {
        const { token } = req.params;

        this.registerUserService.validateEmail(token).then(
            message => res.status(200).send(message),
        ).catch(
            error => res.send(error)
        )
    }
}