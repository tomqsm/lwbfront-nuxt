<template>
  <div>
    <h1>user id: {{ $route.params.id }}</h1>
  </div>
</template>

<script>
export default {
  validate(data) {
    // eslint-disable-next-line eqeqeq
    return /^\d+$/.test(data.params.id)
  }
}
</script>

<style></style>
