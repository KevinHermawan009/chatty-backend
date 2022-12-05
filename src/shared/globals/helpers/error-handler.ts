import HTTP_STATUS from 'http-status-codes';


export interface IErrorResponse {
    message: string;
    statusCode: number;
    status: string;
    serializeErrors(): IError;
}

export interface IError{
    message: string;
    statusCode: number;
    status: string;
    // status1: string;
}

//error here was error constructor from node
//so every property or accessable property or methods that are available in this class will be made available
export abstract class CustomError extends Error {
    abstract statusCode: number; //any other class that extends  or call this abstract class will passing a message
    abstract status: string;
    // abstract status1: string;
      //any other class that extends  or call this abstract class will passing a message
    constructor (message: string) {
        // 'super(); like inheritance of children -> to children that extends this class
        // 'super(); called because this custom arrow class is extending error constructor ('extends Error ')
        // means all what we define here ('statusCode, status') will be made available in our custom arrow class
        super(message); 
    }
    serializeErrors(): IError{
        return{
            message: this.message, //from constructor
            status: this.status, //coming from 'Error' class where its MUST defined in 'IError' and inside 'CustomError' 
            statusCode: this.statusCode, //coming from 'Error' class where its MUST defined in 'IError' and inside 'CustomError' 
            // status1: this.status1
        };
    }
}

//#region error class 
export class JoiRequestValidationError extends CustomError {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    status = 'error';

    constructor(message: string){
        super(message);
    }
}
export class BadRequestError extends CustomError {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    status = 'error';

    constructor(message: string){
        super(message);
    }
}
export class NotFoundError extends CustomError {
    statusCode = HTTP_STATUS.NOT_FOUND;
    status = 'error';

    constructor(message: string){
        super(message);
    }
}
export class NotAuthorizedError extends CustomError {
    statusCode = HTTP_STATUS.UNAUTHORIZED;
    status = 'error';

    constructor(message: string){
        super(message);
    }
}
export class FileTooLargeError extends CustomError {
    statusCode = HTTP_STATUS.REQUEST_TOO_LONG;
    status = 'error';

    constructor(message: string){
        super(message);
    }
}
export class ServerError extends CustomError {
    statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR;
    status = 'error';

    constructor(message: string){
        super(message);
    }
}
//#endregion