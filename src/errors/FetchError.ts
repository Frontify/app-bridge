import { AllowedFetchKeys } from "../Actions";

export default class FetchError extends Error {
    constructor(key: AllowedFetchKeys) {
        super(`Call with key ${key} failed.`);
    }
}
