<script setup>
import { reactive, ref, toRaw } from 'vue'
import { useRouter } from 'vue-router';
import { userInfoStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'

//正常登录
const formLabelWidth = '140px'

const form = reactive({
    username: '',
    password: ''
})
const rules = {
    username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }],
};
const formRef = ref(null);

const router = useRouter();
const userStore = userInfoStore();
const { userInfo } = storeToRefs(userStore);
const doLogin = () => {
    const { username, password } = form
    //调用实例方法
    formRef.value.validate(async (valid) => {
        if (valid) {
            await userStore.getToken({ username, password })
            await userStore.getUserInfo()
            const isLogin = localStorage.getItem("isLogin") === "true"
            if (isLogin) {
                // 1.提示用户
                ElMessage({ type: 'success', message: '登陆成功' })
                // 2.跳转首页
                router.replace({ path: '/' })
                // setTimeout(() => kannoFn(), 2000)
                dialogFormVisible.value = false
            }
            else {
                ElMessage({ type: 'error', message: '账号或密码错误' })
            }
        }
    })
}

const isLogin = localStorage.getItem("isLogin") === "true"

function kannoFn() {
    location.reload();
}
const Cancel = () => {
    dialogFormVisible.value = false
    ElMessage({
        message: "已取消",
        type: "info",
        plain: true,
    });
};

//处理和其他组件的关系
const dialogFormVisible = defineModel()

//退出登录
const Quit = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isLogin');
    ElMessage({
        message: "退出成功",
        type: "info",
        plain: true,
    });
    router.replace({ path: '/' })
    setTimeout(() => kannoFn(), 2000)
}

//修改密码
const passformLabelWidth = '140px'

const passform = reactive({
    oldPassword: '',
    newPassword1: '',
    newPassword2: ''
})
const passrules = {
    oldPassword: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
    newPassword1: [{ required: true, message: "请输入新密码", trigger: "blur" }],
    newPassword2: [{ required: true, message: "请再次输入新密码", trigger: "blur" }],
};
const passformRef = ref(null);
const needChange = ref(false);
const passCancel = () => {
    needChange.value = false
    ElMessage({
        message: "已取消",
        type: "info",
        plain: true,
    });
};
const changePass = () => {
    passformRef.value.validate((valid) => {
        if (valid) {
            const { newPassword1, newPassword2 } = passform
            if (newPassword1 !== newPassword2) {
                ElMessage({ type: 'error', message: '密码不一致' })
            }
            else {
                ElMessage.success('修改密码成功');
                needChange.value = false;
            }
        }
    })
}
</script>
<template>
    <div class="unlogin" v-show="!isLogin">
        <el-button @click=" dialogFormVisible = true" class="nav_login">
            登录
        </el-button>
        <el-dialog v-model="dialogFormVisible" title="欢迎登录！" width="500">
            <el-form ref="formRef" :model="form" :rules="rules">
                <el-form-item label="用户名：" prop="username" :label-width="formLabelWidth">
                    <el-input v-model="form.username" autocomplete="off" placeholder="请输入用户名" />
                </el-form-item>
                <el-form-item label="密码：" prop="password" :label-width="formLabelWidth">
                    <el-input v-model="form.password" type="password" show-password autocomplete="off"
                        placeholder="请输入密码" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="Cancel">取消</el-button>
                    <el-button type="primary" @click="doLogin">
                        登录
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
    <div class="halogin" v-show="isLogin">
        <div class="flex flex-wrap items-center">
            <el-dropdown>
                <el-button style="border: 0;">
                    <i class="i_img"></i>
                    <span>{{ userInfo.nickName }}</span>
                    <el-icon class="el-icon--right"><arrow-down /></el-icon>
                </el-button>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="Quit">退出登录</el-dropdown-item>
                        <el-dropdown-item @click="needChange = true">修改密码</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
    <el-dialog v-model="needChange" title="欢迎登录！" width="500">
        <el-form ref="passformRef" :model="passform" :rules="passrules">
            <el-form-item label="旧密码：" prop="oldPassword" :label-width="passformLabelWidth">
                <el-input v-model="passform.oldPassword" type="password" show-password autocomplete="off"
                    placeholder="请输入旧密码" />
            </el-form-item>
            <el-form-item label="新密码：" prop="newPassword1" :label-width="passformLabelWidth">
                <el-input v-model="passform.newPassword1" type="password" show-password autocomplete="off"
                    placeholder="请输入新密码" />
            </el-form-item>
            <el-form-item label="新密码：" prop="newPassword2" :label-width="passformLabelWidth">
                <el-input v-model="passform.newPassword2" type="password" show-password autocomplete="off"
                    placeholder="请再次输入新密码" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="passCancel">取消</el-button>
                <el-button type="primary" @click="changePass">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>
<style scoped>
.example-showcase .el-dropdown+.el-dropdown {
    margin-left: 15px;
}

.example-showcase .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
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

.halogin {
    float: right;
    height: 40px;
    margin: 15px 0 0 0;
    padding: 0 30px;
    color: #000;
    background-color: #fff;
    line-height: 40px;
    border-radius: 5px;
}

.halogin /deep/ .el-button {
    --el-button-hover-bg-color: none;
}

.i_img {
    display: inline-block;
    height: 30px;
    width: 30px;
    background-image: url('@/assets/PC端_slices/组 1.png');
    background-size: contain;
    background-repeat: no-repeat;
    margin-right: 10px;
}
</style>