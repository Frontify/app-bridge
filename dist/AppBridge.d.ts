import { AppBridgeResponse } from "./Messenger";
import { DispatchKey, FetchKey } from "./Actions";
export { DispatchKey, FetchKey } from "./Actions";
export default class AppBridge {
    private messenger;
    private static OAUTH2_TIMEOUT;
    constructor(originUrl: string);
    dispatch(key: DispatchKey): void;
    fetch(key: FetchKey, data?: Record<string, unknown>): Promise<AppBridgeResponse>;
    fetchThirdpartyOAuth2Token(): Promise<AppBridgeResponse>;
}
