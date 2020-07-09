<template>
  <b-container>
    <b-card-group deck>
      <b-card
        :title="$t('home.tab1')"
        img-src="https://picsum.photos/600/300/?image=20"
        img-alt="Image"
        img-top
        style="max-width: 20rem;"
        class="p-2 m-2"
      >
        <b-card-text>{{ $t('home.tab1-text') }}</b-card-text>
      </b-card>

      <b-card
        :title="$t('home.tab2')"
        img-src="https://picsum.photos/600/300/?image=9"
        img-alt="Image"
        img-top
        style="max-width: 20rem;"
        class="p-2 m-2"
      >
        <b-card-text>{{ $t('home.tab2-text') }}</b-card-text>
      </b-card>
    </b-card-group>
  </b-container>
</template>

<script>
export default {
  fetch() {},
  head() {
    return { title: 'letsweb.biz - ' + this.$t('home.title') }
  }
}
</script>
