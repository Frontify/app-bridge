import { FetchKey } from "../Actions";

export class FetchError extends Error {
    constructor(key: FetchKey) {
        super(`Call with key ${key} failed.`);
    }
}
