import { HttpStatusCode } from "./status.codes";

export class CustomError  {

    constructor(
        public  statusCode: number,
        public message: string
    ) {
        // super(message);
    }

    static badRequest(message: string): CustomError {
        return new CustomError(HttpStatusCode.BAD_REQUEST, message);
    }

    static unauthorized(message: string): CustomError {
        return new CustomError(HttpStatusCode.UNAUTHORIZED, message);
    }
    static forbidden(message: string): CustomError {
        return new CustomError(HttpStatusCode.FORBIDDEN, message);
    }

    static notFound(message: string): CustomError {
        return new CustomError(HttpStatusCode.NOT_FOUND, message);
    }

    static internalServerError(message: string): CustomError {
        return new CustomError(HttpStatusCode.INTERNAL_SERVER_ERROR, message);
    }



}