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

// const Monaco = import("@/components/Monaco")


export default {
  name: "CodeEditor",
  components: {Monaco},
}
</script>

<style scoped>
.el-main {
  height: 100%;
  padding: 0;
}

</style>