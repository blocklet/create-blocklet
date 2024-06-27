<script setup>
import HelloWorld from './components/HelloWorld.vue';
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="./assets/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
    <a href="https://www.arcblock.io" target="_blank">
      <img src="./assets/blocklet.svg" class="logo blocklet" alt="Blocklet logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue + Blocklet" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.logo.blocklet:hover {
  filter: drop-shadow(0 0 2em #22cdcdaa);
}
</style>
