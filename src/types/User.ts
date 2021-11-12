export type User = {
    id: number;
    account_id: number;
    name: string;
    email: string;
    preview_url_without_placeholder: string;
    gravatar_hash: string;
    image: {
        image: "https://images.frontify.test/local/clarify/eyJwYXRoIjoiXC9wdWJsaWNcL3VwbG9hZFwvYXZhdGFyXC9jNFwvODkyZWViNjAzMzAxZTBjNjA0MDkxOThlNzlkMGVkOWUtMTU5NzM5NzY1OS5wbmcifQ:clarify:_LinHPsAO4qhk0T0nk8cLSo_JOA1Brh-3kScxIdZ6uk?width=400&rect=0,0,800,800&reference_width=800";
        original: "https://images.frontify.test/local/clarify/eyJwYXRoIjoiXC9wdWJsaWNcL3VwbG9hZFwvYXZhdGFyXC9jNFwvODkyZWViNjAzMzAxZTBjNjA0MDkxOThlNzlkMGVkOWUtMTU5NzM5NzY1OS5wbmcifQ:clarify:_LinHPsAO4qhk0T0nk8cLSo_JOA1Brh-3kScxIdZ6uk?width={width}";
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
