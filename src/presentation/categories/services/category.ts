import { CategoryModel } from "../../../data";
import { CreateCategoryDto, CustomError, PaginationDto, UserEntity } from "../../../domain";

export class categoryService {

    public getCategories = async (paginationDto: PaginationDto) => {
        const { page, limit } = paginationDto;

        try {
            // const total = await CategoryModel.countDocuments();
            // const categories = await CategoryModel.find().skip((page - 1) * limit).limit(limit);
            const [total , categories] = await Promise.all([
                CategoryModel.countDocuments(),
                CategoryModel.find().skip((page - 1) * limit).limit(limit),
            ]);
            return {
                limit : limit,
                page : page,
                total : total,
                previus : `api/category/getCategories?page=${page+1}&limit=${limit}`,
                next : ((page-1) != 0) ? `api/category/getCategories?page=${page-1}&limit=${limit}` : null,
                categories : categories.map((category) => {
                    return {
                        id: category.id,
                        name: category.name,
                        aveliable: category.aveliable
                    }
                })
            }
        } catch (error) {
            console.log(error);
            return CustomError.internalServerError('Something went wrong');
        }
    }

    public sotore = async (category: CreateCategoryDto, userEntity: UserEntity) => {
        try {
            const existCategory = await CategoryModel.findOne({ name: category.name });
            if (existCategory) throw CustomError.badRequest('Category already exist');
            const newCategory = new CategoryModel({ ...category, user: userEntity.id });
            newCategory.save();
            return {
                id: newCategory.id,
                name: newCategory.name,
                aveliable: newCategory.aveliable
            }
        } catch (error) {
            console.log(error);
            return CustomError.internalServerError('Something went wrong');
        }

    }
}
