
import { message } from "antd";
import $axios from "../axios";
import { storeAccessToken } from "../axios/token.util";

const resetConfirm_url = '/auth/reset-confirm'
const resetPassword_url = '/auth/reset-password'
const gotCode_url = '/auth/request-code'
export async function requestCodeService(email: string): Promise<any>{
    const url = `${gotCode_url}?email=${email}&type=reset`
    const res = await $axios.get(url)
    const data = res.data
    if(res.code === 200) {
        message.open({
            type:'success',
            'content': `Request code has sent to the ${email}!) successfully`,
            duration: 3
        })
    }else {
        message.open({
            type:'error',
            'content': 'Something is wrong, please retry...',
            duration: 3
        })
    }
}
export async function resetConfirmService(email:string, code: string): Promise<any>{
    const res = await $axios.post(resetConfirm_url, {
        email: email,
        code: code
    })
    console.log(res)
    message.open({
        type:'success',
        'content': 'Code is correct!',
        duration: 3
    })
    return res;
}
export async function resetPasswordService(email:string, code: string,password:string): Promise<any>{
    const res = await $axios.post(resetPassword_url, {
        email: email,
        code: code,
        password: password
    })
    console.log(res)
    message.open({
        type:'success',
        'content': 'Reset successfull!',
        duration: 3
    })
    return res;
}
