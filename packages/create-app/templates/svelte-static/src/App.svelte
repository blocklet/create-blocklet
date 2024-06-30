<script>
  import svelteLogo from './assets/svelte.svg';
  import viteLogo from './assets/vite.svg';
  import blockletLogo from './assets/blocklet.svg';
  import Counter from './components/Counter.svelte';
</script>

<main>
  <div>
    <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
      <img src={viteLogo} class="logo" alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={blockletLogo} class="logo blocklet" alt="Blocklet Logo" />
    </a>
  </div>
  <h1>Vite + Svelte + Blocklet</h1>

  <div class="card">
    <Counter />
  </div>

  <p>
    Check out <a href="https://github.com/sveltejs/kit#readme" target="_blank" rel="noreferrer">SvelteKit</a>, the
    official Svelte app framework powered by Vite!
  </p>

  <p class="read-the-docs">Click on the Vite and Svelte logos to learn more</p>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }

  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }

  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }

  .logo.blocklet:hover {
    filter: drop-shadow(0 0 2em #22cdcdaa);
  }

  .read-the-docs {
    color: #888;
  }
</style>
