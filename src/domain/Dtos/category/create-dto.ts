export class CreateCategoryDto {

    constructor(
        public readonly name: string,
        public readonly aveilable: boolean
    ) { }

    static create(object: any): [string?, CreateCategoryDto?] {
        const { name, aveilable } = object;
        let aveilableBoolean = aveilable;
        if (!name) return ['name is required', undefined];
        if (aveilable === undefined) return ['aveilable is required', undefined];

        if (typeof aveilable !== 'boolean') {
            aveilableBoolean = (aveilable === 'true');
        }
        return[undefined,new CreateCategoryDto(name, aveilableBoolean)];


    }
}