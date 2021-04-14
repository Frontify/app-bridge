import { GET_APP_STATE } from "./Actions";
import Messenger, { CrossDocumentMessage } from "./Messenger";

const originUrl = "https://www.localhost.com";
const tokenLength = 6;
const message: CrossDocumentMessage = { key: GET_APP_STATE, token: "1719248ty$^&" };

const messenger = new Messenger(originUrl);

test("getMessageToken", () => {
    const token = messenger.getMessageToken();
    expect(token).toHaveLength(tokenLength);
});

test("postMessage", () => {
    window.top.postMessage = jest.fn();
    messenger.postMessage(message);
    expect(window.top.postMessage).toHaveBeenCalledTimes(1);
    expect(window.top.postMessage).toHaveBeenCalledWith(message, originUrl);
});

test("subscribeResponse", () => {
    window.addEventListener = jest.fn();
    messenger.subscribeResponse(GET_APP_STATE, message.token);

    expect(window.top.postMessage).toHaveBeenCalledTimes(1);
    expect(window.addEventListener).toHaveBeenCalledWith("message", expect.any(Function), { once: true });
});
