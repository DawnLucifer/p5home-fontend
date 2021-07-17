import request from './ajax'

export const reqSketchList = () => {
  return request({
    url: '/sketch/list',
    method: 'get',
    data: ''
  })
}

export const postSketch = (sketch) => {
  return request({
    url: '/sketch',
    method: 'post',
    data: sketch
  })
}