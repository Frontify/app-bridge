import ApiResponse from "./ApiResponse";

export default interface CrossDocumentMessageResponse<T> extends ApiResponse<T> {
    success: boolean;
    topic: string;
    token: string;
    data?: T;
}
