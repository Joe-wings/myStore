
import { request } from "../utils";
//新建分类
const createGroupApi =  (data:{name:string,fatherId?:number}) => {
    return request({
        url: '/group',
        method: 'POST',
        data
    })
}
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
const getGroupByIdApi =  (id:number) => {
    return request({
        url: `/group/${id}`,
        method: 'GET',
    })
}

const deleteGroupApi =  (id:number) => {
    return request({
        url: `/group/${id}`,
        method: 'DELETE',
    })  
}

const updateGroupApi =  (id:number,data:{name:string,fatherId?:number | null}) => {
    return request({
        url: `/group/${id}`,
        method: 'PUT',
        data
    })  
}

export {
    getGroupsApi,
    getProductsByGroupApi,
    getGroupByIdApi,
    createGroupApi,
    deleteGroupApi,
    updateGroupApi
}