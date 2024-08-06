<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">
      count is {{ count }}
    </button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code>
      to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">
      create-vue
    </a>
    , the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
    >
      Vue Docs Scaling up Guide.
    </a>
  </p>
  <br>
  <p>
    Check out
    <a href="https://www.createblocklet.dev/" target="_blank">
      create-blocklet
    </a>
    , the official Blocklet app starter
  </p>
  <p>
    Learn more about Developer Support for Blocklet in the
    <a
      href="https://www.arcblock.io/docs/blocklet-developer/getting-started"
      target="_blank"
    >
      Blocklet Developer Docs.
    </a>
  </p>
  <p class="read-the-docs">
    Click on the Vite, Vue and Blocklet logos to learn more
  </p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
