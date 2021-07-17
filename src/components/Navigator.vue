<template>
  <div v-show="navShow" :class="isHome?'nav-container-home':'nav-container'">
    <el-menu
        :default-active="$route.path"
        mode="horizontal"
        :background-color="isHome?'transparent':'#4B4B4B'"
        :text-color="isHome?'#171717':'#ffffff'"
        :active-text-color="isHome?'#000000':'#d7e71c'"
        @select="handleSelect">
      <el-menu-item
          index="/home"
          @click="gotoHome"
      >首页
      </el-menu-item>
      <el-menu-item
          index="/circle"
      >社区
      </el-menu-item>
      <el-menu-item
          index="/sketch"
          @click="togoSketch">草稿
      </el-menu-item>
      <div class="user-box">
        <span @click="gotoLogin">
          <span class="user-text">{{ username }}</span>
          <el-avatar icon="el-icon-user-solid"></el-avatar>
        </span>
        <el-dropdown
            @command="handleCommand">
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item disabled>个人中心</el-dropdown-item>
            <el-dropdown-item disabled>我的草稿</el-dropdown-item>
            <el-dropdown-item
                command="logout"
                divided
                v-show="username !== ''"
            >退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <!--      <el-dropdown @command="handleCommand" class="avatar-pic">-->
      <!--        <span class="el-dropdown-link">-->
      <!--          <el-avatar shape="square" :size="40"></el-avatar>-->
      <!--          <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
      <!--        </span>-->
      <!--        <el-dropdown-menu slot="dropdown">-->
      <!--          <el-dropdown-item command="logout" class="icon-tuichu iconfont-tuichu"> 退出登录</el-dropdown-item>-->
      <!--        </el-dropdown-menu>-->
      <!--      </el-dropdown>-->
    </el-menu>
  </div>
</template>

<script>
import {clearToken} from "@/utils/tokenManager";

export default {
  name: "Navigator",
  methods: {
    handleSelect() {

    },
    togoSketch() {
      this.$router.push('/sketch')
    },
    gotoHome() {
      this.$router.push('/home')
    },
    gotoLogin() {
      // console.log('click login')
      if (this.username !== '') return
      this.$router.push('/login')
    },
    handleCommand(command) {
      switch (command) {
        case 'logout':
          this.logout()
          break
      }
    },
    logout() {
      clearToken()
    }
  },
  computed: {
    navShow() {
      return this.$store.state.navShow
    },
    isHome() {
      return this.$store.state.isHome
    },
    username() {
      return this.$store.state.username
    },
  },
  mounted() {
    const expireTime = localStorage.getItem('expireTime')
    if (expireTime === null || expireTime * 1 <= Date.now()) {
      localStorage.removeItem('expireTime')
      localStorage.removeItem('username')
      return
    }
    const localUsername = localStorage.getItem('username')
    if (localUsername === null) return
    this.$store.commit('RECEIVE_USERNAME', localUsername)
  }
}
</script>

<style scoped>

.el-menu.el-menu--horizontal {
  padding-left: 40px;
  border: 0;
}

.el-menu-item {
  padding: 0 40px;
  font-size: 16px;
}

.nav-container-home {
  background-color: #ffffff;
  opacity: 0.7;
  position: absolute;
  z-index: 1;
  width: 100%;
  font-weight: bold;
}

.nav-container {
  position: relative;
}

.user-box {
  float: right;
  margin-right: 5%;
  margin-top: 10px;
  height: 40px;
  cursor: pointer;
}

.user-box .user-text {
  display: inline-block;
  margin-right: 10px;
  line-height: 40px;
  vertical-align: top;
}

.nav-container .user-box .user-text {
  color: white;
}

.nav-container-home .user-box .user-text {
  color: black;
}

</style>