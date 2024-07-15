//管理用户数据
import { ref } from 'vue';
import { defineStore } from "pinia";
import { loginAPI, getUserInfoAPI } from '@/apis/user';

export const userInfoStore = defineStore('user', () => {
    //1.定义state存放数据
    const userInfo = ref({
        userId: null,
        userType: null,
        readFlag: null,
        nickName: null,
        schoolName: null,
        approveType: null,
    })

    //2.定义action函数获取数据
    const getToken = async ({ username, password }) => {
        const res = await loginAPI({ username, password })
        if (res.token !== undefined) {
            sessionStorage.setItem("token", res.token);
            sessionStorage.setItem("isLogin", true)
        }
        else {
            sessionStorage.setItem("isLogin", false);
        }
    }
    const getUserInfo = async () => {
        try {
            const res = await getUserInfoAPI()
            console.log(res);
            if (res.code === 200) {
                userInfo.value.userId = res.dsUser.userId
                userInfo.value.userType = res.dsUser.userType
                userInfo.value.nickName = res.dsUser.nickName
                userInfo.value.readFlag = res.dsUser.readFlag
                userInfo.value.schoolName = res.dsUser.schoolName
                userInfo.value.approveType = res.dsUser.approveType
            }
        } catch (error) {
        }
    }
    const isRead = () => {
        userInfo.value.readFlag = 1;
    }


    //退出时清理用户信息
    const clearUserInfo = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('isLogin');
        sessionStorage.setItem('activeIndex', '0')
        userInfo.value.userId = null
        userInfo.value.userType = null
        userInfo.value.nickName = null
        userInfo.value.readFlag = null
        userInfo.value.schoolName = null
    }

    //3.以对象格式把state和action return
    return {
        userInfo,
        getToken,
        getUserInfo,
        isRead,
        clearUserInfo
    }
},
    {
        persist: {
            enabled: true,
        }
    }
)