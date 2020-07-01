<template>
  <b-toast
    id="cookieNotice"
    variant="warning"
    solid
    no-auto-hide
    toaster="b-toaster-top-center"
  >
    <template v-slot:toast-title>
      <div class="d-flex flex-grow-1 align-items-baseline">
        <b-img
          blank
          blank-color="#ff5555"
          class="mr-2"
          width="12"
          height="12"
        ></b-img>
        <strong class="mr-auto">Cookie notice</strong>
        <small class="text-muted mr-2"
          >EU General Data Protection Regulation 25th May 2018</small
        >
      </div>
    </template>
    <p>
      This site stores key value references enabling it to characterise the
      incoming traffic.
    </p>
    <b-button variant="outline-primary">Accept</b-button>
  </b-toast>
</template>

<script>
export default {
  mounted() {
    this.$bvToast.show('cookieNotice')
  }
}
</script>

<style></style>
