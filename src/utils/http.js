import axios from "axios";

const httpInstance = axios.create({
    baseURL: 'http://reg.vip.cpolar.cn',
    timeout: 5000
})

export default httpInstance