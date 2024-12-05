import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { replayDefence, encryptRequest, distorDefence } from "./httpClientHandler";
import { takeAccessToken } from "./token.util";
import { Result } from "./request";


axios.defaults.timeout = 20000;
axios.defaults.baseURL= 'http://localhost:8080/api' // env
// axios.defaults.headers['Content-type'] = 'application/x-www-form-urlencoded'
// axios.defaults.headers['X-Requested-with'] = 'XMLHttpRequest'; // ajax or normal request
// axios.defaults.withCredentials = true  // axios default not se

class HttpClient {
    instance: AxiosInstance;
    constructor() {
        this.instance = axios.create();
        this.interceptors();
    }
    interceptors() {
        this.instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
            if(config.method === 'POST') {
                config.headers["Content-Type"] = 'application/json'
            }
            if(config.method === 'GET' || config.url?.includes("login")) {
                config.headers["Content-Type"] = 'application/x-www-form-urlencoded'
            }
            if(config.url) {
                // replayDefence(config); //防重放
                // encryptRequest(config); //报文加密
                // distorDefence(config);// 防止篡改
                const token = takeAccessToken()
                if(token) {
                    config.headers.Authorization = `Bearer ${takeAccessToken()}`
                }
            }
            return config;
        }, error =>{
            return Promise.reject(error)
        })

        this.instance.interceptors.response.use(async (res) => {
            if(res.status === 200) {
                return res.data
            }else {
                return Promise.reject(res)
            }
        }, error => {
            return Promise.reject(error)
        })
    }

    async post(url: string, data:any) {
        const res = await this.instance.post(url, data)
        return res;
    }

    get(url: string, params?:{}): Promise<Result> {
        return this.instance.get(url, params)
    }

    put(url: string, params = {}): Promise<Result> {
        return this.instance.put(url, params)
    }

    delete(url: string, params = {}) : Promise<Result>{
        return this.instance({
            url: url,
            data: params,
            method: 'DELETE'
        })
    }
}

export default HttpClient