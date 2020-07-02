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
      <slot name="footer"
        >&copy; letsweb.biz | {{ lwbDateGenetivus(new Date(), this) }}
      </slot>
    </footer>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
