import { allowedFetchKeys } from "../Actions";

export default class TimeoutReachedError extends Error {
    constructor(key: allowedFetchKeys) {
        super(`Timeout for call with key "${key}" expired. Call was aborted.`);
    }
}
