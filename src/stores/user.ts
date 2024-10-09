// //管理用户数据
// import { ref, reactive } from 'vue';
// import { defineStore } from "pinia";
// import { loginAPI, getUserInfoAPI } from '@/apis/user';

// export const userInfoStore = defineStore('user', () => {
//     //1.定义state存放数据

//     const userInfo = reactive({
//         userId: null,
//         userType: null,
//         readFlag: null,
//         nickName: null,
//         schoolName: null,
//         approveType: null,
//     })

//     //2.定义action函数获取数据
//     const getToken = async ({ username, password }) => {
//         const res = await loginAPI({ username, password })
//         if (res.token !== undefined) {
//             sessionStorage.setItem("token", res.token);
//             sessionStorage.setItem("isLogin", true)
//         }
//         else {
//             sessionStorage.setItem("isLogin", false);
//         }
//     }
//     const getUserInfo = async () => {
//         try {
//             const res = await getUserInfoAPI()
//             console.log(res);
//             if (res.code === 200) {
//                 Object.assign(userInfo, {
//                     userId: res.dsUser.userId,
//                     userType: res.dsUser.userType,
//                     nickName: res.dsUser.nickName,
//                     readFlag: res.dsUser.readFlag,
//                     schoolName: res.dsUser.schoolName,
//                     approveType: res.dsUser.approveType
//                 })
//                 console.log(userInfo);
//             }
//         } catch (error) {
//         }
//     }
//     const isRead = () => {
//         userInfo.value.readFlag = 1;
//     }


//     //退出时清理用户信息
//     const clearUserInfo = () => {
//         sessionStorage.removeItem('token');
//         sessionStorage.removeItem('isLogin');
//         sessionStorage.setItem('activeIndex', '0')
//         Object.assign(userInfo, {
//             userId: null,
//             userType: null,
//             nickName: null,
//             readFlag: null,
//             schoolName: null,
//             approveType: null
//         })
//         console.log(userInfo);
//     }

//     //3.以对象格式把state和action return
//     return {
//         userInfo,
//         getToken,
//         getUserInfo,
//         isRead,
//         clearUserInfo
//     }
// },
//     {
//         persist: {
//             enabled: true,
//         }
//     }
// )


import { ref, reactive } from 'vue';
import { defineStore } from 'pinia';
import { loginAPI, getUserInfoAPI } from '@/apis/user';

// 定义API响应的接口
interface LoginResponse {
    token?: string;
}

interface UserInfoResponse {
    code: number;
    dsUser: {
        userId?: string | null;
        userType?: string | null;
        readFlag?: number | null;
        nickName?: string | null;
        schoolName?: string | null;
        approveType?: string | null;
    };
}

export const userInfoStore = defineStore('user', () => {
    // 1. 定义state存放数据
    const userInfo = reactive<{
        userId: string | null;
        userType: string | null;
        readFlag: number | null;
        nickName: string | null;
        schoolName: string | null;
        approveType: string | null;
    }>({
        userId: null,
        userType: null,
        readFlag: null,
        nickName: null,
        schoolName: null,
        approveType: null,
    });

    // 2. 定义action函数获取数据
    const getToken = async ({ username, password }: { username: string; password: string }): Promise<void> => {
        const res: LoginResponse = await loginAPI({ username, password }) as any;
        if (res.token !== undefined) {
            sessionStorage.setItem("token", res.token);
            sessionStorage.setItem("isLogin", "true");
        } else {
            sessionStorage.setItem("isLogin", "false");
        }
    };

    const getUserInfo = async (): Promise<void> => {
        try {
            const res: UserInfoResponse = await getUserInfoAPI() as any;
            if (res.code === 200) {
                Object.assign(userInfo, {
                    userId: res.dsUser.userId,
                    userType: res.dsUser.userType,
                    nickName: res.dsUser.nickName,
                    readFlag: res.dsUser.readFlag,
                    schoolName: res.dsUser.schoolName,
                    approveType: res.dsUser.approveType
                });
            }
        } catch (error) {
            // 处理错误
            console.log(error);
        }
    };

    const isRead = (): void => {
        userInfo.readFlag = 1;
    };

    // 退出时清理用户信息
    const clearUserInfo = (): void => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('isLogin');
        sessionStorage.setItem('activeIndex', '0');
        Object.assign(userInfo, {
            userId: null,
            userType: null,
            nickName: null,
            readFlag: null,
            schoolName: null,
            approveType: null
        });
    };

    // 3. 以对象格式把state和action return
    return {
        userInfo,
        getToken,
        getUserInfo,
        isRead,
        clearUserInfo
    };
},
    {
        persist: {
            enabled: true,
        }
    }
);
