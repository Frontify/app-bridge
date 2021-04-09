import { allowedFetchKeys } from "../Actions";

export default class FetchError extends Error {
    constructor(key: allowedFetchKeys) {
        super(`Call with key ${key} failed.`);
    }
}
