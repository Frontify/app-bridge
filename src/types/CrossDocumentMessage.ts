/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Topic } from './Topic';

export type CrossDocumentMessage<T = Record<string, unknown>> = {
    topic: Topic;
    token: string;
    data?: T;
};
