//管理用户数据
import { defineStore } from "pinia";
import { ref } from 'vue';
import { loginAPI, getUserInfoAPI } from '@/apis/user';

export const userInfoStore = defineStore('user', () => {
    //1.定义state存放数据
    const userInfo = ref({
        userId: null,
        userType: null,
        readFlag: null,
        nickName: null,
        schoolName: null,
    })

    //2.定义action函数获取数据
    const getUserInfo = async ({ username, password }) => {
        const res = await loginAPI({ username, password })
        if (res.token !== undefined) {
            localStorage.setItem("token", res.token);
            localStorage.setItem("isLogin", true);
            const useInfo = await getUserInfoAPI();
            console.log(useInfo);
        }
        else {
            localStorage.setItem("isLogin", false);
        }
    }

    //退出时清理用户信息
    const clearUserInfo = () => {
        userInfo.value = {}
    }

    //3.以对象格式把state和action return
    return {
        userInfo,
        getUserInfo,
        clearUserInfo
    }
},
    {
        persist: true,
    })