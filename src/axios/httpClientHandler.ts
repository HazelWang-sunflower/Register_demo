import { InternalAxiosRequestConfig } from "axios"
import { takeAccessToken } from "./token.util"

export const getAccessToken = () => {
    return {
        'Authorization': `Bearer ${takeAccessToken()}`
    }
}

/**
 * 防重放，这里添加时间戳和6位随机数
 * @param {*} config 
 */

export const replayDefence =(config: InternalAxiosRequestConfig) => {
    if(config.url) {
        const nonce = Math.floor(Math.random() * 1000000)
        config.params = {
            // _t: Date.parse(new Date()),
            nonce,
            ...config.params
        }
    }
}

/**
 * 报文加密，这里使用base64代替加密，你可以替换成SM4加密
 * @param {*} config 
 */
export const encryptRequest= (config: InternalAxiosRequestConfig) => {
    if(process.env.KOI_SM4Rencrypt && config.url && config.data) {
        if(config.method && ['PUT', 'POST', 'DELETE'].includes(config.method)){
            config.headers["Content-Type"] = "application/json";
            let jsonStr = JSON.stringify(config.data);
            config.data = btoa(jsonStr)
        }
    }

}

export const distorDefence = (config: InternalAxiosRequestConfig) => {
    if(process.env.KOI_TAMPERING && config.url) {
        let validCode = `${config.url}`
        if(config.params) {
            for( let key in config.params) {
                validCode += `&${key}=${config.params[key]}`
            }
        }
        if(config.data && config.method != 'GET') {
            validCode += process.env.KOI_SM4Rencrypt ? config.data : JSON.stringify(config.data)
        }
        console.log('validCode', validCode)
        config.headers["sign"] = btoa(validCode)
    }
}