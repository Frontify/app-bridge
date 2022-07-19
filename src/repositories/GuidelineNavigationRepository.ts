/* (c) Copyright Frontify Ltd., all rights reserved. */

import { HttpClient } from '../utilities/httpClient';
import { GuidelineNavigation, GuidelineNavigationUsage } from '../types';

type GuidelineNavigationApi = CamelKeysToSnakeCase<GuidelineNavigation>;

export const getGuidelineNavigations = async (guidelineId: number): Promise<GuidelineNavigation[]> => {
    const { result } = await HttpClient.get<GuidelineNavigationApi[]>(`/api/guideline/${guidelineId}/navigation`);
    return result.data.map(mapToGuidelineNavigation);
};

const mapToGuidelineNavigation = (object: GuidelineNavigationApi): GuidelineNavigation => ({
    id: object.id,
    creator: object.creator,
    created: object.created,
    modifier: object.modifier,
    modified: object.modified,
    validTo: object.valid_to,
    projectId: object.project_id,
    guidelineId: object.guideline_id,
    usage: object.usage.toLocaleLowerCase() as GuidelineNavigationUsage,
});
