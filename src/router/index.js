import Vue from "vue";
import VueRouter from "vue-router";
import CodeEditor from "@/pages/CodeEditor";
import Render from "@/pages/Render";
import Home from "@/pages/Home";
import Login from "@/pages/Login";

Vue.use(VueRouter)


// eslint-disable-next-line no-unused-vars
const originPush = VueRouter.prototype.push

// eslint-disable-next-line no-unused-vars
VueRouter.prototype.push = function (location, onResolved, onRejected) {
  //location 就是 在调用 push 方法是传递的对象
  if (onResolved === undefined && onRejected === undefined)
      // 重新指定 函数内部 this 的指向
    return originPush.call(this, location).catch(() => {
    })
  else return originPush.call(this, location, onResolved, onRejected)
}

// const CodeEditor = () => import("@/pages/CodeEditor")
// const Render = () => import("@/pages/Render")
// const Home = () => import("@/pages/Home")
// const Login = () => import("@/pages/Login")

const router = new VueRouter({
  routes: [
    {
      path: '/sketch',
      component: CodeEditor
    },
    {
      path: '/render',
      component: Render
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/',
      component: Home
    },
    {
      path: '/login',
      component: Login
    }
  ]
})

export default router