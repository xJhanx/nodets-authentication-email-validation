import { Request, Response } from "express";
import { ProductService } from "./services/product.service";
import { CreateProductDto, PaginationDto } from "../../domain";

export class ProductController {
    constructor(private readonly productService: ProductService) {
    }


    public getProducts = async (req: Request, res: Response) => {
        const {page = 1 , limit = 10 } = req.query;
        const [error,paginationDto] = PaginationDto.crate(+page, +limit);

        if(error) return res.status(400).send(error);

        this.productService.list(paginationDto!).then(
            products => res.status(200).send(products)
        ).catch(
            error => res.send(error)
        );
    }

    public createProduct = (req: Request, res: Response) => {
        const [error, data] = CreateProductDto.create(req.body);
        if (error) return res.status(400).send(error);

        this.productService.store(data!).then(
            product => res.status(200).send(product)
        ).catch(
            error => res.send(error)
        );
    }

}