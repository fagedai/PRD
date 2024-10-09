import { ref, reactive, watch } from 'vue'
import changeModel from './changeModel'
import { userInfoStore } from '@/stores/user'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'

export default function useFormValidation(ChangeNowIdx: any) {
    const userStore = userInfoStore();
    const { userInfo } = userStore;

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
    watch(() => box1wenjian.baomingbiao.res, (newValue, oldValue) => {
        console.log(1111);
        ruleForm.baomingbiao = newValue.fileName;
        ruleForm.dsItemSubList.push({
            keyWord: "baomingbiao",
            url: newValue.url,
            fileType: 2,
            subTitle: "报名表⽂档.pdf"
        })
    })
    watch(() => box1wenjian.xinxigongshi.res, (newValue, oldValue) => {
        console.log(1111);

        ruleForm.xinxigongshi = newValue.fileName;
        ruleForm.dsItemSubList.push({
            keyWord: "xinxigongshi",
            url: newValue.url,
            fileType: 2,
            subTitle: "信息公示⽂档.pdf"
        })
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

    return { formSize, ruleFormRef, ruleForm, rules, box1wenjian, qual, NextForm }
}