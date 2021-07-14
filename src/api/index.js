// 接口请求函数
import request from './ajax'
// 每一个函数都对应 一个接口 如果想要拿到 相关数据 只需要调用相关的请求函数

// axios 三种参数 params 参数 query 参数 请求体参数
// put 和 post 才有 请求体参数

// 请求三级分类 列表数据
export const reqCategoryList = () => {
  return request({
    url: '/product/getBaseCategoryList',
    method: 'get',
  })
}

export const reqUserRegister = (userInfo) => {
  return request({
    url: '/user/register',
    method: 'post',
    data: userInfo
  })
}
