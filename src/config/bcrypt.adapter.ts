import {compareSync,hashSync} from 'bcrypt'


export const BcryptAdapter = {

    hash : (password : string) => {
        const salt = 10;
        return hashSync(password,salt)
    },
    compare : (password : string , hash : string) => {
        return compareSync(password,hash)
    }
}