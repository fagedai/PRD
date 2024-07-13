<script lang="ts" setup>
import { ref, onMounted, watchEffect, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getlistAPI } from '@/apis/paging'
import { userInfoStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

//获取用户数据
const userStore = userInfoStore();
const router = useRouter()
const { userInfo } = storeToRefs(userStore);
let list = ["思政课组", "公共基础课程组", "专业技能课程⼀组", "专业技能课程二组"]
const dialogVisible = ref(userInfo.value.readFlag === 0)

//同意
const Agree = () => {
    dialogVisible.value = false;
    userStore.isRead()
}

//不同意跳转
const cancel = () => {
    router.replace({ path: "/" })
    dialogVisible.value = false;
    sessionStorage.setItem('activeIndex', '0')
    setTimeout(() => { location.reload() }, 10)
}

//查询
//名称
const title = ref('')

//状态
const isProve = ref('')
const options = [
    {
        id: 0,
        value: '',
        label: '全部',
    },
    {
        id: 1,
        value: '0',
        label: '未评审',
    },
    {
        id: 2,
        value: '1',
        label: '已评审',
    },
]

//作品展示
const pageSize = ref(10)
const pageNum = ref(1)
const handleSizeChange = (val) => {
    pageSize.value = val
}
const handleCurrentChange = (val) => {
    pageNum.value = val
}

//获取列表
const opus = ref([])
const getlist = async () => {
    try {
        const res = await getlistAPI({
            pageNum: pageNum.value,
            pageSize: pageSize.value,
            isApprove: isProve.value,
            title: title.value,
        });
        opus.value = res.data.rows
    } catch (error) {
        console.error('获取列表数据时发生错误:', error);
    }
}
const getStatus = (isApprove) => {
    return isApprove === '' ? '未评分' : '已评分';
}
watchEffect(async () => {
    await getlist();
})

</script>
<template>
    <el-dialog v-model="dialogVisible" title="承诺书" width="1183" :center="true" :close-on-click-modal="false"
        :show-close="false">
        <span class="textspan">
            <p>
                一、本人自愿加入专家评委库，并严格遵守其他各项规定和纪律，客观公正地为本次大开展评审工作。
            </p>
            <p>
                二、本人将严格遵守大赛评选工作的保密义务，不使用或披露，也不许可他人使用或披露在评选工作中获悉的梦想企业和团队的基本信息、观点、想法、创意、知识产权、智力成果、技术方法、商业计划、财务信息等商业秘密。
            </p>
            <p>
                三、本人将严格按服大赛评选规则、规程，以严肃相学的态度，客观公正、实事求是、专业独立地参与选工作，提出评隐意见，并对评港意见的真实性、公正性负责。
            </p>
            <p>
                四、本人保证投入足够的时间精力，按时参加大赛评选相关工作，并愿通过电子部件、手机信和电等方式供得大会组委会有关评选工作的通知信息。
            </p>
            <p>
                五、本人与参赛企业或队在有利害关系，可能影响“评”工作的公正、本人将及时向大赛组委会声明并提出道申通，如发现其他评委也存在相同情，本人也将及时向大赛组委会反映情况。
            </p>

            <p>
                六、未经大赛组委会授权，本人不以任何式与参赛企业或个人联系。
            </p>

            <p>
                七、未经大赛组委会授权，本人不以大赛评要名义参与任何与大赛评选无关的活动，也不以大赛评要名义对外发表任何评论。
            </p>

            <p>
                八、本人担任本次大赛的评委已经取得了应当取得的所有授权、许司、同意、批准，并不会违反对本人适用的法律、法规或本已经签订的合同，协议或其他文件。
            </p>

            <p>
                九、本人承诺只在大赛组委会授权的范围内进行评进工作，不超越授权，并且不利用职务之便为自身、他人以及所在工作机构谋得利益。
            </p>
        </span>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="Agree" style="font-size: 16px;padding: 20px;">
                    我已阅读并同意
                </el-button>
                <el-button @click="cancel" style="font-size: 16px;padding: 20px;">不同意</el-button>
            </div>
        </template>
    </el-dialog>
    <div class="expert">
        <div class="expert_head">
            <h3>专家评审你好！</h3>
            <h4>您评审的分类为：{{ list[userInfo.approveType] }}</h4>
        </div>
        <div class="expert_body">
            <div class="body_select">
                <h4>作品名称</h4>
                <div><el-input v-model="title" style="width: 240px" /></div>
                <h4>状态</h4>
                <div>
                    <el-select v-model="isProve" placeholder="" style="width: 240px">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </div>
            </div>
            <div class="body_show">
                <el-table :data="opus.slice((pageNum - 1) * pageSize, pageNum * pageSize)" style="width: 100%"
                    :header-cell-style="{ 'background-color': '#F1F3F8', 'color': '#000' }">
                    <el-table-column prop="itemId" label="序号" width="100" />
                    <el-table-column prop="title" label="作品名称" width="455" />
                    <el-table-column prop="updateTime" label="提交时间" width="200" />
                    <el-table-column prop="course" label="得分" width="180">
                        <template #default="{ row }">
                            <text style="color: red;">{{ getStatus(row.isApprove) }}</text>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作">
                        <template #default="{ row }">
                            <RouterLink :to="{ path: '/home/expert/score', query: { itemId: row.itemId } }"
                                style="color: #436EFF;">评分</RouterLink>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="paging">
                    <el-pagination :current-page="pageNum" :page-size="pageSize" :page-sizes="[10]"
                        layout="total, prev, pager, next, jumper" :total="opus.length" @size-change="handleSizeChange"
                        @current-change="handleCurrentChange" />
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.textspan {
    p {
        font-size: 17px;
        line-height: 2.5em;
    }
}

.expert {
    position: relative;
    height: auto;
    width: 1240px;
    margin: 20px auto;
    padding: 20px 0;
    background-color: #fff;

    .expert_head {
        width: 90%;
        margin: 17px auto;
        height: 110px;
        background: url('@/assets/PC端_slices/组 2 拷贝.png') center center no-repeat;
        background-size: cover;

        h3,
        h4 {
            color: #fff;
        }

        h3 {
            padding: 20px;
        }

        h4 {
            padding-left: 20px;
        }
    }

    .expert_body {
        width: 90%;
        height: auto;
        margin: 0 auto;

        .body_select {
            height: 30px;

            h4,
            div {
                float: left;
                line-height: 30px;
                margin-right: 20px;
            }
        }

        .body_show {
            margin-top: 10px;
            padding-bottom: 60px;

            .paging {
                float: right;
                margin-top: 20px;
            }
        }
    }
}
</style>