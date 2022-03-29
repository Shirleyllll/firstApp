import request from 'utils/request'

/**
 * 
 * @returns 获取频道数据
 */
export function getChannels() {
    return request.get('/channels')
}