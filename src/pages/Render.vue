<template>
  <div class="render">
    <iframe name="p5" ref="p5iframe"></iframe>
    <form
        target="p5"
        style="display: none"
        method="post"
        ref="p5form"
        action="http://localhost:8000/codegen"
    >
      <textarea
          v-model="this.$store.state.codes"
          name="codes"
      ></textarea>
    </form>
  </div>
</template>

<script>
export default {
  name: "Render",
  mounted() {
    this.$refs.p5form.submit()
  }
}
</script>

<style scoped>
iframe {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
  border: 0;
}

.render {
  overflow-x: hidden;
  overflow-y: hidden;
  height: 900px;
}
</style>