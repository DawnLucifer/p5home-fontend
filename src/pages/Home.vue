<template>
  <el-scrollbar>
    <div class="home-container" style="position: relative;height: 1000px;">
      <div style="z-index: -1;position: absolute;width: 100%">
        <Render type="home"></Render>
      </div>
      <div class="title-container">
        <div class="text-left">enjoy</div>
        <div class="text-right">coding</div>
        <div class="start">
          <el-button
              type="danger"
              plain
              @click="gotoSketch"
          >Get Start !</el-button>
        </div>

      </div>
    </div>
  </el-scrollbar>
</template>

<script>
import Render from "@/pages/Render";

export default {
  name: "Home",
  components: {Render},
  mounted() {
    this.$store.commit('RECEIVE_HOME', true)
    // console.log('enter')
  },
  beforeDestroy() {
    this.$store.commit('RECEIVE_HOME', false)
    // console.log('leave')
  },
  methods: {
    gotoSketch() {
      this.$router.push('/sketch')
    }
  }


}
</script>

<style scoped>
.home-container {
  width: 100%;
}

.title-container {
  position: absolute;
  left: 5%;
  top: 15%;
  /*opacity: 0.7;*/
  background-color: rgba(255,255,255,0.6);
  height: 40%;
  width: 30%;
  border-style: solid;
  border-color: #ececec;
  border-width: 30px;
  user-select: none;
  font-family: "Sitka Banner", serif
}

.title-container .text-left {
  margin-top: 6%;
  margin-left: 20%;
  font-size: 5rem;
}

.title-container .text-right {
  font-size: 6.5rem;
  margin-left: 35%;

}

.title-container .start {
  margin-top: 8%;
  text-align: center;
}
</style>