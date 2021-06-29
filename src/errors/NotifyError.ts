export default class FetchError extends Error {
    constructor(topic: string) {
        super(`Call with topic ${topic} failed.`);
    }
}
