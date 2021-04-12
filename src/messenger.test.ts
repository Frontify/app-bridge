import { GET_APP_STATE } from "./actions";
import Messenger from "./Messenger";

const originUrl = "https://www.localhost.com";
const tokenLength = 6;
const message = { key: "121243oas!6ihdf", token: "1719248ty$^&" };

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
