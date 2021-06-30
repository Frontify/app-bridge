import { Topic } from "./Topic";
export default interface CrossDocumentMessageResponse<T> {
    success: boolean;
    topic: Topic;
    token: string;
    data?: T;
}
