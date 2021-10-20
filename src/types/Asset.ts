export type Asset = {
    id: number;
    creator_name: string;
    ext: string;
    file_id: string;
    generic_url: string;
    preview_url: string;
    height: number | null;
    name?: string;
    filename?: string;
    object_type: string;
    project_id: number;
    revision: number | null;
    revision_id: number;
    project_type?: string;
    project_name?: string;
    width: number | null;
    size?: number;
    title?: string;
};
