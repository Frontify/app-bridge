export default interface CrossDocumentMessageResponse<T> {
    success: boolean;
    topic: string;
    token: string;
    data?: T;
}
