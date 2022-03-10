export class FetchError extends Error {
    constructor(topic: string) {
        super(`Call with topic ${topic} failed.`);
        this.name = 'FetchError';
    }
}
