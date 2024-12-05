
import { message } from "antd";
import $axios from "../axios";
import { deleteAccessToken, storeAccessToken } from "../axios/token.util";

const login_url = '/auth/login'
export async function login(username: string, password: string, remeber:boolean): Promise<any>{
    const res = await $axios.post(login_url, {
        username: username,
        password: password
    })
    const data = res.data
    storeAccessToken(data.token, remeber, data.expire)
    message.open({
        type:'success',
        'content': 'Login success',
        duration: 3
    })
    return res;
}

export async function logout() {
    const logout_url = '/auth/logout';
    const data = await $axios.get(logout_url);
    deleteAccessToken()
    message.open({
        type:'success',
        'content': 'Logout success',
        duration: 3
    })
    return data;
}