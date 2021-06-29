export default interface OauthTokens {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    name: string;
    token_type: "Bearer";
}
