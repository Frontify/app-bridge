import { Topic } from '.';

export type CrossDocumentMessage<T = Record<string, unknown>> = {
    topic: Topic;
    token: string;
    data?: T;
};
