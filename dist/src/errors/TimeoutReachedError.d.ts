import { FetchKey } from "../Actions";
export default class TimeoutReachedError extends Error {
    constructor(key: FetchKey);
}
