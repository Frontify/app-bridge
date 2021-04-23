export interface ThirdpartyOAuth2Token {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    name: string;
    token_type: "Bearer";
}
export interface Asset {
    id: number;
}
