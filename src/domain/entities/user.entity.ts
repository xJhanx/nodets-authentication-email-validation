import { CustomError } from "../errors/custom.error";

export class UserEntity {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly email: string,
        public readonly emailValidated: boolean,
        public readonly password: string,
        public readonly role: string[],
        public readonly img? : string
    ) {}


    static fromObject(object : {[key:string] : any}) : UserEntity {
        
        if(!object.id && object._id) throw CustomError.badRequest('Invalid id');
        if(!object.name) throw CustomError.badRequest('Invalid name');
        if(!object.email) throw CustomError.badRequest('Invalid email');
        if(object.emailValidated === undefined) throw CustomError.badRequest('Invalid email validated');
        if(!object.password) throw CustomError.badRequest('Invalid password');
        if(!object.role) throw CustomError.badRequest('Invalid role');

        return new UserEntity(object.id || object._id, object.name, object.email, object.emailValidated, object.password, object.role, object.img);
    }
}