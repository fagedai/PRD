<script setup>
import Login from '@/views/Login/index.vue';
import useUserStore from './hooks/useUserStore'
import useNavigation from './hooks/useNavigation'

const { userInfo } = useUserStore()
const { list, showLogin, updateActiveIndex } = useNavigation()
</script>
<template>
    <div class="nav">
        <div class="nav_item">
            <div class="nav_logo">
                <img src="/src/assets/PC端_slices/组 4@2x(3).png" alt="Logo" />
            </div>
            <div class="nav_column">
                <routerLink :to="route.path" v-for="( route, index ) in  list" :key="index" class="link"
                    active-class="active"
                    :style="{ 'display': ((userInfo.userType === 1 && route.name === '进入专家评审') || (userInfo.userType === 2 && route.name === '我要报名')) ? 'none' : '' }"
                    @click="updateActiveIndex(route)">
                    <span>{{ route.name }}</span>
                </routerLink>
            </div>
            <Login v-model="showLogin"></Login>
        </div>
    </div>
</template>


<style scoped>
.display_none {
    display: none;
}

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

    .link:hover {
        border-top: 2px solid #436EFF;
        background-color: #F6F7FC;
        color: #436EFF;
        font-weight: bold;
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