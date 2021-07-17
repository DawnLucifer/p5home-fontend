<template>
  <div>
    <div style="z-index: -1;position: absolute;width: 100%">
      <Render type="home"></Render>
    </div>
    <div class="login" id="login">
      <a href="javascript:" class="log-close"><i class="icons close"></i></a>
      <div class="log-bg">
        <div class="log-logo">Welcome!</div>
      </div>
      <div class="log-email">
        <input type="text"
               placeholder="用户名"
               :class="'log-input' + (username===''?' log-input-empty':'')"
               v-model="username">
        <input type="password"
               placeholder="密码"
               :class="'log-input' + (password===''?' log-input-empty':'')"
               v-model="password">
        <a href="javascript:" class="log-btn" @click="login">登录</a>
      </div>
    </div>
  </div>

</template>

<script>

import Render from "@/pages/Render";
import {reqLogin} from "@/api/login";
import vm from "@/main";
import {addToken} from "@/utils/tokenManager";

export default {
  name: 'Login',
  components: {Render},
  data() {
    return {
      username: '',
      password: ''
    }
  },

  mounted() {
    this.$store.commit('RECEIVE_HOME', true)
    // console.log('enter')
  },
  beforeDestroy() {
    this.$store.commit('RECEIVE_HOME', false)
    // console.log('leave')
  },

  // eslint-disable-next-line no-unused-vars
  beforeRouteEnter(to, from, next) {
    // console.log('enter login')
    if (vm.$store.state.username !== '') {
      vm.$message('您已经登陆了');
      next(false)
    }
    next()
  },
  methods: {
    //登录逻辑
    login() {
      if (this.username !== '' && this.password !== '') {
        this.toLogin();
      }
    },
    //登录请求
    toLogin() {
      //请求后端,比如:

      reqLogin(this.username, this.password).then(resp => {
        // noinspection JSUnresolvedVariable
        if (resp.code === 200) {
          const username = resp.data.user.username
          addToken(username)
          this.$router.push('/')
        }
      })
    }
  }
}
</script>

<style scoped>
.login {
  position: fixed;
  overflow: hidden;
  left: 50%;
  margin-left: -250px;
  top: 50%;
  margin-top: -250px;
  width: 500px;
  height: 400px;
  z-index: 10;
  right: 140px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 3px 16px -5px #070707
}

.log-close {
  display: block;
  position: absolute;
  top: 12px;
  right: 12px;
  opacity: 1;
}

.log-close:hover .icons {
  transform: rotate(180deg);
}

.log-close .icons {
  opacity: 1;
  transition: all .3s
}

.log-bg {
  width: 100%;
  height: 150px;
  overflow: hidden;
}

.log-logo {
  height: 80px;
  margin: 50px auto 25px;
  text-align: center;
  color: rgba(80, 59, 109, 0.76);
  font-size: 40px;
}

.log-text {
  color: #57d4c3;
  font-size: 13px;
  text-align: center;
  margin: 0 auto;
}

.log-logo, .log-text {
  z-index: 2
}

.icons {
  display: inline-block;
}

.close {
  height: 16px;
  width: 16px;
  background-position: -13px 0;
}

.login-email {
  height: 17px;
  width: 29px;
  background-position: -117px 0;
}

.log-btns {
  padding: 15px 0;
  margin: 0 auto;
}

.log-btn {
  width: 402px;
  display: block;
  text-align: left;
  line-height: 50px;
  margin: 0 auto 15px;
  height: 50px;
  color: #fff;
  font-size: 13px;
  position: relative;
}

.log-btn:hover, .log-btn:focus {
  color: #fff;
  opacity: .8;
}

.log-email {
  text-align: center;
  margin-top: 20px;
}

.log-email .log-btn {
  background-color: rgba(118, 89, 161, 0.76);
  text-align: center;
  font-size: larger;
  text-decoration: none;
  letter-spacing: 15px;
}

.log-input-empty {
  border: 1px solid #f37474 !important;
}

.log-btn .icons {
  margin-left: 30px;
  vertical-align: middle;
}

.log-btn .text {
  left: 95px;
  line-height: 50px;
  text-align: left;
  position: absolute;
}

.log-input {
  width: 370px;
  overflow: hidden;
  padding: 0 15px;
  font-size: 13px;
  border: 1px solid #EBEBEB;
  margin: 0 auto 15px;
  height: 48px;
  line-height: 48px;
  border-radius: 5px;
}

.log-input.warn {
  border: 1px solid #f88787
}
</style>