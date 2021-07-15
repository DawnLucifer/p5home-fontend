<template>
  <div v-show="navShow">
    <el-menu
        :default-active="$route.path"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
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

</style>