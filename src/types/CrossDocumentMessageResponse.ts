/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Topic } from './Topic';

export type CrossDocumentMessageResponse<T> = {
    success: boolean;
    topic: Topic;
    token: string;
    data?: T;
};
