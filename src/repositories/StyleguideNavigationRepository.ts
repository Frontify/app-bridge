/* (c) Copyright Frontify Ltd., all rights reserved. */

import { HttpClient } from '../utilities/httpClient';
import { GuidelineNavigation, GuidelineNavigationUsageType } from '../types';

type StyleguideNavigationApi = {
    id: number;
    creator: number;
    created: string;
    modifier: Nullable<number>;
    modified: Nullable<string>;
    valid_to: Nullable<string>;
    project_id: number;
    styleguide_id: number;
    usage: GuidelineNavigationUsageType;
};

export const getStyleguideNavigations = async (guidelineId: number): Promise<GuidelineNavigation[]> => {
    const { result } = await HttpClient.get<StyleguideNavigationApi[]>(`/api/styleguide/${guidelineId}/navigation`);
    return result.data.map(mapToStyleguideNavigationType);
};

const mapToStyleguideNavigationType = (object: StyleguideNavigationApi): GuidelineNavigation => ({
    id: object.id,
    creator: object.creator,
    created: object.created,
    modifier: object.modifier,
    modified: object.modified,
    validTo: object.valid_to,
    projectId: object.project_id,
    styleguideId: object.styleguide_id,
    usage: object.usage,
});
