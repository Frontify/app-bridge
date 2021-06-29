import { Topic } from "../types";
export declare type SubscribeOptions = {
    timeout?: number;
};
export declare const SUBSCRIBE_TIMEOUT: number;
export default function subscribe<T>(topic: Topic, token: string, options?: SubscribeOptions): Promise<T>;
