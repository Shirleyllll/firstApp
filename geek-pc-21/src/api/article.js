//封装和文章相关的接口
import request from 'utils/request'
/**
 * 获取文章列表数据
 */
export const getArticles = (params) => {
    return request({
        url: '/mp/articles',
        method: 'get',
        params
    })
}

export const delArticle = (id) => {
    return request.delete(`/mp/articles/${id}`)
}

export const addArticle = (data) => {
    return request.post('/mp/articles', data)
}