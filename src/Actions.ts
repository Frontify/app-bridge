//Fetch keys
export const GET_APP_STATE = "getAppState";
export const GET_THIRDPARTY_OAUTH2_TOKEN = "getThirdpartyOAuth2Token";
export const POST_APP_STATE = "postAppState";
export const POST_EXTERNAL_ASSET = "postExternalAsset";

export type allowedFetchKeys =
    | typeof GET_APP_STATE
    | typeof GET_THIRDPARTY_OAUTH2_TOKEN
    | typeof POST_APP_STATE
    | typeof POST_EXTERNAL_ASSET;

//Dispatch keys
export const DISPATCH_CLOSE_APP = "closeApp";

export type allowedDispatchKeys = typeof DISPATCH_CLOSE_APP;
