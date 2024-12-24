
import { request } from "../utils";

//获取分类列表
const getGroupsApi =  () => {
    return request({
        url: '/group',
        method: 'GET',
    })
}
//获取该分类下的所有商品
const getProductsByGroupApi =  (id:number) => {
    return request({
        url: `/group/findProductByGroup/${id}`,
        method: 'GET',
    })
}

export {
    getGroupsApi,
    getProductsByGroupApi
}