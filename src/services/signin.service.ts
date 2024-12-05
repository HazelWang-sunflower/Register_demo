
import { message } from "antd";
import $axios from "../axios";
import { storeAccessToken } from "../axios/token.util";

const signIn_url = '/auth/register'
const request_url = '/auth/request-code'
export async function signInService(username: string, password: string, email:string, code: number): Promise<any>{
    const res = await $axios.post(signIn_url, {
        username: username,
        password: password,
        email: email,
        code: code
    })
    console.log(res)
    message.open({
        type:'success',
        'content': 'Sign in success',
        duration: 3
    })
    return res;
}
export async function requestCode(email: string): Promise<any>{
    const url = `${request_url}?email=${email}&type=register`
    const res = await $axios.get(url)
    const data = res.data
    if(res.code === 200) {
        message.open({
            type:'success',
            'content': 'Request code success',
            duration: 3
        })
    }
}