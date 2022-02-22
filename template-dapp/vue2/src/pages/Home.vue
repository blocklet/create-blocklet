<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png" />
    <div>
      <router-link to="/about">About page</router-link>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <div :style="{ display: 'flex', justifyContent: 'center' }">
      <pre :style="{ textAlign: 'left' }">
<code>{{ JSON.stringify(window.blocklet, null, 2) }}</code>
    </pre>
    </div>
  </div>
</template>

<script>
import HelloWorld from '../components/HelloWorld.vue';
import api from '../libs/api';

export default {
  components: {
    HelloWorld,
  },
};
</script>

<style></style>
