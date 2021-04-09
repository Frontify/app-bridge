import Messenger from "./Messenger";

const originUrl = "https://www.localhost.com";
const messenger = new Messenger(originUrl);
const tokenLength = 6;
const message = { key: "121243oas!6ihdf", token: "1719248ty$^&" };

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
