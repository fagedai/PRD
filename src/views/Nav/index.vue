<script setup>
import { ref } from "vue";

const list = ref([
    { path: "/home/primarily", name: "首页" },
    { path: "/home/guide", name: "比赛指南" },
    { path: "/home/exhibition", name: "作品展示" },
    { path: "/home/roster", name: "获奖名单" },
    { path: "/home/enroll", name: "我要报名" },
]);

const curIdx = ref(-1);
const actIdx = ref(0);
const isIndexActive = (index) => {
    return index === curIdx.value || index === actIdx.value;
};
const updateActiveIndex = (index) => {
    actIdx.value = index;
    // 将激活的索引保存到sessionStorage
    sessionStorage.setItem('activeIndex', index);
};

// 从sessionStorage获取激活的索引
const storedIndex = sessionStorage.getItem('activeIndex');
if (storedIndex !== null) {
    actIdx.value = parseInt(storedIndex, 10);
}
</script>
<template>
    <div class="nav">
        <div class="nav_item" @mouseleave="curIdx = -1">
            <div class="nav_logo">
                <img src="/src/assets/PC端_slices/组 4@2x(3).png" alt="Logo" />
            </div>
            <div class="nav_column">
                <routerLink :to="route.path" v-for="( route, index ) in  list" :key="index" class="link"
                    :class="{ active: isIndexActive(index) }" @mouseenter="curIdx = index" @mouseleave="curIdx = -1"
                    @click="updateActiveIndex(index)">
                    <span>{{ route.name }}</span>
                </routerLink>
            </div>
            <div class="nav_login">
                登录
            </div>
        </div>
    </div>
</template>


<style scoped>
.nav {
    height: 60px;
    background-color: #fff;

    .nav_item {
        width: 1240px;
        margin: auto;
    }
}

.nav_logo {
    float: left;
    height: 40px;
    margin: 10px 20px 10px 0;

    img {
        height: 100%;
    }
}

.nav_column {
    float: left;
    margin-top: 10px;

    .link {
        float: left;
        height: 40px;
        padding: 0 20px;
        line-height: 40px;
        cursor: pointer;
    }
}

.active {
    border-top: 2px solid #436EFF;
    background-color: #F6F7FC;
    color: #436EFF;
    font-weight: bold;
}

.nav_login {
    float: right;
    height: 40px;
    margin: 10px;
    padding: 0 30px;
    color: #fff;
    background-color: #436EFF;
    line-height: 40px;
    border-radius: 5px;
}
</style>