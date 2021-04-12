import AppBridge from "./AppBridge";
import Messenger from "./Messenger";
import { mocked } from "ts-jest/utils";
import { DISPATCH_CLOSE_APP, GET_THIRDPARTY_OAUTH2_TOKEN, GET_APP_STATE } from "./Actions";
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

test("dispatch", () => {
    appBridge.dispatch(DISPATCH_CLOSE_APP);

    expect(messenger.getMessageToken).toHaveBeenCalledTimes(1);
    expect(messenger.postMessage).toHaveBeenCalledTimes(1);
    expect(messenger.postMessage).toHaveBeenCalledWith({ key: DISPATCH_CLOSE_APP, token });
});

test("fetch", () => {
    appBridge.fetch(GET_APP_STATE);

    expect(messenger.getMessageToken).toHaveBeenCalledTimes(1);
    expect(messenger.postMessage).toHaveBeenCalledTimes(1);
    expect(messenger.postMessage).toHaveBeenCalledWith({ key: GET_APP_STATE, token });

    expect(messenger.subscribeResponse).toHaveBeenCalledTimes(1);
    expect(messenger.subscribeResponse).toHaveBeenCalledWith(GET_APP_STATE, token);
});

test("fetchThirdpartyOAuth2Token", () => {
    appBridge.fetchThirdpartyOAuth2Token();

    expect(messenger.getMessageToken).toHaveBeenCalledTimes(1);
    expect(messenger.postMessage).toHaveBeenCalledTimes(1);
    expect(messenger.postMessage).toHaveBeenCalledWith({ key: GET_THIRDPARTY_OAUTH2_TOKEN, token });

    expect(messenger.subscribeResponse).toHaveBeenCalledTimes(1);
    expect(messenger.subscribeResponse).toHaveBeenCalledWith(GET_THIRDPARTY_OAUTH2_TOKEN, token, oauth2_timeout);
});
