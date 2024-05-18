import Jwt from 'jsonwebtoken';
import { envs } from './envs';

const SECRET_SEED = envs.JWT_SEED;
export class JWTAdapter {

    static async generateToken(payload: any, duration = '2h') {
        //SECRET_SEED kei token
        const token = await Jwt.sign(payload, SECRET_SEED, {
            expiresIn: duration
        });

        if (!token) return null;
        return token;
    }

    
    static async validateTokenUser<T>(token: string) : Promise<T | null> {

        return new Promise((resolve, reject) => {

            Jwt.verify(token, SECRET_SEED, (err, decoded : any) => {
                if(err) resolve(null);
                if (!decoded.id) resolve(null);
                resolve(decoded.id) as T;
            });
        })
    }

    static async validateToken(token: string) : Promise<any> {

        return new Promise((resolve, reject) => {

            Jwt.verify(token, SECRET_SEED, (err, decoded : any) => {
                if(err) resolve(null);
                if (!decoded.email) resolve(null);
                resolve(decoded.email) ;
            });
        })
    }
}