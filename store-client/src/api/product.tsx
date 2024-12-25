import { product } from "../type";
import { request } from "../utils";

//获取所有商品
const getProductsApi = () => {
    return request({
        url: '/product',
        method: 'GET',
    })
}

//根据id获取商品
const getProductByIdApi = (id: number) => {
    return request({
        url: `/product/getbyid/${id}`,
        method: 'GET',
    })
}

//创建新的商品
const createProductApi = (data: product) => {
    return request({
        url: '/product',
        method: 'POST',
        data
    })
}
//根据用户id获取商品
const getProductsByUserIdApi = (userId: number) => {
    return request({
        url: `/product/getbyuserid/${userId}`,
        method: 'GET',
    })
}

//更新商品
const updateProductApi = (id: number, data: product) => {
    return request({
        url: `/product/change/${id}`,
        method: 'PUT',
        data
    })
}

//删除商品
const deleteProductApi = (id: number) => {
    return request({
        url: `/product/delete/${id}`,
        method: 'DELETE',
    })
}
//搜索商品
const searchProductApi = (keyword: string) => {
    return request({
        url: `/product/search/${keyword}`,
        method: 'GET',
    })
}
export {
    getProductsApi,
    createProductApi,
    updateProductApi,
    deleteProductApi,
    searchProductApi,
    getProductsByUserIdApi,
    getProductByIdApi
}