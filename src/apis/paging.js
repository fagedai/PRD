import requet from '@/utils/http'

export const getlistAPI = ({ pageNum, pageSize, isApprove, title }) => {
    return requet({
        url: '/biz/score/list',
        method: 'POST',
        data: {
            pageNum,
            pageSize,
            isApprove,
            title
        }
    })
}