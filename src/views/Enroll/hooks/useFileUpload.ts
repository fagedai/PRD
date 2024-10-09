import { ElMessage, ElMessageBox } from 'element-plus';
import { UploadErollRecord } from '@/apis/enroll';
export default function useFileUpload() {
    // 数据导入
    const beforeUPload = (file: File) => {
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
            if (res.msg == '操作成功') {
                ElMessage.success('上传成功！');
                upfile.res = res
            } else {
                ElMessage.error('上传失败！')
            }
        })
    }

    return { beforeUPload, exceedFile, handleError, handleSuccess, uploadFile }
}