import Communicator from "./communicator";

const originUrl = "https://www.localhost.com";
const communicator = new Communicator(originUrl);
const message = { key: "121243oas!6ihdf", token: "1719248ty$^&" };

test("post message", () => {
    window.top.postMessage = jest.fn();
    communicator.postMessage(message);
    expect(window.top.postMessage).toHaveBeenCalledTimes(1);
    expect(window.top.postMessage).toHaveBeenCalledWith(message, originUrl);
});
