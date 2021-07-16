import request from './ajax'

export const reqLogin = (userInfo) => {
  return request({
    url: '/user/login',
    method: 'get',
    data: userInfo
  })
}