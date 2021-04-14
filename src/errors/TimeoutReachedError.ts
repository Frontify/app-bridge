import { AllowedFetchKeys } from "../Actions";

export default class TimeoutReachedError extends Error {
    constructor(key: AllowedFetchKeys) {
        super(`Timeout for call with key "${key}" expired. Call was aborted.`);
    }
}
