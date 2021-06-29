export default class TimeoutReachedError extends Error {
    constructor(topic: string) {
        super(`Timeout for call with topic "${topic}" expired. Call was aborted.`);
    }
}
