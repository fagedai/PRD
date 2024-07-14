import request from '@/utils/http'

export const UploadErollMes = (Message: object) => {
    return request({
        url: 'biz/dsitems/insert',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8' // 设置请求头部
        },
        data: Message
    })
}

export const UploadErollRecord = (Record: File) => {
    const formData = new FormData();
    formData.append('file', Record); // 将文件添加到FormData对象中，并指定参数名为'file'

    return request({
        url: 'common/upload',
        method: 'POST',
        data: formData
    });
}