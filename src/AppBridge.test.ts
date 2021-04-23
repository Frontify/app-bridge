import AppBridge from "./AppBridge";
import Messenger from "./Messenger";
import { mocked } from "ts-jest/utils";
import { DispatchKey, FetchKey } from "./Actions";
jest.mock("./Messenger");

const originUrl = "https://www.localhost.com";
const token = "AbraCadabra";
const oauth2_timeout = 300000;

let messenger: Messenger;
let appBridge: AppBridge;

beforeEach(() => {
    mocked(Messenger).mockClear();
    appBridge = new AppBridge(originUrl);
    messenger = mocked(Messenger).mock.instances[0];
    expect(mocked(messenger.getMessageToken).mockReturnValue(token));
});

test("closeApp", () => {
    appBridge.closeApp();

    expect(messenger.getMessageToken).toHaveBeenCalledTimes(1);
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

test("getThirdpartyOAuth2Token", () => {
    appBridge.getThirdpartyOAuth2Token();

    expect(messenger.getMessageToken).toHaveBeenCalledTimes(1);
    expect(messenger.postMessage).toHaveBeenCalledTimes(1);
    expect(messenger.postMessage).toHaveBeenCalledWith({ key: FetchKey.GetThirdpartyOauth2Token, token });

    expect(messenger.subscribeResponse).toHaveBeenCalledTimes(1);
    expect(messenger.subscribeResponse).toHaveBeenCalledWith(FetchKey.GetThirdpartyOauth2Token, token, oauth2_timeout);
});
