export const REQUEST_TIMEOUT = 3000;

//Fetch keys
export const GET_APP_STATE = "getAppState";
export const POST_APP_STATE = "postAppState";
export const POST_EXTERNAL_ASSET = "postExternalAsset";
export const ALLOWED_FETCH_KEYS = [GET_APP_STATE, POST_APP_STATE, POST_EXTERNAL_ASSET];

//Dispatch keys
export const ACTION_CLOSE_MODAL = "closeModal";
export const ACTION_OAUTH2_FLOW = "oAuth2Flow";
export const ALLOWED_ACTION_KEYS = [ACTION_CLOSE_MODAL, ACTION_OAUTH2_FLOW];

//Subscription keys
export const SUBSCRIPTION_OAUTH2_FLOW_COMPLETED = "oAuth2FlowCompleted";
export const ALLOWED_SUBSCRIPTION_KEYS = [SUBSCRIPTION_OAUTH2_FLOW_COMPLETED];
