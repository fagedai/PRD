<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { ComponentSize, FormInstance, FormRules, UploadInstance } from 'element-plus'

// 公用模块
const nowIdx = ref(0);
// 数据导入
const beforeUPload = (file: any) => {
    const isExcel =
        file.type === 'image/jpeg' ||
        file.type === 'image/png';
    if (!isExcel)
        ElMessageBox({
            title: '温馨提示',
            message: '上传文件只能是 jpg / png 格式！',
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
const uploadExcel = async (file: any) => {
    if (ruleForm.time == '' || ruleForm.fileList[0] == '' || ruleForm.files[0] == '')
        return ElMessage.error('日期或者文件不能为空！')
    let gasDataFile = ruleForm.fileList[0].raw
    let electricityDataFile = ruleForm.files[0].raw

    await dataInput({ time: ruleForm.time, gasDataFile, electricityDataFile }).then((res: any) => {
        if (res.message == '成功') {
            ElMessage.success('导入成功！');
            dialogFormVisible.value = false
        } else {
            ElMessage.error('导入失败！')
        }
    })
    getList()
    if (gasDataFile !== '') {
        form.time = ''
        uploadRefs.value?.clearFiles()
    }
    if (electricityDataFile !== '') {
        uploadRef.value?.clearFiles()
    }
}



// 填写作品信息模块
const formSize = ref<ComponentSize>('large')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<any>({
    name: '',
    type: '',
    school: '',
    team: '',
    qual: ['1', '2', '3', '4', '5'],
    qual_searr: '1',
    phone: '',
    enlist: [],
    publicity: []
})


const rules = reactive<FormRules<any>>({
    name: [
        {
            required: true,
            message: '请写作品名称',
            trigger: 'blur'
        },
    ],
    type: [
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
    team: [
        {
            required: true,
            message: '请输入参赛团队',
            trigger: 'blur'
        },
    ],
    qual: [
        {
            type: 'array',
            required: true,
            message: '请勾选满足的资格',
            trigger: 'blur',
        },
    ],
    phone: [
        {
            required: true,
            message: '请填写联系方式',
            trigger: 'blur',
        },
    ],
    enlist: [
        {
            required: true,
            message: '请上传参赛报名表',
            trigger: 'blur',
        },
    ],
    publicity: [
        {
            required: true,
            message: '请上传信息公示件',
            trigger: 'blur',
        },
    ],
})

const uploadRef1 = ref<UploadInstance>()
const uploadRef2 = ref<UploadInstance>()

// 提交表单
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!', fields)
        }
    })
    uploadRef1.value!.submit()
    uploadRef2.value!.submit()
}



// 上传参赛作品模块





</script>

<template>
    <div class="enroll">
        <!-- 填写作品信息模块 -->
        <div class="enroll_head">
            <div class="leftbox" @click="nowIdx = 0" style="cursor: pointer;">填写作品信息</div>
            <i></i>
            <div class="rightbox" @click="nowIdx = 1" style="cursor: pointer;">上传参赛作品</div>
        </div>
        <div class="enroll_body">
            <div v-show="nowIdx === 0" class="box1">
                <div class="enroll_form">
                    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules"
                        label-width="auto" class="demo-ruleForm" :size="formSize" status-icon>
                        <el-form-item label="作品名称" prop="name">
                            <el-input v-model="ruleForm.name" placeholder="请输入作品名称" />
                        </el-form-item>
                        <el-form-item label="参赛组别" prop="type">
                            <el-radio-group v-model="ruleForm.type">
                                <el-radio value="Ideological" name="type">
                                    思政课程组
                                </el-radio>
                                <el-radio value="Open" name="type">
                                    公开基础课程组（不含思政）
                                </el-radio>
                                <el-radio value="Professional Group 1" name="type">
                                    专业课程技能一组
                                </el-radio>
                                <el-radio value="Professional Group 2" name="type">
                                    专业课程技能二组
                                </el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="参赛学校" prop="school">
                            <el-input v-model="ruleForm.school" placeholder="请填写参赛学校名称" />
                        </el-form-item>
                        <el-form-item label="参赛团队" prop="team">
                            <el-input v-model="ruleForm.team" type="textarea" placeholder="请输入，多人用逗号隔空" />
                        </el-form-item>

                        <div class="form_qual" style="display: flex; flex-direction: column;">
                            <el-form-item label="参赛教学团队资格" prop="qual" style="margin:0 70px;">
                                <br>
                                <el-checkbox-group v-model="ruleForm.qual" style="margin:30px -118px;">
                                    <el-checkbox value="1" name="qual">
                                        1、团队每个成员教龄3年以上，近3年实际承担参赛课程或相关课程教学任务；
                                    </el-checkbox>
                                    <br>
                                    <el-checkbox value="2" name="qual">
                                        2、35岁以下（含）的教师不少于1人或思政课（二选一）
                                    </el-checkbox>
                                    <br>
                                    <el-radio-group v-model="ruleForm.qual_searr">
                                        <el-radio value="1" name="qual_type_1">
                                            35岁以下（含）的教师不少于1人
                                        </el-radio>
                                        <el-radio value="2" name="qual_type_2">
                                            思政课
                                        </el-radio>
                                    </el-radio-group>
                                    <br>
                                    <el-checkbox value="3" name="qual">
                                        3、具备高级专业技术职务或取得高级职业技能等级证书的教师不少于1人；
                                    </el-checkbox>
                                    <br>
                                    <el-checkbox value="4" name="qual" style="margin-top: 17px; ">
                                        <p style=" line-height: 1.5em;">
                                            4、专业课程组的数学团队中“双师型”教师占比在50%以上；企业兼职教师<br>数量不超过1名；（此项可选择答题，不是必选项）
                                        </p>
                                    </el-checkbox>
                                    <br>
                                    <el-checkbox value="5" name="qual" style="margin-top: 58px; ">
                                        <p style="line-height: 1.5em;">
                                            5、近两年曾获得过全国职业院校技能大赛教学能力比赛一等奖的教学团队<br>各成员不能报名参赛，其所有成员所在学校不能以同一公共基础课报名参加<br>公共基础课程组，或不能以同一专业报名参加专业（技能）课程组的比赛；<br>近2年曾获得国赛二等奖的教学团队需要调整成员方能报名参赛（至多保留2名<br>原成员，且必须有新成员）。近2年获省赛奖励的作品，未作重大修改不得参赛。<br>获得2022年某某市中职业学校教学能力比赛一等奖的作品，不能参赛。
                                        </p>
                                    </el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                        </div>
                        <el-form-item label="参赛报名表" prop="enlist" style="margin-top: 50px">
                            <el-upload ref="uploadRef1" class="upload-demo" :limit="1" action="" accept=".jpg, .png"
                                :show-file-list="true" :auto-upload="false" v-model:file-list="ruleForm.enlist"
                                :on-exceed="exceedFile" :on-error="handleError" :on-success="handleSuccess"
                                :before-upload="beforeUPload">
                                <template #trigger style="line-height: 15px;">
                                    <el-button type="primary">上传文件</el-button>
                                </template>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="信息公示件" prop="publicity" style="margin-top: 10px">
                            <el-upload ref="uploadRef2" class="upload-demo" :limit="1" action="" accept=".jpg, .png"
                                :auto-upload="false" v-model:file-list="ruleForm.publicity" :on-exceed="exceedFile"
                                :on-error="handleError" :on-success="handleSuccess" :before-upload="beforeUPload">
                                <template #trigger>
                                    <el-button type="primary">上传文件</el-button>
                                </template>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="联系方式" prop="phone">
                            <el-input v-model="ruleForm.phone" placeholder="请填写联系方式" />
                        </el-form-item>
                        <el-form-item style="margin: 60px 315px;" class="is-required">
                            <el-button type="primary" @click="submitForm(ruleFormRef)">
                                下一步
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>

            </div>

            <!-- 上传参赛作品模块 -->
            <div v-show="nowIdx === 1" class="box2">
                1
            </div>
        </div>
    </div>
</template>

<style scoped>
/* 公用 */
.enroll {
    position: relative;
    height: 1240px;
    width: 1240px;
    margin: 20px auto;
    background-color: #fff;
}

.enroll_head {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    font-size: 20px;

    .leftbox {
        background-color: #436EFF;
        width: 60%;
        padding: 10px;
        font-weight: bold;
        color: white;
        text-align: center;
    }

    i {
        position: absolute;
        top: 19px;
        right: 455px;
        display: inline-block;
        width: 0;
        height: 0;
        border-left: 25px solid #436EFF;
        border-right: 25px solid transparent;
        border-top: 25px solid transparent;
        border-bottom: 25px solid transparent;
    }

    .rightbox {
        background-color: #F1F1F1;
        width: 40%;
        padding: 10px;
        font-weight: bold;
        color: black;
        text-align: center;
    }
}

.enroll_body {
    position: absolute;
    transition: opacity 0.5s;

    .box2 {
        background-color: #436EFF;
        z-index: 1;
    }
}

/* 作品信息 */
.el-checkbox {
    --el-checkbox-checked-text-color: none;

}

.enroll_form {
    display: flex;
    justify-content: center;
    width: 1200px;
    margin: 10px auto;
}

.el-form-item--large {
    --font-size: 18px;
}

.form_qual {
    .el-form-item--large {
        --font-size: 15px;
    }

    .el-radio-group {
        margin-left: 20px;
    }

    .el-checkbox__input {
        flex: none
    }
}

/* 上传信息 */
</style>