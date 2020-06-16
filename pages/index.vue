<template>
  <div class="container">
    <logo />
    <nuxt-link to="/about">About</nuxt-link>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  }
}
</script>

<style></style>
