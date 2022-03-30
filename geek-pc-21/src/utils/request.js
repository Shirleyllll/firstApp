import { message } from "antd";
import axios from "axios";
import { getToken, hasToken, removeToken } from "./storage";
import history  from "./history";
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
        if( !error.response) {
            //如果error信息中没有response，网络超时导致
            return Promise.reject(new Error('网络繁忙，请稍后重试'))
        }
        if(error.response.status === 401) {
            //代表token过期了
            //1、 删除token
            // removeToken()
            // 2、 给提示消息
            message.warn('登录信息过期了',1)
            // 3、 跳转到登录页
            //在非组件中无法访问到history对象 
            //引入history
            //路由回跳
            history.push('/login',{
                from: history.location.pathname
            })
            removeToken()


        }
        return Promise.reject(error)
    }
)


export default instance