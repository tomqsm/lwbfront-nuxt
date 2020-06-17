<template>
  <div class="container">
    <h1 class="Content__Title">
      {{ $t('home.title') }}
    </h1>
    <p>{{ $t('home.introduction') }}</p>
  </div>
</template>

<script>
export default {
  head() {
    return { title: this.$t('home.title') }
  }
}
</script>
