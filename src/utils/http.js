import axios from "axios";
import { userInfoStore } from '@/stores/user';
import { ElMessage } from "element-plus";

const httpInstance = axios.create({
    baseURL: 'http://reg.vip.cpolar.cn',
    timeout: 5000
})

//axios拦截器

//axios请求式拦截器
httpInstance.interceptors.request.use(config => {
    //1.从本地获取token
    const token = localStorage.getItem('token')
    //2.拼接token数据
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, e => Promise.reject(e))

//axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
    const userStore = userInfoStore()
    //错误提示
    ElMessage({
        type: 'warning',
        message: e.response.data.message
    })
    //401token失效处理
    //1.清除本地数据
    //2.跳转到登录页
    if (e.response.status === 401) {
        userStore.clearUserInfo()
        router.push('/')
    }
    return Promise.reject(e)
})

export default httpInstance