import { regularExps } from "../../../config";

export class RegisterUserDto {

    private constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
    ) {}


    static create(object : {[key:string] : any}) : [string?,RegisterUserDto?] {
        
        if(!object.name) return ['name is required'];
        if(!regularExps.email.test(object.email)) return ['email is required'];
        if(!object.password) return ['password is required'];

        return [undefined,new RegisterUserDto(object.name, object.email, object.password)];
    }
}