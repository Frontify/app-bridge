/* (c) Copyright Frontify Ltd., all rights reserved. */

export type Asset = {
    creator_name: string;
    ext: string;
    external_url?: string;
    file_id: string;
    filename?: string;
    generic_url: string;
    height: number | null;
    id: number;
    name?: string;
    object_type: string;
    origin_url?: string;
    preview_url: string;
    project_id: number;
    project_name?: string;
    project_type?: string;
    size?: number;
    status?: string;
    title?: string;
    width: number | null;
};
