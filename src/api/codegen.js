import request from './ajax'

export const reqCodegen = (codes) => {
  return request({
    url: '/codegen',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: {
      codes
    }
  })
}