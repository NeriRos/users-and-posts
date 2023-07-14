export class DeliveryError extends Error {
    statusCode: number = 0;
    message: string = "";
    responseBody: any = null;

    constructor(message: string, statusCode: number, responseBody: any) {
        super();

        this.name = 'DeliveryError';
        this.statusCode = statusCode;
        this.message = message;
        this.responseBody = responseBody;
    }
}