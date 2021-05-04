import { FetchKey } from "./Actions";
import Messenger, { CrossDocumentMessage } from "./Messenger";

const tokenLength = 6;
const message: CrossDocumentMessage<Record<string, unknown>> = { key: FetchKey.GetAppState, token: "1719248ty$^&" };

const messenger = new Messenger();

test("getMessageToken", () => {
    const token = messenger.getMessageToken();
    expect(token).toHaveLength(tokenLength);
});

test("postMessage", () => {
    window.top.postMessage = jest.fn();
    messenger.postMessage(message);
    expect(window.top.postMessage).toHaveBeenCalledTimes(1);
    expect(window.top.postMessage).toHaveBeenCalledWith(message, "*");
});

test("subscribeResponse", () => {
    window.addEventListener = jest.fn();
    messenger.subscribeResponse(FetchKey.GetAppState, message.token);

    expect(window.top.postMessage).toHaveBeenCalledTimes(1);
    expect(window.addEventListener).toHaveBeenCalledWith("message", expect.any(Function), { once: true });
});
