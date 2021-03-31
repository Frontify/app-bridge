//Fetch keys
export const GET_APP_STATE = "getAppState";
export const POST_APP_STATE = "postAppState";
export const POST_EXTERNAL_ASSET = "postExternalAsset";

//Dispatch keys
export const DISPATCH_CLOSE_MODAL = "closeModal";
export const DISPATCH_OAUTH2_FLOW = "oAuth2Flow";

//Subscription keys
export const SUBSCRIPTION_OAUTH2_FLOW_COMPLETED = "oAuth2FlowCompleted";

export type allowedFetchKeys = typeof GET_APP_STATE | typeof POST_APP_STATE | typeof POST_EXTERNAL_ASSET;
export type allowedDispatchKeys = typeof DISPATCH_CLOSE_MODAL | typeof DISPATCH_OAUTH2_FLOW;
