export type User = {
    id: number;
    account_id: number;
    name: string;
    email: string;
    preview_url_without_placeholder: string;
    gravatar_hash: string;
    image: {
        image: string;
        original: string;
        x: string;
        y: string;
        width: string;
        height: string;
    };
    original: string;
    created: string;
    created_localized: string;
    role: string | null;
    language: string;
    localization_options: { value: string; name: string }[];
    timezone: string;
    signup_mode: string;
    organization: string;
    two_factor_forced: false;
    success: true;
};
