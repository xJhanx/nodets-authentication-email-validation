import { ProductModel } from "../../../data";
import { CustomError, PaginationDto, ProductEntity } from "../../../domain";

export class ProductService {

    public list = async (data : PaginationDto) => {
        const { page, limit } = data;

        try {
            // const total = await CategoryModel.countDocuments();
            // const categories = await CategoryModel.find().skip((page - 1) * limit).limit(limit);
            const [total , categories] = await Promise.all([
                ProductModel.countDocuments(),
                ProductModel.find().skip((page - 1) * limit).limit(limit).populate('user').populate('category'),
            ]);

            return {
                limit : limit,
                page : page,
                total : total,
                previus : `api/product/list?page=${page+1}&limit=${limit}`,
                next : ((page-1) != 0) ? `api/product/list?page=${page-1}&limit=${limit}` : null,
                categories : categories,
            }
        } catch (error) {
            console.log(error);
            return CustomError.internalServerError('Something went wrong listing data');
        }
    }
    //todo : make the entity and store registers
    public store = async (data: ProductEntity) => {
        try {
            const alreadyExists = await ProductModel.findOne({ name: data.name });
            if(alreadyExists) return CustomError.unauthorized('Product already exists');
            const product = new ProductModel(data);
            return await product.save();

        } catch (error) {
            console.log(error);
            return CustomError.internalServerError('Something went wrong');
        }
    }
}