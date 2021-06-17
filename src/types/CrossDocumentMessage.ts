export default interface CrossDocumentMessage<T = Record<string, unknown>> {
    topic: string;
    token: string;
    data?: T;
}
