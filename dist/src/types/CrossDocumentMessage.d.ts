import { Topic } from "./Topic";
export default interface CrossDocumentMessage<T = Record<string, unknown>> {
    topic: Topic;
    token: string;
    data?: T;
}
