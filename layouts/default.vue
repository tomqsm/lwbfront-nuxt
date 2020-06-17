<template>
  <div>
    <nav>
      <NavBar />
    </nav>
    <main class="b-container mt-3">
      <nuxt />
    </main>
    <footer class="container LayoutDefaultFooter">
      <br />
      <hr />
      <slot name="footer">&copy; letsweb.biz {{ currentYear }}</slot>
    </footer>
  </div>
</template>

<script>
export default {
  computed: {
    currentYear: () => {
      return new Date().getFullYear()
    }
  }
}
</script>

<style>
body {
  font-family: 'Roboto Mono', monospace !important;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  /* margin-top: 4px; */
}
</style>
