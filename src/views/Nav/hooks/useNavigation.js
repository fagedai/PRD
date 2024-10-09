//useNavigation.js
import { ref } from "vue";

export default function () {
    const list = ref([
        { path: "/home/primarily", name: "首页" },
        { path: "/home/guide", name: "比赛指南" },
        { path: "/home/enroll", name: "我要报名" },
        { path: "/home/expert", name: "进入专家评审" },
    ]);

    const showLogin = ref(false)

    const isLogin = sessionStorage.getItem('isLogin') === "true";
    const updateActiveIndex = (route) => {
        if ((route.name === '我要报名' || route.name === '进入专家评审') && !isLogin) {
            showLogin.value = true;
        }
    };

    return { list, showLogin, updateActiveIndex }
}