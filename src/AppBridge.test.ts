import AppBridge from "./AppBridge";
import Messenger from "./Messenger";
import { mocked } from "ts-jest/utils";
import { DispatchKey, FetchKey } from "./Actions";
import { PostExternalAssetParams } from "./RequestType";
jest.mock("./Messenger");



const token = "AjY34F87Dsat^J";
const defaultTimeout = 3000;
const oauth2_timeout = 300000;
const getRefreshedThirdpartyOauth2TokenParams = { refreshToken: "3GHsoiH7f$&37" };
const putAppStateParams = { access_token: "topSecret" };
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
    expect(messenger.postMessage).toHaveBeenCalledWith({
        key: DispatchKey.DispatchCloseApp,
        token,
    });
});

test("getAppState", () => {
    appBridge.getAppState();

    expect(messenger.getMessageToken).toHaveBeenCalledTimes(1);
    expect(messenger.postMessage).toHaveBeenCalledTimes(1);
    expect(messenger.postMessage).toHaveBeenCalledWith({ key: FetchKey.GetAppState, token });

    expect(messenger.subscribeResponse).toHaveBeenCalledTimes(1);
    expect(messenger.subscribeResponse).toHaveBeenCalledWith(FetchKey.GetAppState, token, defaultTimeout);
});

test("getThirdPartyOAuth2Token", () => {
    appBridge.getThirdPartyOAuth2Token();

    expect(messenger.getMessageToken).toHaveBeenCalledTimes(1);
    expect(messenger.postMessage).toHaveBeenCalledTimes(1);
    expect(messenger.postMessage).toHaveBeenCalledWith({ key: FetchKey.GetThirdPartyOauth2Token, data: null, token });

    expect(messenger.subscribeResponse).toHaveBeenCalledTimes(1);
    expect(messenger.subscribeResponse).toHaveBeenCalledWith(FetchKey.GetThirdPartyOauth2Token, token, oauth2Timeout);
});

test("getRefreshedThirdpartyOauth2Token", () => {
    appBridge.getRefreshedThirdpartyOauth2Token(getRefreshedThirdpartyOauth2TokenParams);

    expect(messenger.getMessageToken).toHaveBeenCalledTimes(1);
    expect(messenger.postMessage).toHaveBeenCalledTimes(1);
    expect(messenger.postMessage).toHaveBeenCalledWith({
        key: FetchKey.GetRefreshedThirdpartyOauth2Token,
        token,
        data: getRefreshedThirdpartyOauth2TokenParams,
    });

    expect(messenger.subscribeResponse).toHaveBeenCalledTimes(1);
    expect(messenger.subscribeResponse).toHaveBeenCalledWith(FetchKey.GetRefreshedThirdpartyOauth2Token, token);
});

test("putAppState", () => {
    appBridge.putAppState(putAppStateParams);

    expect(messenger.getMessageToken).toHaveBeenCalledTimes(1);
    expect(messenger.postMessage).toHaveBeenCalledTimes(1);
    expect(messenger.postMessage).toHaveBeenCalledWith({ key: FetchKey.PutAppState, token, data: putAppStateParams });

    expect(messenger.subscribeResponse).toHaveBeenCalledTimes(1);
    expect(messenger.subscribeResponse).toHaveBeenCalledWith(FetchKey.PutAppState, token, defaultTimeout);
});

test("deleteAppState", () => {
    appBridge.deleteAppState();

    expect(messenger.getMessageToken).toHaveBeenCalledTimes(1);
    expect(messenger.postMessage).toHaveBeenCalledTimes(1);
    expect(messenger.postMessage).toHaveBeenCalledWith({ key: FetchKey.DeleteAppState, token });

    expect(messenger.subscribeResponse).toHaveBeenCalledTimes(1);
    expect(messenger.subscribeResponse).toHaveBeenCalledWith(FetchKey.DeleteAppState, token, defaultTimeout);
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
    expect(messenger.subscribeResponse).toHaveBeenCalledWith(FetchKey.PostExternalAsset, token, defaultTimeout);
});
