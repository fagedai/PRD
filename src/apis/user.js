//封装和用户相关的接口函数
import request from '@/utils/http'

export const loginAPI = ({ username, password }) => {
    return request({
        url: '/login',
        method: 'POST',
        data: {
            username,
            password
        }
    })
}

export const getUserInfoAPI = () => {
    return request({
        url: '/getInfo',
        method: 'GET'
    })
}