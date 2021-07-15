<template>
  <transition name="el-fade-in-linear">
    <div v-show="asideShow">
      <el-button
          icon="el-icon-arrow-right"
          circle
          @click="asideChange"
      ></el-button>
      <div class="aside-content"></div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "EditorAside",
  data() {
    return {}
  },
  methods: {
    asideChange() {
      this.$store.commit('RECEIVE_ASIDE', !this.asideShow)
    }
  },
  computed: {
    asideShow() {
      return this.$store.state.asideShow
    }
  }
}
</script>

<style scoped>
.aside-content {
  width: 300px;
}
</style>