export class InvalidOriginError extends Error {
    constructor() {
        super("The origin of this call is not allowed");
    }
}
