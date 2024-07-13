<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, computed, watchEffect } from 'vue';
import { getWorksNameAPI, getWorksSubmitAPI, postItemScoreAPI } from '@/apis/paging';

//获取数据
const route = useRoute()
const router = useRouter()

//刷新页面
function kannoFn() {
    location.reload();
}

//获取作品名称等
const data_name = ref(null)
const getWorksName = async () => {
    try {
        const res = await getWorksNameAPI(route.query.itemId)
        data_name.value = res.data;
    } catch (error) {
        console.error('获取列表数据时发生错误:', error);
    }

}

//获取作品提交等
const data_submit = ref(null)
const maplist = ref(null)
const jiaoan = ref(null)
const baogao = ref(null)
const fangan = ref(null)
const biaozhun = ref(null)
const shuoming = ref(null)
const getWorksSubmit = async () => {
    try {
        const res = await getWorksSubmitAPI({
            pageNum: 1,
            pageSize: 999,
            itemId: route.query.itemId
        })
        data_submit.value = res.data.map(item => ({
            ...item,
            url: item.url.startsWith('https://login') ? item.url : `http://reg.vip.cpolar.cn${item.url}`
        }));
        maplist.value = data_submit.value.filter(item => item.fileType === 1 && item.subTitle !== '')
        jiaoan.value = data_submit.value.filter(item => item.fileType === 2 && item.keyWord === 'jiaoan')
        baogao.value = data_submit.value.filter(item => item.fileType === 2 && item.keyWord === 'baogao')
        fangan.value = data_submit.value.filter(item => item.fileType === 2 && item.keyWord === 'fangan')
        biaozhun.value = data_submit.value.filter(item => item.fileType === 2 && item.keyWord === 'biaozhun')
        shuoming.value = data_submit.value.filter(item => item.fileType === 2 && item.keyWord === 'shuoming')
    } catch (error) {
        console.error('获取列表数据时发生错误:', error);
    }
}
watchEffect(async () => {
    await getWorksName();
    await getWorksSubmit();
})

//绑定表格得分
const list = ref(['', '', '', '', '', ''])
const suggestion = ref('')
const totalScore = computed(() => {
    return list.value.reduce((sum, item) => {
        const num = parseFloat(item);
        return isNaN(num) ? sum : sum + num;
    }, 0);
});

//上一个
const ToLast = () => {
    setTimeout(() => kannoFn(), 1000)
    router.replace({ path: '/home/expert/score', query: { itemId: Number(route.query.itemId) - 1 } })
}

//提交表格得分
//保存
const postItemScore = async () => {
    try {
        await postItemScoreAPI({
            itemId: route.query.itemId,
            mark: suggestion.value,
            dimension1: list.value[0],
            dimension2: list.value[1],
            dimension3: list.value[2],
            dimension4: list.value[3],
            dimension5: list.value[4],
            dimension6: list.value[5]
        })
        ElMessage.success('保存成功')
        router.replace({ path: '/home/expert' })
        setTimeout(() => kannoFn(), 1500)
    } catch (error) {
        console.error('获取列表数据时发生错误:', error);
    }
}
//保存并到下一个
const postItemScoreToNext = async () => {
    try {
        await postItemScoreAPI({
            itemId: route.query.itemId,
            mark: suggestion.value,
            dimension1: list.value[0],
            dimension2: list.value[1],
            dimension3: list.value[2],
            dimension4: list.value[3],
            dimension5: list.value[4],
            dimension6: list.value[5]
        })
        ElMessage.success('保存成功')
        setTimeout(() => kannoFn(), 1500)
        router.replace({ path: '/home/expert/score', query: { itemId: Number(route.query.itemId) + 1 } })
    } catch (error) {
        console.error('获取列表数据时发生错误:', error);
    }
}

</script>

<template>
    <div class="score">
        <div class="score_head">
            <p>
                <router-link to="/" @click="setTimeout(() => kannoFn(), 1000)">首页</router-link>
                >
                <router-link to="/home/expert" @click="setTimeout(() => kannoFn(), 1000)">专家评审</router-link>
                > {{ data_name?.title }}
            </p>
        </div>
        <div class="score_body1">
            <h1 style="margin-bottom: 10px;">{{ data_name?.title }}</h1>
            <span style="margin-right: 20px">所属分类：{{ data_name?.classOneName }}</span>
            <span>提交时间：{{ data_name?.updateTime }}</span>
            <table>
                <tr>
                    <td><span>课堂实录</span></td>
                    <td>
                        <ul>
                            <li v-for="item in maplist" :key="item.subId" style="float: left; margin:0 20px 10px 0;">
                                <video style="height: 165px" controls :src="item.url"></video>
                                <p style="text-align: center;">{{ item.subTitle }}</p>
                            </li>
                        </ul>
                        <!-- <video style="height: 165px" controls
                            src="http://reg.vip.cpolar.cn/profile/upload/2024/07/11/反恐精英：全球攻势 2024-06-26 20-21-31_20240711160049A276.mp4">
                        </video> -->
                    </td>
                </tr>
                <tr>
                    <td><span>教案</span></td>
                    <td>
                        <div class="fileShow">
                            <i></i>
                            <div style="float: right;margin: 10px 0;"><a :href="jiaoan[0].url"
                                    style="margin: auto 0;">{{ jiaoan[0]?.subTitle }}</a></div>
                        </div>
                        <div class="download" @click="get">
                            <i></i>
                            <a :href="jiaoan[0].url" download>下载</a>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td><span>教学实施报告</span></td>
                    <td>
                        <div class="fileShow">
                            <i></i>
                            <div style="float: right;margin: 10px 0;"><a :href="baogao[0].url"
                                    style="margin: auto 0;">{{ baogao[0]?.subTitle }}</a></div>
                        </div>
                        <div class="download">
                            <i></i>
                            <a :href="baogao[0].url" download>下载</a>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td><span>专业人才培养方案</span></td>
                    <td>
                        <div class="fileShow">
                            <i></i>
                            <div style="float: right;margin: 10px 0;"><a :href="fangan[0].url"
                                    style="margin: auto 0;">{{ fangan[0]?.subTitle }}</a></div>
                        </div>
                        <div class="download">
                            <i></i>
                            <a :href="fangan[0].url" download>下载</a>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td><span>课程标准</span></td>
                    <td>
                        <div class="fileShow">
                            <i></i>
                            <div style="float: right;margin: 10px 0;"><a :href="biaozhun[0].url"
                                    style="margin: auto 0;">{{ biaozhun[0]?.subTitle }}</a></div>
                        </div>
                        <div class="download">
                            <i></i>
                            <a :href="biaozhun[0].url" download>下载</a>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td><span>教材选用说明</span></td>
                    <td>
                        <div class="fileShow">
                            <i></i>
                            <div style="float: right;margin: 10px 0;"><a :href="shuoming[0].url"
                                    style="margin: auto 0;">{{ shuoming[0]?.subTitle }}</a></div>
                        </div>
                        <div class="download">
                            <i></i>
                            <a :href="shuoming[0].url" download>下载</a>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div class="score_body2">
            <h4 style="margin-bottom: 20px;">评审</h4>
            <table>
                <tr>
                    <th>一级指标</th>
                    <th>二级指标</th>
                    <th>评审标准</th>
                    <th>各项得分</th>
                    <th>总得分</th>
                </tr>
                <tr>
                    <td rowspan="6" class="first_td table_center">2023 年某某市职业院校技<br>能大赛教学能力比赛评分指<br>标(100分)</td>
                    <td class="table_center">
                        <p>教学实施报告</p>
                        <p>(20分)</p>
                    </td>
                    <td>
                        <p>1.教学理念先进，教学设计科学合理（4分）</p>
                        <p>2.教学实施以人为本，落实教学设计，教学有创新（4分）</p>
                        <p>3.学生学习效果突出，与教学内容、活动关联性强（4分）</p>
                        <p>4.教学反思深刻，改进举措针对性强、扎实有效（4分）</p>
                        <p>5.报告系统性强，行文规范、逻辑严谨、符合实际（4分）</p>
                    </td>
                    <td>
                        <el-input v-model="list[0]" style="width: 150px; height: 50px;" />
                    </td>
                    <td rowspan="6">
                        <p>{{ totalScore }}</p>
                    </td>
                </tr>
                <tr>
                    <td class="table_center">
                        <p>教案</p>
                        <p>(20分)</p>
                    </td>
                    <td>
                        <p>1.教学要素完整，版式规范，详略得当（4分）</p>
                        <p>2.课程思政系统设计，有机融入，培养学生的职业综合素养（4分）</p>
                        <p>3.学情分析精准聚焦，教学目标可评可测（4分）</p>
                        <p>4.教学内容科学严谨，教学策略运用恰当（4分）</p>
                        <p>5.教学评价科学合理，课后反思真实深刻（4分）</p>
                    </td>
                    <td>
                        <el-input v-model="list[1]" style="width: 150px; height: 50px;" />
                    </td>
                </tr>
                <tr>
                    <td class="table_center">
                        <p>视频资料</p>
                        <p>(40分)</p>
                    </td>
                    <td>
                        <p>1.坚持立德树人，德技并修（12分）</p>
                        <p>2.凸显职业教育类型特色，体现以生为本（7分）</p>
                        <p>3.课堂教学质量高、效果好，反映师生真实教学状态（7分）</p>
                        <p>4.数字技术与教学方式方法运用恰当，体现深度学习（7分）</p>
                        <p>5.展示教师良好综合素质，展现团队优势（7分）</p>
                    </td>
                    <td>
                        <el-input v-model="list[2]" style="width: 150px; height: 50px;" />
                    </td>
                </tr>
                <tr>
                    <td class="table_center">
                        <p>专业人才培养方案</p>
                        <p>(8分)</p>
                    </td>
                    <td>
                        <p>1.符合最新文件要求，科学规范制定（3分）</p>
                        <p>2.坚持全面发展，体现培养特色，文本规范严谨（3分）</p>
                        <p>3.体现优化改进，明确多方参与（2分）</p>
                    </td>
                    <td>
                        <el-input v-model="list[3]" style="width: 150px; height: 50px;" />
                    </td>
                </tr>
                <tr>
                    <td class="table_center">
                        <p>课程标准(或实施案)</p>
                        <p>(8分)</p>
                    </td>
                    <td>
                        <p>1.落实职业教育国家教学标准（3分）</p>
                        <p>2.条目齐全完备，科学规范（3分）</p>
                        <p>3.具有时代特色，体现（学科）技术领域发展（2分）</p>
                    </td>
                    <td>
                        <el-input v-model="list[4]" style="width: 150px; height: 50px;" />
                    </td>
                </tr>
                <tr>
                    <td class="table_center">
                        <p>教材选用说明</p>
                        <p>(4分)</p>
                    </td>
                    <td>
                        <p>1.符合国家关于教材使用相关规定和要求（2分）</p>
                        <p>2.明确选用制度与机制及执行情况（2分）</p>
                    </td>
                    <td>
                        <el-input v-model="list[5]" style="width: 150px; height: 50px;" />
                    </td>
                </tr>
            </table>
            <h4 style="margin: 20px 0;">评审意见</h4>
            <el-input v-model="suggestion" style="width: 1194px" :rows="4" type="textarea" placeholder="请输入" />
            <div class="score_footer">
                <el-button type="primary" @click="ToLast" size="large">
                    上一步
                </el-button>
                <el-button type="primary" @click="postItemScore" size="large">
                    保存
                </el-button>
                <el-button type="primary" @click="postItemScoreToNext" size="large">
                    保存并评审下一个
                </el-button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.table_center {
    text-align: center;
}

.score {
    height: auto;
    width: 1240px;
    margin: 0 auto;

    .score_head {
        margin: 10px 0;
    }

    .score_body1 {
        margin-bottom: 20px;
        padding: 20px 20px 40px 20px;
        background-color: #fff;

        table {
            border-collapse: collapse;
            border-top: 1px solid #ccc;
            margin-top: 10px;
            width: 1194px;
        }

        tr {
            td {
                padding: 20px;
                border: 1px solid #ccc;
                border-top: 0;

                &:first-child {
                    width: 25%;
                }

                .fileShow {
                    float: left;

                    i {
                        display: inline-block;
                        height: 30px;
                        width: 30px;
                        background-image: url('@/assets/PC端_slices/PdfType.png');
                        background-size: contain;
                        background-repeat: no-repeat;
                        margin-right: 5px;
                        margin-top: 5px;
                    }
                }

                .download {
                    float: right;
                    cursor: pointer;
                    margin: 10px 0;

                    i {
                        display: inline-block;
                        height: 15px;
                        width: 15px;
                        background-image: url('@/assets/PC端_slices/矢量智能对象 拷贝 5(1).png');
                        background-size: contain;
                        background-repeat: no-repeat;
                        margin-right: 5px;
                        margin-top: 5px;
                    }

                    a {
                        color: #879EC2;
                    }
                }
            }

            span {
                float: right;
            }
        }
    }

    .score_body2 {
        margin-bottom: 40px;
        padding: 20px 20px 40px 20px;
        background-color: #fff;

        table {
            border-collapse: collapse;
        }

        th {
            padding: 20px 0;
            border: 1px solid #ccc;
            background-color: #FAFAFA;

            &:last-child {
                padding: 20px 50px;
            }
        }

        td {
            border: 1px solid #ccc;
            border-top: 0;
            padding: 10px;
        }

        .first_td {
            height: 100px;
            width: 200px;
        }

        .score_footer {
            display: flex;
            justify-content: center;
            margin-top: 50px;
        }
    }
}
</style>