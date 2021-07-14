<template>
  <div id="app">
    <el-container>
      <el-aside></el-aside>
      <el-main>
        <Monaco></Monaco>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Monaco from "@/components/Monaco";


export default {
  name: 'App',
  components: {Monaco},
  data() {
    return {
      code: '',
    }
  }
}
</script>

<style>

#app,
.editor {
  height: 100%;
  margin: 0;
  padding: 0;
}

</style>
