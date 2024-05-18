export class CreateProductDto {
    private constructor(
        public readonly name: string,
        public readonly aveliable: any,
        public readonly price: number,
        public readonly description: string,
        public readonly user: string, //id
        public readonly category: string,//id

    ) { }

    static create = (object: any): [string?, CreateProductDto?] => {

        const { name, aveliable, price, description, user, category } = object;
        let aveliableBoolean = false;
        if (typeof aveliable !== 'boolean') {
            aveliableBoolean = (aveliable === 'true');
        }

        if (!name) return ['name is required', undefined]
        if (!price) return ['price is required', undefined]
        if (!description) return ['description is required', undefined]
        if (!user.id) return ['user is required', undefined]
        if (!category) return ['category is required', undefined]
        return [undefined, new CreateProductDto(name, aveliableBoolean, price, description, user.id, category)]
    }


}