import { CustomError } from "../../errors/custom.error";

export class PaginationDto {

    private constructor(
        public readonly page: number,
        public readonly limit: number,
    ){}

    static crate(page = 1 , limit = 10): [string?,PaginationDto?] {

        if(isNaN(page) || isNaN(limit)) return ['page and limit must be numbers',undefined];
        if(isNaN(page) || page <= 0) return ['page must be greater than 0',undefined];
        if(isNaN(limit) || limit <= 0) return ['limit must be greater than 0',undefined];

        return [undefined,new PaginationDto(page,limit)];
    }



}