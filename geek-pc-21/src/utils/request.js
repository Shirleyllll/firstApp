import axios from "axios";
import { getToken, hasToken } from "./storage";
//创建axios实例
const instance = axios.create({
    baseURL: 'http://geek.itheima.net/v1_0',
    timeout: 5000,
})

//配置拦截器
//添加请求拦截器
instance.interceptors.request.use(
    function (config) {
        //在发送请求之前做什么
        if(hasToken()){
            config.headers.Authorization = `Bearer ${getToken()}`
        }
        return config
    },
    function (error) {
        //对请求错误做些什么
        return Promise.reject(error)
    }
)

//添加响应拦截器
instance.interceptors.response.use(
    function (response) {
        return response.data
    },
    function (error) {
        return Promise.reject(error)
    }
)


export default instance