export class ApiConnectionError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ApiConnectionError';
    }
}