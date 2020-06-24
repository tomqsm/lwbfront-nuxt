<template>
  <div class="container">
    <h1>{{ $t('login.title') }}</h1>
    <LoginForm />
  </div>
</template>

<script>
export default {
  head() {
    return { title: 'letsweb.biz - ' + this.$t('login.title') }
  }
}
</script>

<style></style>
