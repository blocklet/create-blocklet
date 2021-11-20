<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png" />
    <div>
      <router-link to="/about">About page</router-link>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from '../components/HelloWorld.vue';
export default {
  components: {
    HelloWorld,
  },
};
</script>

<style></style>
