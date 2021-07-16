<template>
  <div id="app">
    <!--    <router-link to="/sketch">to sketch</router-link>-->
    <!--    <router-link to="/render">to render</router-link>-->
    <Navigator></Navigator>
    <router-view></router-view>
  </div>
</template>

<script>


import Navigator from "@/components/Navigator";

export default {
  name: 'App',
  components: {Navigator},
  data() {
    return {}
  },
}
</script>

<style>

</style>
