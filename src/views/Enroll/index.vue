<script lang="ts" setup>
import UploadVideo from '@/components/UploadVideo.vue'
import useFileUpload from './hooks/useFileUpload'
import changeModel from './hooks/changeModel'
import useFormValidate from './hooks/useFormValidation'
import useUploadFormValidation from './hooks/useUploadFormValidation'
import { ref } from 'vue'

/////////////////// 公用模块 /////////////////////////

const { nowIdx, ChangeNowIdx } = changeModel()

/////////文件上传////////

const { exceedFile, handleError, handleSuccess, beforeUPload, uploadFile } = useFileUpload()

///////////////// 填写作品信息模块 ///////////////////

const { formSize, ruleFormRef, ruleForm, rules, box1wenjian, qual, NextForm } = useFormValidate(ChangeNowIdx)

///////////// 上传参赛作品模块 /////////////////////

///////table内容//////
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

//////上传数据保存处//////

const { UploadFormRef, UploadForm, Uprules, checkForm, SaveForm, SubmitForm, agreeBox1, agreeBox2 } = useUploadFormValidation(ruleForm)

////判断表单是否可修改


const agreeChange = () => {
    agreeBox1.value = false;
    agreeBox2.value = false;
}

</script>
<template>
    <div class="enroll">
        <!-- 编辑修改 -->
        <el-button class="edit" v-if="agreeBox1" @click="agreeChange">
            <i></i>
            <span>编辑</span>
        </el-button>
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
                        label-width="auto" class="demo-ruleForm" :size="formSize" status-icon :disabled="agreeBox1">
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

                        <div class="form_qual" style="display: flex; flex-direction: column; align-items: center">
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
                                    <el-checkbox
                                        style="margin-top: 17px; display: inline-flex; align-items: flex-start;">
                                        <span style="line-height: normal;">
                                            4、专业课程组的数学团队中“双师型”教师占比在50%以上；企业兼职教师<br>数量不超过1名；（此项可选择答题，不是必选项）
                                        </span>
                                    </el-checkbox>
                                    <br>
                                    <el-checkbox
                                        style="margin-top: 17px; display: inline-flex; align-items: flex-start;">
                                        <span style="line-height: normal;">
                                            5、近两年曾获得过全国职业院校技能大赛教学能力比赛一等奖的教学团队<br>各成员不能报名参赛，其所有成员所在学校不能以同一公共基础课报名参加<br>公共基础课程组，或不能以同一专业报名参加专业（技能）课程组的比赛；<br>近2年曾获得国赛二等奖的教学团队需要调整成员方能报名参赛（至多保留2名<br>原成员，且必须有新成员）。近2年获省赛奖励的作品，未作重大修改不得参赛。<br>获得2022年某某市中职业学校教学能力比赛一等奖的作品，不能参赛。
                                        </span>
                                    </el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                        </div>
                        <el-form-item label="参赛报名表" prop="baomingbiao" style="margin-top: 50px">
                            <el-upload :limit="1" :auto-upload="false" action="" accept=".pdf" :on-exceed="exceedFile"
                                :on-error="handleError" :on-success="handleSuccess" :before-upload="beforeUPload"
                                :show-file-list="true" v-model:file-list="box1wenjian.baomingbiao.file">
                                <template #trigger>
                                    <el-button type="primary" style="margin-right: 10px;">选择文件(.pdf)</el-button>
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
                                    <el-button type="primary" style="margin-right: 10px;">选择文件(.pdf)</el-button>
                                </template>
                                <el-button type="primary" @click="uploadFile(box1wenjian.xinxigongshi)">
                                    上传文件
                                </el-button>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="联系方式" prop="mobile">
                            <el-input v-model="ruleForm.mobile" placeholder="请填写联系方式" />
                        </el-form-item>
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
                        <el-form ref="UploadFormRef" :model="UploadForm" :rules="Uprules" :disabled="agreeBox2">
                            <ul>
                                <li style="height: auto;">
                                    <ul style="padding: 10px 0 0 10px;">
                                        <span>请上传MP4 格式的视频，最多可上传12个视频，且单个视频文件大小不超过 500M</span>
                                        <li
                                            style="border-bottom: 0; border-top: 2px solid #F1F1F1; margin-top: 20px;padding-top: 20px;height: 170px">
                                            <h3>团队1</h3>
                                            <UploadVideo v-model="checkForm.url1"></UploadVideo>
                                            <UploadVideo v-model="checkForm.url2"></UploadVideo>
                                            <UploadVideo v-model="checkForm.url3"></UploadVideo>
                                        </li>
                                        <li
                                            style="border-bottom: 0; border-top: 2px solid #F1F1F1; margin-top: 20px;padding-top: 20px;height: 170px">
                                            <h3>团队2</h3>
                                            <UploadVideo v-model="checkForm.url4"></UploadVideo>
                                            <UploadVideo v-model="checkForm.url5"></UploadVideo>
                                            <UploadVideo v-model="checkForm.url6"></UploadVideo>
                                        </li>
                                        <li
                                            style="border-bottom: 0; border-top: 2px solid #F1F1F1; margin-top: 20px;padding-top: 20px;height: 170px">
                                            <h3>团队3</h3>
                                            <UploadVideo v-model="checkForm.url7"></UploadVideo>
                                            <UploadVideo v-model="checkForm.url8"></UploadVideo>
                                            <UploadVideo v-model="checkForm.url9"></UploadVideo>
                                        </li>
                                        <li
                                            style="border-bottom: 0; border-top: 2px solid #F1F1F1; margin-top: 20px;padding: 20px 0 10px 0;height: 170px">
                                            <h3>团队4</h3>
                                            <UploadVideo v-model="checkForm.url10"></UploadVideo>
                                            <UploadVideo v-model="checkForm.url11"></UploadVideo>
                                            <UploadVideo v-model="checkForm.url12"></UploadVideo>
                                            <el-dialog v-model="dialogVisible">
                                                <img w-full :src="dialogImageUrl" alt="Preview Image" />
                                            </el-dialog>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <el-form-item prop="jiaoan" style="margin-left: 10px;">
                                        <el-upload :limit="1" :auto-upload="false" action="" accept=".pdf"
                                            :on-exceed="exceedFile" :on-error="handleError" :on-success="handleSuccess"
                                            :before-upload="beforeUPload" :show-file-list="true"
                                            v-model:file-list="UploadForm.jiaoan.file">
                                            <template #trigger>
                                                <el-button type="primary" style="margin:10px 10px 0 0;">选择文件</el-button>
                                            </template>
                                            <el-button type="primary" style="margin-right: 10px;"
                                                @click="uploadFile(UploadForm.jiaoan)">
                                                上传文件
                                            </el-button>
                                        </el-upload>
                                        <span>请上传100M以内的文件</span>
                                    </el-form-item>
                                </li>
                                <li>
                                    <el-form-item prop="baogao" style="margin-left: 10px;">
                                        <el-upload :limit="1" :auto-upload="false" action="" accept=".pdf"
                                            :on-exceed="exceedFile" :on-error="handleError" :on-success="handleSuccess"
                                            :before-upload="beforeUPload" :show-file-list="true"
                                            v-model:file-list="UploadForm.baogao.file">
                                            <template #trigger>
                                                <el-button type="primary" style="margin:10px 10px 0 0;">选择文件</el-button>
                                            </template>
                                            <el-button type="primary" style="margin-right: 10px;"
                                                @click="uploadFile(UploadForm.baogao)">
                                                上传文件
                                            </el-button>
                                        </el-upload>
                                        <span>请上传100M以内的文件</span>
                                    </el-form-item>
                                </li>
                                <li>
                                    <el-form-item prop="fangan" style="margin-left: 10px;">
                                        <el-upload :limit="1" :auto-upload="false" action="" accept=".pdf"
                                            :on-exceed="exceedFile" :on-error="handleError" :on-success="handleSuccess"
                                            :before-upload="beforeUPload" :show-file-list="true"
                                            v-model:file-list="UploadForm.fangan.file">
                                            <template #trigger>
                                                <el-button type="primary"
                                                    style="margin: 10px 10px 0 0;">选择文件</el-button>
                                            </template>
                                            <el-button type="primary" style="margin-right: 10px;"
                                                @click="uploadFile(UploadForm.fangan)">
                                                上传文件
                                            </el-button>
                                        </el-upload>
                                        <span>请上传100M以内的文件</span>
                                    </el-form-item>
                                </li>
                                <li>
                                    <el-form-item prop="biaozhun" style="margin-left: 10px;">
                                        <el-upload :limit="1" :auto-upload="false" action="" accept=".pdf"
                                            :on-exceed="exceedFile" :on-error="handleError" :on-success="handleSuccess"
                                            :before-upload="beforeUPload" :show-file-list="true"
                                            v-model:file-list="UploadForm.biaozhun.file">
                                            <template #trigger>
                                                <el-button type="primary"
                                                    style="margin: 10px 10px 0 0;;">选择文件</el-button>
                                            </template>
                                            <el-button type="primary" style="margin-right: 10px;"
                                                @click="uploadFile(UploadForm.biaozhun)">
                                                上传文件
                                            </el-button>
                                        </el-upload>
                                        <span>请上传100M以内的文件</span>
                                    </el-form-item>
                                </li>
                                <li style="position: relative;">
                                    <el-form-item prop="shuoming" style="margin-left: 10px;">
                                        <el-upload :limit="1" :auto-upload="false" action="" accept=".pdf"
                                            :on-exceed="exceedFile" :on-error="handleError" :on-success="handleSuccess"
                                            :before-upload="beforeUPload" :show-file-list="true"
                                            v-model:file-list="UploadForm.shuoming.file">
                                            <template #trigger>
                                                <el-button type="primary"
                                                    style="margin: 10px 10px 0 0;;">选择文件</el-button>
                                            </template>
                                            <el-button type="primary" style="margin-right: 10px;"
                                                @click="uploadFile(UploadForm.shuoming)">
                                                上传文件
                                            </el-button>
                                        </el-upload>
                                        <span>请上传100M以内的文件</span>
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
                    <el-button type="primary" @click="SaveForm(UploadFormRef)" size="large"
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

.edit {
    position: absolute;
    top: 80px;
    right: 320px;
    border: 0;
    color: #436EFF;

    i {
        display: inline-block;
        width: 12px;
        height: 12px;
        background-image: url('/src/assets/PC端_slices/矢量智能对象@2x(2).png');
        background-size: cover;
        background-repeat: no-repeat;
        margin-right: 3px;
    }
}
</style>