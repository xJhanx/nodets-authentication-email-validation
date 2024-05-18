import { CustomError } from "../errors/custom.error";

export class ProductEntity {

    private constructor(        public readonly name: string,
        public readonly aveliable: boolean,
        public readonly price: number,
        public readonly description: string,
        public readonly user: string, //id
        public readonly category: string,//id
    ){}

    static fromObject(object : any): ProductEntity {

        if(!object.name) throw CustomError.badRequest('Invalid name');
        if(!object.aveliable) throw CustomError.badRequest('Invalid aveliable');
        if(!object.price) throw CustomError.badRequest('Invalid price');
        if(!object.description) throw CustomError.badRequest('Invalid description');
        if(!object.user) throw CustomError.badRequest('Invalid user');
        if(!object.category) throw CustomError.badRequest('Invalid category');

        return new ProductEntity(object.name, object.aveliable, object.price, object.description, object.user, object.category);
    }
}