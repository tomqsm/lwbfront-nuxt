<template>
  <div class="container">
    <h1 class="Content__Title">
      {{ $t('home.title') }}
    </h1>
    <p>{{ $t('home.introduction') }}</p>
    <HomeCards />
  </div>
</template>

<script>
export default {
  head() {
    return { title: 'letsweb.biz - ' + this.$t('home.title') }
  }
}
</script>
