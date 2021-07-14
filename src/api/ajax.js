// 对 axios 进行二次封装 额外的让 axios 发送请求 有其他的功能
// noinspection JSUnresolvedFunction

import axios from "axios";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//  axios.create() 创建新的 axios 实例
const service = axios.create({
  // 配置基础路径和超时限制
  baseURL: 'http://localhost:8000/',
  timeout: 1000,
})

// 请求拦截器

service.interceptors.request.use(function (config) {
  // 这个 config 其实就是 请求报文


  // 这里可以添加额外的功能
  NProgress.start();  // 开始进度条
  config.headers


  // 请求报文一定还要返回去 因为还要继续往下走
  return config
}, function (error) {
  return Promise.reject(error)
})
// 响应拦截器
service.interceptors.response.use(function (response) {
  NProgress.done()  // 停止进度条


  // 只拿我们想要的信息
  return response.data
}, function (error) {
  NProgress.done()  // 停止进度条


  // 统一处理错误请求
  alert(error.message)
  // 可以继续选择处理 也可以不处理
  // return Promise.reject(new Error("Ajax Failed"))
  // 可以选择 中断 promise 链
  return new Promise(() => {
  })
})
export default service
