import AppBridge from "./AppBridge";
import Messenger from "./Messenger";
import { mocked } from "ts-jest/utils";
import { DispatchKey, FetchKey } from "./Actions";
import { PostExternalAssetParams } from "./RequestType";
jest.mock("./Messenger");

const token = "AbraCadabra";
const oauth2_timeout = 300000;
const state = { access_token: "topSecret" };
const postExternalAssetParams: PostExternalAssetParams = { title: "My asset", url: "https://localhost.com" };

let messenger: Messenger;
let appBridge: AppBridge;

beforeEach(() => {
    mocked(Messenger).mockClear();
    appBridge = new AppBridge();
    messenger = mocked(Messenger).mock.instances[0];
    expect(mocked(messenger.getMessageToken).mockReturnValue(token));
});

test("closeApp", () => {
    appBridge.closeApp();

    expect(messenger.postMessage).toHaveBeenCalledTimes(1);
    expect(messenger.postMessage).toHaveBeenCalledWith({ key: DispatchKey.DispatchCloseApp, token });
});

test("getAppState", () => {
    appBridge.getAppState();

    expect(messenger.getMessageToken).toHaveBeenCalledTimes(1);
    expect(messenger.postMessage).toHaveBeenCalledTimes(1);
    expect(messenger.postMessage).toHaveBeenCalledWith({ key: FetchKey.GetAppState, token });

    expect(messenger.subscribeResponse).toHaveBeenCalledTimes(1);
    expect(messenger.subscribeResponse).toHaveBeenCalledWith(FetchKey.GetAppState, token);
});

test("getThirdPartyOAuth2Token", () => {
    appBridge.getThirdPartyOAuth2Token();

    expect(messenger.getMessageToken).toHaveBeenCalledTimes(1);
    expect(messenger.postMessage).toHaveBeenCalledTimes(1);
    expect(messenger.postMessage).toHaveBeenCalledWith({ key: FetchKey.GetThirdPartyOauth2Token, token });

    expect(messenger.subscribeResponse).toHaveBeenCalledTimes(1);
    expect(messenger.subscribeResponse).toHaveBeenCalledWith(FetchKey.GetThirdPartyOauth2Token, token, oauth2_timeout);
});

test("putAppState", () => {
    appBridge.putAppState(state);

    expect(messenger.getMessageToken).toHaveBeenCalledTimes(1);
    expect(messenger.postMessage).toHaveBeenCalledTimes(1);
    expect(messenger.postMessage).toHaveBeenCalledWith({ key: FetchKey.PutAppState, token, data: state });

    expect(messenger.subscribeResponse).toHaveBeenCalledTimes(1);
    expect(messenger.subscribeResponse).toHaveBeenCalledWith(FetchKey.PutAppState, token);
});

test("clearAppState", () => {
    appBridge.clearAppState();

    expect(messenger.getMessageToken).toHaveBeenCalledTimes(1);
    expect(messenger.postMessage).toHaveBeenCalledTimes(1);
    expect(messenger.postMessage).toHaveBeenCalledWith({ key: FetchKey.ClearAppState, token });

    expect(messenger.subscribeResponse).toHaveBeenCalledTimes(1);
    expect(messenger.subscribeResponse).toHaveBeenCalledWith(FetchKey.ClearAppState, token);
});

test("postExternalAsset", () => {
    appBridge.postExternalAsset(postExternalAssetParams);

    expect(messenger.getMessageToken).toHaveBeenCalledTimes(1);
    expect(messenger.postMessage).toHaveBeenCalledTimes(1);
    expect(messenger.postMessage).toHaveBeenCalledWith({
        key: FetchKey.PostExternalAsset,
        token,
        data: postExternalAssetParams,
    });

    expect(messenger.subscribeResponse).toHaveBeenCalledTimes(1);
    expect(messenger.subscribeResponse).toHaveBeenCalledWith(FetchKey.PostExternalAsset, token);
});
