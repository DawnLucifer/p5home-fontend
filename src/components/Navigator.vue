<template>
  <div v-show="navShow" :class="isHome?'nav-container-home':'nav-container'">
    <el-menu
        :default-active="$route.path"
        mode="horizontal"
        :background-color="isHome?'transparent':'#4B4B4B'"
        :text-color="isHome?'#171717':'#ffffff'"
        :active-text-color="isHome?'#000000':'#ffd04b'"
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
        <span class="user-text">Admin</span>
        <el-avatar icon="el-icon-user-solid"></el-avatar>
      </div>
    </el-menu>
  </div>
</template>

<script>
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
    }
  },
  computed: {
    navShow() {
      return this.$store.state.navShow
    },
    isHome() {
      return this.$store.state.isHome
    }
  },
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