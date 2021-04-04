import Communicator from "./communicator";

const originUrl = "https://www.localhost.com";
const communicator = new Communicator(originUrl);
const tokenLength = 6;
const message = { key: "121243oas!6ihdf", token: "1719248ty$^&" };

test("getMessageToken", () => {
    const token = communicator.getMessageToken();
    expect(token).toHaveLength(tokenLength);
});

test("postMessage", () => {
    window.top.postMessage = jest.fn();
    communicator.postMessage(message);
    expect(window.top.postMessage).toHaveBeenCalledTimes(1);
    expect(window.top.postMessage).toHaveBeenCalledWith(message, originUrl);
});
