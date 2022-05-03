/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { Asset } from '../types/Asset';

export class AssetDummy {
    static with(id: number): Asset {
        return {
            id,
            name: `Asset ${id}`,
            filename: `asset-${id}`,
            creator_name: 'Frontify',
            ext: 'jpg',
            file_id: `a_random_file_id_${id}`,
            height: 1080,
            width: 1920,
            size: 3405,
            object_type: 'ASSET',
            generic_url: `https://dummy.frontify.test/generic_url_${id}`,
            preview_url: `https://dummy.frontify.test/preview_url_${id}`,
            origin_url: `https://dummy.frontify.test/origin_url_${id}`,
            external_url: `https://dummy.frontify.test/external_url_${id}`,
            project_id: 123,
        };
    }
}
