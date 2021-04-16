//Fetch keys
export const GET_APP_STATE = "getAppState";
export const GET_THIRDPARTY_OAUTH2_TOKEN = "getThirdpartyOAuth2Token";
export const PUT_APP_STATE = "putAppState";
export const POST_EXTERNAL_ASSET = "postExternalAsset";

export type AllowedFetchKeys =
    | typeof GET_APP_STATE
    | typeof GET_THIRDPARTY_OAUTH2_TOKEN
    | typeof PUT_APP_STATE
    | typeof POST_EXTERNAL_ASSET;

//Dispatch keys
export const DISPATCH_CLOSE_APP = "closeApp";

export type allowedDispatchKeys = typeof DISPATCH_CLOSE_APP;
