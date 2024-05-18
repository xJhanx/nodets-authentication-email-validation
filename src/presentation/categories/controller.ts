import { Request, Response } from "express";
import { categoryService } from "./services/category";
import { CreateCategoryDto, CustomError, PaginationDto } from "../../domain";

export class CategoryController {

    constructor(private readonly categoryService: categoryService) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).send(error.message);
        }
        return res.status(500).send('Something went wrong');
    }

    getCategories = (req: Request, res: Response) => {

        const {page = 1 , limit = 10 } = req.query;
        const [error,paginationDto] = PaginationDto.crate(+page, +limit);
        if(error) return res.status(400).send(error);
 
        this.categoryService.getCategories(paginationDto!).then(
            categories => res.status(200).send(categories)
        ).catch(
            (error) => this.handleError(error, res)
        )
    }
    createCategory = (req: Request, res: Response) => {
        const [error, createCategoryDto] = CreateCategoryDto.create(req.body);

        if (error) {
            return res.status(400).send(error);
        }
        this.categoryService.sotore(createCategoryDto!, req.body.user!).then(
            response => res.status(200).send(response)
        ).catch(
            (error) => this.handleError(error, res)
        );

    }
}