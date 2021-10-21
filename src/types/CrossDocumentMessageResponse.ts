import { Topic } from ".";

export type CrossDocumentMessageResponse<T> = {
    success: boolean;
    topic: Topic;
    token: string;
    data?: T;
};
