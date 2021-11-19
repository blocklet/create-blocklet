<script setup>
import { ref } from 'vue';
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue';
import api from './libs/api';

const envData = ref({});

(async () => {
  const { data } = await api.get('/api/env');
  envData.value = data;
})();
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + Vite" />
  <div :style="{ display: 'flex', justifyContent: 'center' }">
    <pre :style="{ textAlign: 'left' }">
<code>{{ JSON.stringify(envData, null, 2) }}</code>
    </pre>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
