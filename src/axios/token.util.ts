import { message } from "antd"

interface Auth {
    token: string;
    expire: Date;
}


const authTemName = "access_token"
// const [messageApi] = message.useMessage()

export function storeAccessToken(token: string, remember: boolean, expire: Date) {
    const authObj:Auth = {token: token, expire: expire}
    const str = JSON.stringify(authObj)
    if(remember) {
        localStorage.setItem(authTemName, str)
    }else {
        sessionStorage.setItem(authTemName, str)
    }
}
export function takeAccessToken () {
    const str = localStorage.getItem(authTemName) || sessionStorage.getItem(authTemName)
    if(!str) {
        return null
    }
    const authObj:Auth = JSON.parse(str);
    if(authObj.expire < new Date()){
        deleteAccessToken();
        message.open({
            type: 'info',
            content: 'Your token is expired. Please go to login.',
            duration: 5
        })
        return null
    }
    return authObj.token
}

export function deleteAccessToken() {
    localStorage.removeItem(authTemName);
    sessionStorage.removeItem(authTemName);
}