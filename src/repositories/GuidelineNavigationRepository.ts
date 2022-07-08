/* (c) Copyright Frontify Ltd., all rights reserved. */

import { HttpClient } from '../utilities/httpClient';
import { GuidelineNavigation, GuidelineNavigationUsageType } from '../types';

type GuidelineNavigationApi = {
    id: number;
    creator: number;
    created: string;
    modifier: Nullable<number>;
    modified: Nullable<string>;
    valid_to: Nullable<string>;
    project_id: number;
    guideline_id: number;
    usage: GuidelineNavigationUsageType;
};

export const getGuidelineNavigations = async (guidelineId: number): Promise<GuidelineNavigation[]> => {
    const { result } = await HttpClient.get<GuidelineNavigationApi[]>(`/api/guideline/${guidelineId}/navigation`);
    return result.data.map(mapToGuidelineNavigationType);
};

const mapToGuidelineNavigationType = (object: GuidelineNavigationApi): GuidelineNavigation => ({
    id: object.id,
    creator: object.creator,
    created: object.created,
    modifier: object.modifier,
    modified: object.modified,
    validTo: object.valid_to,
    projectId: object.project_id,
    guidelineId: object.guideline_id,
    usage: object.usage,
});
