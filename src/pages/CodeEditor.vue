<template>
  <el-container>
    <el-aside width="initial">
    </el-aside>
    <el-main style="overflow-y: hidden">
      <Monaco></Monaco>
    </el-main>
  </el-container>
</template>

<script>
import Monaco from "@/components/Monaco";

export default {
  name: "CodeEditor",
  components: {Monaco},
  data() {
    return {
      asideHidden: false
    }
  },
}
</script>

<style scoped>
.el-main {
  height: 100%;
  padding: 0;
}

</style>