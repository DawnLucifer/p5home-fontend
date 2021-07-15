<template>
  <el-scrollbar>
    <div class="home-container" style="position: relative;height: 1000px;">
      <div style="z-index: -1;position: absolute;width: 100%">
        <Render type="home"></Render>
      </div>
      <el-button type="primary">buttonCont</el-button>
    </div>
  </el-scrollbar>
</template>

<script>
import Render from "@/pages/Render";

export default {
  name: "Home",
  components: {Render},
}
</script>

<style scoped>
.home-container {
  width: 100%;
}
</style>