import { BcryptAdapter, JWTAdapter, envs } from "../../../config";
import { UserModel } from "../../../data";
import { CustomError, LoginDto, RegisterUserDto, UserEntity } from "../../../domain";
import { EmailService } from "./email";

export class AuthService {

    constructor(private readonly emailService : EmailService) {
    }

    public register = async (userDto: RegisterUserDto) => {

        try {
            const exist = await UserModel.findOne({ email: userDto.email });
            if (exist) throw CustomError.badRequest('Email already exist')

            const user = new UserModel(userDto);
            user.password = BcryptAdapter.hash(userDto.password);
            user.save();

            const { password, ...userEntity } = UserEntity.fromObject(user);
            const token = await JWTAdapter.generateToken(
                {
                    id: userEntity.id,
                }
            );
            await this.sendEmail(userEntity.email);
            return {
                userEntity,
                token: token
            };

        } catch (error) {
            return error
        }

    }


    public loginUser = async (userDto: LoginDto) => {
        try {
            const user = await UserModel.findOne({ email: userDto.email });
            if (!user) throw CustomError.notFound('User not found');
            const { password, ...userEntity } = UserEntity.fromObject(user);
            const isValid = BcryptAdapter.compare(userDto.password, password);
            if (!isValid) throw CustomError.badRequest('Invalid credentials');
            const token = await JWTAdapter.generateToken(
                {
                    id: user.id,
                }
            );
            if (!token) throw CustomError.internalServerError('Error while generating token');
            return {
                userEntity,
                token: token
            }
        } catch (error) {
            console.log(error);
            return error;
        }

    }

    public validateEmail = async (token: string) => {
        try {
            const email = await JWTAdapter.validateToken(token);
            if (!email) throw CustomError.badRequest('Invalid token');
            const user = await UserModel.findOne({ email });

            if (!user) throw CustomError.badRequest('User not found');
            if(user.emailValidated) throw CustomError.badRequest('Email already validated');
            user.emailValidated = true;
            user.save();
            return "Email validated successfully";
        } catch (error) {
            return error
        }
    }

    public sendEmail = async (email: string) => {

        const token = await JWTAdapter.generateToken({email});
        const url = envs.URL_BASE;
        if(!token) throw CustomError.internalServerError('Error while generating token');

        const html =  `<h1>Validate your email</h1>  <p>Click on the link to validate your email</p>
        <a href="${url}/auth/validate-email/${token}">Validate your email : ${email}</a>`;

        await this.emailService.sendEmail({
            to : email,
            subject : "Validate your email",
            htmlBody : html,
        });
        return true
    }

}