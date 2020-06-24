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

<style></style>
