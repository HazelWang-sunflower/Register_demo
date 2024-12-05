// import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";

// axios.defaults.baseURL = 'http://localhost:8080/api' // env
// axios.defaults.timeout = 10000
// // axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

// const instance: AxiosInstance = axios.create({
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//     }
// })

// instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
//     // 权限验证
//     return config;
// }, (error: AxiosError) => {
//     return Promise.reject(error)
// });

// instance.interceptors.response.use((response: AxiosResponse) => {
//     // 特定url /auth/
//     if(response.status === 200) {
//         console.log("response",response)
//         return response.data;
//     }
//     return Promise.reject(response)

// }, (error: AxiosError) => {
//     if(error.response?.status) {
//         switch(error.response.status) {
//             case 401: {
//                 console.info("401 error")
//             }
//             break;

//             case 403: {
//                 console.log("403")
//             }
//             break;

//             case 404: {
//                 console.log("404")
//             }
//             break;
//         }
//     }
// })

// // instance.defaults.headers.common['Authorization'] = AUTH_TOKEN

// export default instance;

import HttpClient from "./httpClient";
const $axios = new HttpClient()
export default $axios