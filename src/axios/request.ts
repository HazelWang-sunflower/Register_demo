import { message } from "antd";
import instance from "./index";

export interface Result<T = unknown> {
    message: string
    code: number
    data: T
    [key: string] : any
}

// const [messageApi] = message.useMessage()
export const defaultError = (err: string) => {
    console.error(err);
    message.open({
        type: 'error',
        content: 'Error...Please try again.',
        duration: 5,
    })
}

export const defaultFailure = (msg: string, code: string, url: string) => {
    console.warn(`url: ${url}, status code: ${code}, error message: ${message}`);
    message.open({
        type: 'warning',
        content: msg,
        duration: 5
    })
}

export async function httpPost(url: string, data: any, error = defaultError) {
    const res = await instance.post(url, data)
    return res.data;
}

export async function httpGet(url: string, error = defaultError) {
    const res = await instance.get(url)
    return res.data;
}