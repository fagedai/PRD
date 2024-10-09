import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { UploadErollMes } from '@/apis/enroll'

export default function useUploadFormValidation(ruleForm: any) {
    const UploadFormRef = ref<FormInstance>()
    const UploadForm = reactive<any>({
        vedio: '',
        jiaoan: {
            file: [],
            res: null,
        },
        baogao: {
            file: [],
            res: null,
        },
        fangan: {
            file: [],
            res: null,
        },
        biaozhun: {
            file: [],
            res: null,
        },
        shuoming: {
            file: [],
            res: null,
        }
    })
    const Uprules = reactive<FormRules<any>>({
        vedio: [
            {
                required: true,
                message: '请上传视频',
                trigger: 'blur',
            },
        ],
        jiaoan: [
            {
                required: true,
                message: '请上传教案',
                trigger: 'blur',
            },
        ],
        baogao: [
            {
                required: true,
                message: '请上传教学实施报告',
                trigger: 'blur',
            },
        ],
        fangan: [
            {
                required: true,
                message: '请上传专业人才培养方案',
                trigger: 'blur',
            },
        ],
        biaozhun: [
            {
                required: true,
                message: '请上传教材课程标准',
                trigger: 'blur',
            },
        ],
        shuoming: [
            {
                required: true,
                message: '请上传教材选用说明',
                trigger: 'blur',
            },
        ],
    })

    //判断是否有上传视频
    const checkForm = reactive<any>({
        url1: '',
        url2: '',
        url3: '',
        url4: '',
        url5: '',
        url6: '',
        url7: '',
        url8: '',
        url9: '',
        url10: '',
        url11: '',
        url12: '',
    })

    //添加上传文件函数
    const addFile = () => {
        ruleForm.dsItemSubList.push({
            keyWord: "jiaoan",
            url: UploadForm.jiaoan.res.url,
            fileType: 2,
            subTitle: "教案⽂档.pdf"
        })
        ruleForm.dsItemSubList.push({
            keyWord: "baogao",
            url: UploadForm.baogao.res.url,
            fileType: 2,
            subTitle: "报告⽂档.pdf"
        })
        ruleForm.dsItemSubList.push({
            keyWord: "fangan",
            url: UploadForm.fangan.res.url,
            fileType: 2,
            subTitle: "方案⽂档.pdf"
        })
        ruleForm.dsItemSubList.push({
            keyWord: "biaozhun",
            url: UploadForm.biaozhun.res.url,
            fileType: 2,
            subTitle: "标准⽂档.pdf"
        })
        ruleForm.dsItemSubList.push({
            keyWord: "shuoming",
            url: UploadForm.shuoming.res.url,
            fileType: 2,
            subTitle: "说明⽂档.pdf"
        })
    }
    //保存
    const SaveForm = (formEl: FormInstance | undefined) => {
        const temp = Object.values(checkForm).filter(item => item !== '').map((itemurl, index) => ({
            keyWord: `vedio${index + 1}`, // 使用正确的索引，从1开始
            url: itemurl,
            fileType: 1,
            subTitle: "da.mp4"
        }));
        // 设置UploadForm的vedio属性
        UploadForm.vedio = temp.length > 0;
        if (!formEl) return;
        formEl.validate(async (valid) => {
            if (valid) {
                addFile()
                temp.forEach(item => ruleForm.dsItemSubList.push(item))
                console.log(ruleForm)
                await UploadErollMes(ruleForm)
                agreeBox1.value = true
                agreeBox2.value = true
                ElMessage.success('已保存！');
            }
        })

    }
    const SubmitForm = () => {
        ElMessage.success('提交成功！');
    }

    const agreeBox1 = ref(false)
    const agreeBox2 = ref(false)

    return { UploadFormRef, UploadForm, Uprules, checkForm, SaveForm, SubmitForm, agreeBox1, agreeBox2 }
}