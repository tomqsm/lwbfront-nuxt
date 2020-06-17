<template>
  <b-tabs content-class="mt-3" fill card>
    <b-tab title="Systemy webowe" active>
      <b-card
        title="$t('carousel.slide1.caption')"
        img-src="https://picsum.photos/600/300/?image=20"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2"
      >
        <b-card-text>Systemy webowe</b-card-text>
      </b-card></b-tab
    >
    <b-tab title="Systemy back-end'owe"
      ><b-card
        :title="$t('carousel.slide2.caption')"
        img-src="https://picsum.photos/600/300/?image=9"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2"
      >
        <b-card-text>{{ this.$t('carousel.slide2.text1') }}</b-card-text>
      </b-card></b-tab
    >
  </b-tabs>
</template>

<script>
export default {}
</script>

<style></style>
