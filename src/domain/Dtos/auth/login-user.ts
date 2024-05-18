export class LoginDto {

    private constructor(
        public readonly email: string,
        public readonly password: string
    ) {}


    static create(object : any) : [string?,LoginDto?] {
        if(!object?.email) return ['email is required',undefined];
        if(!object?.password) return ['password is required',undefined];
        return [undefined,new LoginDto(object.email, object.password)];
    }
}