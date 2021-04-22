import { FetchKey } from "../Actions";
export default class FetchError extends Error {
    constructor(key: FetchKey);
}
