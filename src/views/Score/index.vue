<script setup>
import { useRoute } from 'vue-router';
import { ref, computed } from 'vue';

//获取数据
const route = useRoute()
console.log(route.query)

//绑定表格得分
const list = ref(['', '', '', '', '', ''])
const totalScore = computed(() => {
    return list.value.reduce((sum, item) => {
        const num = parseFloat(item);
        return isNaN(num) ? sum : sum + num;
    }, 0);
});
const suggestion = ref('')

const get = () => {
    console.log(1);
}
</script>

<template>
    <div class="score">
        <div class="score_head">
            <p>首页 > 专家评审 > 我叫MT</p>
        </div>
        <div class="score_body1">
            <h1 style="margin-bottom: 10px;">我叫MT</h1>
            <span style="margin-right: 20px">所属分类：公共基础课程组（不含思政）</span>
            <span>提交时间：2023-11-5</span>
            <table>
                <tr>
                    <td><span>课堂实录</span></td>
                    <td>1</td>
                </tr>
                <tr>
                    <td><span>教案</span></td>
                    <td>
                        <div></div>
                        <div class="download" @click="get">
                            <i></i>
                            <span>下载</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td><span>教学实施报告</span></td>
                    <td>
                        <div></div>
                        <div class="download">
                            <i></i>
                            <span>下载</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td><span>专业人才培养方案</span></td>
                    <td>
                        <div></div>
                        <div class="download">
                            <i></i>
                            <span>下载</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td><span>课程标准</span></td>
                    <td>
                        <div></div>
                        <div class="download">
                            <i></i>
                            <span>下载</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td><span>教材选用说明</span></td>
                    <td>
                        <div></div>
                        <div class="download">
                            <i></i>
                            <span>下载</span>
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
                <el-button type="primary" @click="ChangeNowIdx" size="large">
                    上一步
                </el-button>
                <el-button type="primary" @click="ChangeNowIdx" size="large">
                    保存
                </el-button>
                <el-button type="primary" @click="ChangeNowIdx" size="large">
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

                .download {
                    float: right;
                    cursor: pointer;

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

                    span {
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