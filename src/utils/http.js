import axios from "axios";

const httpInstance = axios.create({
    baseURL: 'http://reg.vip.cpolar.cn',
    timeout: 50000
});

//axios拦截器

//axios请求式拦截器
httpInstance.interceptors.request.use(config => {
    //1.从本地获取token
    const token = sessionStorage.getItem('token')
    //2.拼接token数据
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, e => Promise.reject(e));

//axios响应式拦截器
httpInstance.interceptors.response.use(
    response => {
        // 如果响应返回的对象中的status是200，说明请求成功，直接返回结果
        if (response.status === 200) {
            return response.data;
        } else {
            // 否则的话抛出错误
            return Promise.reject(
                new Error('请求错误，状态码：' + response.status)
            );
        }
    },
    error => {
        // 这里处理所有的网络异常
        if (error && error.response) {
            switch (error.response.status) {
                case 400:
                    error.message = '请求错误';
                    break;
                case 401:
                    error.message = '未授权，请登录';
                    break;
                // 其他错误状态处理
                default:
                    error.message = '服务端异常，请联系管理员';
            }
        }
        return Promise.reject(error); // 在调用的那边可以拿到(catch)你想返回的错误信息
    }
);

export default httpInstance

// // 防抖
// function debounce(func, wait) {
//     let timeout;
//     return function() {
//       clearTimeout(timeout);
//       timeout = setTimeout(() => {
//         func.apply(this, arguments);
//       }, wait);
//     };
//   }
  
//   // 使用防抖
//   const debouncedSave = debounce(() => console.log('保存数据'), 1000);
//   window.addEventListener('scroll', debouncedSave);
  
  
//   // 节流
//   function throttle(func, wait) {
//     let timeout;
//     return function() {
//       if (!timeout) {
//         timeout = setTimeout(() => {
//           timeout = null;
//           func.apply(this, arguments);
//         }, wait);
//       }
//     };
//   }
  
//   // 使用节流
//   const throttledLoad = throttle(() => console.log('加载数据'), 1000);
//   window.addEventListener('scroll', throttledLoad);