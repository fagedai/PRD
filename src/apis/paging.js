import request from '@/utils/http'

export const getlistAPI = ({ pageNum, pageSize, isApprove, title }) => {
    return request({
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

export const getWorksNameAPI = (itemId) => {
    return request({
        url: 'biz/dsitems/info',
        method: 'GET',
        params: {
            itemId
        }
    })
}

export const getWorksSubmitAPI = ({ pageNum, pageSize, itemId }) => {
    return request({
        url: 'biz/itemSubs/list',
        method: 'POST',
        data: {
            pageNum,
            pageSize,
            itemId
        }
    })
}

export const postItemScoreAPI = ({ itemId, mark, dimension1, dimension2, dimension3, dimension4, dimension5, dimension6 }) => {
    return request({
        url: 'biz/score/add',
        method: 'POST',
        data: { itemId, mark, dimension1, dimension2, dimension3, dimension4, dimension5, dimension6 }
    })
}