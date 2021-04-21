import { FetchKey } from "../Actions";

export default class TimeoutReachedError extends Error {
    constructor(key: FetchKey) {
        super(`Timeout for call with key "${key}" expired. Call was aborted.`);
    }
}
