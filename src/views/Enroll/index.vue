<script lang="ts" setup>
import { reactive, ref, watchEffect, watch } from 'vue'
import { Delete, Plus } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { ComponentSize, FormInstance, FormRules, UploadInstance, UploadFile } from 'element-plus'
import { UploadErollRecord } from '@/apis/enroll'
import { userInfoStore } from '@/stores/user'

/////////////////// 公用模块 /////////////////////////
///切换板块////
const nowIdx = ref(1);
const ChangeNowIdx = () => {
    if (nowIdx.value === 0)
        nowIdx.value = 1
    else
        nowIdx.value = 0;
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
const userStore = userInfoStore();
const { userInfo } = userStore;

/////////文件上传////////

// 数据导入
const beforeUPload = (file: any) => {
    const isExcel =
        file.type === 'multipart/pdf'
    if (!isExcel)
        ElMessageBox({
            title: '温馨提示',
            message: '上传文件只能是 pdf 格式！',
            type: 'warning',
        });
    return isExcel;
};
// 文件数超出提示
const exceedFile = () => {
    ElMessage.warning('最多只能上传一个文件！');
};
// 上传错误提示
const handleError = () => {
    ElMessage.error('导入数据失败，请您重新上传！');
};
//上传成功提示
const handleSuccess = () => {
    ElMessage.success('导入数据成功！');
};
// 文件上传
const uploadFile = async (upfile: any) => {
    let file = upfile.file[0].raw
    await UploadErollRecord(file).then((res: any) => {
        console.log(res);

        if (res.msg == '操作成功') {
            ElMessage.success('上传成功！');
            upfile.res = res
        } else {
            ElMessage.error('上传失败！')
        }
    })
}

///////////////// 填写作品信息模块 ///////////////////

const formSize = ref<ComponentSize>('large')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<any>({
    userId: userInfo.userId,
    title: '',                          //主标题
    subTitle: '',                       //副标题
    classOne: '',                       //一级课程组分类
    school: '',                         //学校
    teacher: '',                        //老师参赛人员
    mobile: '',                         //电话
    dsItemSubList: [                    //提交的视频和pdf文件对象数组
        {
            keyWord: 'checked1',
            url: 1,
            fileType: 2,
            subTitle: ''
        },
    ],
    baomingbiao: '',                    //报告表文档
    xinxigongshi: '',                   //信息公示文档
})
const rules = reactive<FormRules<any>>({
    title: [
        {
            required: true,
            message: '请写作品名称',
            trigger: 'blur'
        },
    ],
    classOne: [
        {
            required: true,
            message: '请选参数组别',
            trigger: 'blur',
        },
    ],
    school: [
        {
            required: true,
            message: '请选参数学校',
            trigger: 'blur',
        },
    ],
    teacher: [
        {
            required: true,
            message: '请输入参赛团队',
            trigger: 'blur'
        },
    ],
    mobile: [
        {
            required: true,
            message: '请填写联系方式',
            trigger: 'blur',
        },
    ],
    baomingbiao: [
        {
            required: true,
            message: '请上传参赛报名表',
            trigger: 'blur',
        },
    ],
    xinxigongshi: [
        {
            required: true,
            message: '请上传信息公示件',
            trigger: 'blur',
        },
    ],
})
//box1的两个文件
const box1wenjian = reactive<any>({
    xinxigongshi: {
        file: [],
        res: null,
    },
    baomingbiao: {
        file: [],
        res: null,
    },
})
//监视文件的变化
watchEffect(() => {
    if (box1wenjian.baomingbiao.res !== null) {
        ruleForm.baomingbiao = box1wenjian.baomingbiao.res.fileName;
        ruleForm.dsItemSubList.push({
            keyWord: "baomingbiao",
            url: box1wenjian.baomingbiao.res.url,
            fileType: 2,
            subTitle: "报名表⽂档.pdf"
        })
    }
})
watchEffect(() => {
    if (box1wenjian.xinxigongshi.res !== null) {
        ruleForm.xinxigongshi = box1wenjian.xinxigongshi.res.fileName;
        // console.log(box1wenjian.xinxigongshi.res.fileName);
        ruleForm.dsItemSubList.push({
            keyWord: "xinxigongshi",
            url: box1wenjian.xinxigongshi.res.url,
            fileType: 2,
            subTitle: "信息公示⽂档.pdf"
        })
    }
})
//选的checked组别
const qual = ref('1')
//监视组别变化
watch(qual, (newValue, oldValue) => {
    if (newValue === '1') {
        const temp = ruleForm.dsItemSubList.filter(item => item.url === 2)
        temp.push({
            keyWord: 'checked1',
            url: 1,
            fileType: 2,
            subTitle: ''
        })
        ruleForm.dsItemSubList = temp
    }
    else {
        const temp = ruleForm.dsItemSubList.filter(item => item.url === '1')
        temp.push({
            keyWord: 'checked2',
            url: 2,
            fileType: 2,
            subTitle: ''
        })
        ruleForm.dsItemSubList = temp
    }
})

// 下一步表单检测
const NextForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) { ChangeNowIdx() }
    })
}



///////////// 上传参赛作品模块 /////////////////////

///////table内容//////
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)

const handleRemove = (file: UploadFile) => {
    UploadForm.value.vedio = UploadForm.value.vedio.filter((item: UploadFile) => item !== file);
}

const SaveForm = () => {
    ElMessage.success('已保存！');
}
const SubmitForm = () => {
    ElMessage.success('提交成功！');
}

//上传数据保存处
const UploadFormRef = ref<FormInstance>()
const UploadForm = reactive<any>({
    vedio: [],
    teachPlan: [],
    report: [],
    schemePlan: [],
    standard: [],
    explain: []
})
const Uprules = reactive<FormRules<any>>({
    vedio: [
        {
            required: true,
            message: '请上传参赛报名表',
            trigger: 'blur',
        },
    ],
    teachPlan: [
        {
            required: true,
            message: '请上传教案',
            trigger: 'blur',
        },
    ],
    report: [
        {
            required: true,
            message: '请上传专业人才培养方案',
            trigger: 'blur',
        },
    ],
    schemePlan: [
        {
            required: true,
            message: '请上传课程标准',
            trigger: 'blur',
        },
    ],
    standard: [
        {
            required: true,
            message: '请上传教材选用说明',
            trigger: 'blur',
        },
    ],
    explain: [
        {
            required: true,
            message: '请上传参赛报名表',
            trigger: 'blur',
        },
    ],
})



</script>

<template>
    <div class="enroll">
        <!-- 填写作品信息模块 -->
        <div class="enroll_head">
            <div class="leftbox" :class="{ active_head: nowIdx === 0, hidden_head: nowIdx === 1 }">填写作品信息</div>
            <i :class="{ active_i: nowIdx === 0, hidden_i: nowIdx === 1 }"></i>
            <div class="rightbox" :class="{ active_head: nowIdx === 1, hidden_head: nowIdx === 0 }">上传参赛作品</div>
        </div>
        <div class="enroll_body" style="height: auto;">
            <div v-show="nowIdx === 0" class="box1">
                <div class="enroll_form">
                    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules"
                        label-width="auto" class="demo-ruleForm" :size="formSize" status-icon>
                        <el-form-item label="作品名称" prop="title">
                            <el-input v-model="ruleForm.title" placeholder="请输入作品名称" />
                        </el-form-item>
                        <el-form-item label="参赛组别" prop="classOne">
                            <el-radio-group v-model="ruleForm.classOne">
                                <el-radio value="0" name="type">
                                    思政课程组
                                </el-radio>
                                <el-radio value="1" name="type">
                                    公开基础课程组（不含思政）
                                </el-radio>
                                <el-radio value="2" name="type">
                                    专业课程技能一组
                                </el-radio>
                                <el-radio value="3" name="type">
                                    专业课程技能二组
                                </el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="参赛学校" prop="school">
                            <el-input v-model="ruleForm.school" placeholder="请填写参赛学校名称" />
                        </el-form-item>
                        <el-form-item label="参赛团队" prop="teacher">
                            <el-input v-model="ruleForm.teacher" type="textarea" placeholder="请输入，多人用逗号隔空" />
                        </el-form-item>

                        <div class="form_qual" style="display: flex; flex-direction: column;">
                            <el-form-item label="参赛教学团队资格" prop="qual" style="margin:0 70px;">
                                <br>
                                <el-checkbox-group style="margin:30px -118px;">
                                    <el-checkbox :checked="true">
                                        1、团队每个成员教龄3年以上，近3年实际承担参赛课程或相关课程教学任务；
                                    </el-checkbox>
                                    <br>
                                    <el-checkbox>
                                        2、35岁以下（含）的教师不少于1人或思政课（二选一）
                                    </el-checkbox>
                                    <br>
                                    <el-radio-group v-model="qual">
                                        <el-radio value="1">
                                            35岁以下（含）的教师不少于1人
                                        </el-radio>
                                        <el-radio value="2">
                                            思政课
                                        </el-radio>
                                    </el-radio-group>
                                    <br>
                                    <el-checkbox>
                                        3、具备高级专业技术职务或取得高级职业技能等级证书的教师不少于1人；
                                    </el-checkbox>
                                    <br>
                                    <el-checkbox style="margin-top: 17px; ">
                                        <p style=" line-height: 1.5em;">
                                            4、专业课程组的数学团队中“双师型”教师占比在50%以上；企业兼职教师<br>数量不超过1名；（此项可选择答题，不是必选项）
                                        </p>
                                    </el-checkbox>
                                    <br>
                                    <el-checkbox style="margin-top: 58px; ">
                                        <p style="line-height: 1.5em;">
                                            5、近两年曾获得过全国职业院校技能大赛教学能力比赛一等奖的教学团队<br>各成员不能报名参赛，其所有成员所在学校不能以同一公共基础课报名参加<br>公共基础课程组，或不能以同一专业报名参加专业（技能）课程组的比赛；<br>近2年曾获得国赛二等奖的教学团队需要调整成员方能报名参赛（至多保留2名<br>原成员，且必须有新成员）。近2年获省赛奖励的作品，未作重大修改不得参赛。<br>获得2022年某某市中职业学校教学能力比赛一等奖的作品，不能参赛。
                                        </p>
                                    </el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                        </div>
                        <el-form-item label="参赛报名表" prop="baomingbiao" style="margin-top: 50px">
                            <el-upload :limit="1" :auto-upload="false" action="" accept=".pdf" :on-exceed="exceedFile"
                                :on-error="handleError" :on-success="handleSuccess" :before-upload="beforeUPload"
                                :show-file-list="true" v-model:file-list="box1wenjian.baomingbiao.file">
                                <template #trigger>
                                    <el-button type="primary" style="margin-right: 10px;">选择文件</el-button>
                                </template>
                                <el-button type="primary" @click="uploadFile(box1wenjian.baomingbiao)">
                                    上传文件
                                </el-button>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="信息公示件" prop="xinxigongshi" style="margin-top: 10px">
                            <el-upload :limit="1" :auto-upload="false" action="" accept=".pdf" :on-exceed="exceedFile"
                                :on-error="handleError" :on-success="handleSuccess" :before-upload="beforeUPload"
                                :show-file-list="true" v-model:file-list="box1wenjian.xinxigongshi.file">
                                <template #trigger>
                                    <el-button type="primary" style="margin-right: 10px;">选择文件</el-button>
                                </template>
                                <el-button type="primary" @click="uploadFile(box1wenjian.xinxigongshi)">
                                    上传文件
                                </el-button>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="联系方式" prop="mobile">
                            <el-input v-model="ruleForm.mobile" placeholder="请填写联系方式" />
                        </el-form-item>
                        <!-- submitForm(ruleFormRef) -->
                        <el-form-item style="margin: 60px 209px;" class="is-required">
                            <el-button type="primary" @click="NextForm(ruleFormRef)"
                                style=" font-size: 20px; padding: 25px 60px;">
                                下一步
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>

            <!-- 上传参赛作品模块 -->
            <div v-show="nowIdx === 1" style="padding-bottom:10px">
                <div class="box2 upload_head">
                    <div class="left">
                        <ul>
                            <li>
                                <span>课堂实录</span>
                            </li>
                            <li>
                                <span>教案</span>
                            </li>
                            <li>
                                <span>教学实施报告</span>
                            </li>
                            <li>
                                <span>专业人才培养方案</span>
                            </li>
                            <li>
                                <span>课程标准</span>
                            </li>
                            <li>
                                <span>教材选用说明</span>
                            </li>
                        </ul>
                    </div>
                    <div class="right">
                        <el-form ref="UploadFormRef" :model="UploadForm" :rules="Uprules">
                            <ul>
                                <li style="height: auto;">
                                    <ul style="padding: 10px 0 0 10px;">
                                        <span>请上传MP4 格式的视频，最多可上传12个视频，且单个视频文件大小不超过 500M</span>
                                        <li
                                            style="border-bottom: 0; border-top: 2px solid #F1F1F1; margin-top: 20px;padding-top: 20px;height: 170px">
                                            <h3>团队1
                                                <span>最多上传3个</span>
                                            </h3>
                                            <el-upload action="#" list-type="picture-card" :auto-upload="false"
                                                :file-list="UploadForm.vedio" :limit="3" class="changeSize"
                                                style="margin-top:20px">
                                                <el-icon>
                                                    <Plus />
                                                </el-icon>

                                                <template #file="{ file }">
                                                    <div>
                                                        <img class="el-upload-list__item-thumbnail" :src="file.url"
                                                            alt="" />
                                                        <span class="el-upload-list__item-actions">
                                                            <span v-if="!disabled" class="el-upload-list__item-delete"
                                                                @click="handleRemove(file)">
                                                                <el-icon>
                                                                    <Delete />
                                                                </el-icon>
                                                            </span>
                                                        </span>
                                                    </div>
                                                </template>
                                            </el-upload>

                                            <el-dialog v-model="dialogVisible">
                                                <img w-full :src="dialogImageUrl" alt="Preview Image" />
                                            </el-dialog>
                                        </li>
                                        <li
                                            style="border-bottom: 0; border-top: 2px solid #F1F1F1; margin-top: 20px;padding-top: 20px;height: 170px">
                                            <h3>团队2
                                                <span>最多上传3个</span>
                                            </h3>
                                            <el-upload action="#" list-type="picture-card" :auto-upload="false"
                                                :limit="3" class="changeSize" style="margin-top:20px">
                                                <el-icon>
                                                    <Plus />
                                                </el-icon>

                                                <template #file="{ file }">
                                                    <div>
                                                        <img class="el-upload-list__item-thumbnail" :src="file.url"
                                                            alt="" />
                                                        <span class="el-upload-list__item-actions">
                                                            <span v-if="!disabled" class="el-upload-list__item-delete"
                                                                @click="handleRemove(file)">
                                                                <el-icon>
                                                                    <Delete />
                                                                </el-icon>
                                                            </span>
                                                        </span>
                                                    </div>
                                                </template>
                                            </el-upload>

                                            <el-dialog v-model="dialogVisible">
                                                <img w-full :src="dialogImageUrl" alt="Preview Image" />
                                            </el-dialog>
                                        </li>
                                        <li
                                            style="border-bottom: 0; border-top: 2px solid #F1F1F1; margin-top: 20px;padding-top: 20px;height: 170px">
                                            <h3>团队3
                                                <span>最多上传3个</span>
                                            </h3>
                                            <el-upload action="#" list-type="picture-card" :auto-upload="false"
                                                :limit="3" class="changeSize" style="margin-top:20px">
                                                <el-icon>
                                                    <Plus />
                                                </el-icon>

                                                <template #file="{ file }">
                                                    <div>
                                                        <img class="el-upload-list__item-thumbnail" :src="file.url"
                                                            alt="" />
                                                        <span class="el-upload-list__item-actions">
                                                            <span v-if="!disabled" class="el-upload-list__item-delete"
                                                                @click="handleRemove(file)">
                                                                <el-icon>
                                                                    <Delete />
                                                                </el-icon>
                                                            </span>
                                                        </span>
                                                    </div>
                                                </template>
                                            </el-upload>

                                            <el-dialog v-model="dialogVisible">
                                                <img w-full :src="dialogImageUrl" alt="Preview Image" />
                                            </el-dialog>
                                        </li>
                                        <li
                                            style="border-bottom: 0; border-top: 2px solid #F1F1F1; margin-top: 20px;padding: 20px 0 10px 0;height: 170px">
                                            <h3>团队4
                                                <span>最多上传3个</span>
                                            </h3>
                                            <el-upload action="#" list-type="picture-card" :auto-upload="false"
                                                :limit="3" class="changeSize" style="margin-top:20px">
                                                <el-icon>
                                                    <Plus />
                                                </el-icon>

                                                <template #file="{ file }">
                                                    <div>
                                                        <img class="el-upload-list__item-thumbnail" :src="file.url"
                                                            alt="" />
                                                        <span class="el-upload-list__item-actions">
                                                            <span v-if="!disabled" class="el-upload-list__item-delete"
                                                                @click="handleRemove(file)">
                                                                <el-icon>
                                                                    <Delete />
                                                                </el-icon>
                                                            </span>
                                                        </span>
                                                    </div>
                                                </template>
                                            </el-upload>

                                            <el-dialog v-model="dialogVisible">
                                                <img w-full :src="dialogImageUrl" alt="Preview Image" />
                                            </el-dialog>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <el-form-item prop="baomingbiao">
                                        <el-upload ref="uploadRef2" class="upload-demo" :limit="1" action=""
                                            accept=".jpg, .png" :auto-upload="false" :on-exceed="exceedFile"
                                            :on-error="handleError" :on-success="handleSuccess"
                                            :before-upload="beforeUPload">
                                            <template #trigger>
                                                <el-button type="primary" style="margin: 0 10px;">上传文件</el-button>
                                            </template>
                                            <span>请上传100M以内的文件</span>
                                        </el-upload>
                                    </el-form-item>
                                </li>
                                <li>
                                    <el-form-item prop="baomingbiao">
                                        <el-upload ref="uploadRef2" class="upload-demo" :limit="1" action=""
                                            accept=".jpg, .png" :auto-upload="false" :on-exceed="exceedFile"
                                            :on-error="handleError" :on-success="handleSuccess"
                                            :before-upload="beforeUPload">
                                            <template #trigger>
                                                <el-button type="primary" style="margin: 0 10px;">上传文件</el-button>
                                            </template>
                                            <span>请上传100M以内的文件</span>
                                        </el-upload>
                                    </el-form-item>
                                </li>
                                <li>
                                    <el-form-item prop="baomingbiao">
                                        <el-upload ref="uploadRef2" class="upload-demo" :limit="1" action=""
                                            accept=".jpg, .png" :auto-upload="false" :on-exceed="exceedFile"
                                            :on-error="handleError" :on-success="handleSuccess"
                                            :before-upload="beforeUPload">
                                            <template #trigger>
                                                <el-button type="primary" style="margin: 0 10px;">上传文件</el-button>
                                            </template>
                                            <span>请上传100M以内的文件</span>
                                        </el-upload>
                                    </el-form-item>
                                </li>
                                <li>
                                    <el-form-item prop="baomingbiao">
                                        <el-upload ref="uploadRef2" class="upload-demo" :limit="1" action=""
                                            accept=".jpg, .png" :auto-upload="false" :on-exceed="exceedFile"
                                            :on-error="handleError" :on-success="handleSuccess"
                                            :before-upload="beforeUPload">
                                            <template #trigger>
                                                <el-button type="primary" style="margin: 0 10px;">上传文件</el-button>
                                            </template>
                                            <span>请上传100M以内的文件</span>
                                        </el-upload>
                                    </el-form-item>
                                </li>
                                <li>
                                    <el-form-item prop="baomingbiao">
                                        <el-upload ref="uploadRef2" class="upload-demo" :limit="1" action=""
                                            accept=".jpg, .png" :auto-upload="false" :on-exceed="exceedFile"
                                            :on-error="handleError" :on-success="handleSuccess"
                                            :before-upload="beforeUPload">
                                            <template #trigger>
                                                <el-button type="primary" style="margin: 0 10px;">上传文件</el-button>
                                            </template>
                                            <span>请上传100M以内的文件</span>
                                        </el-upload>
                                    </el-form-item>
                                </li>
                            </ul>
                        </el-form>
                    </div>
                </div>
                <div class="upload_footer">
                    <el-button type="primary" @click="ChangeNowIdx" size="large"
                        style="margin: 0 30px; font-size: 20px; padding: 25px 60px;">
                        上一步
                    </el-button>
                    <el-button type="primary" @click="SaveForm" size="large"
                        style="margin: 0 30px; font-size: 20px; padding: 25px 60px;">
                        保存
                    </el-button>
                    <el-button type="primary" @click="SubmitForm" size="large"
                        style="margin: 0 30px; font-size: 20px; padding: 25px 60px;">
                        提交
                    </el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url(./css/enroll.css);
</style>