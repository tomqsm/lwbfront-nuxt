<template>
  <b-container>
    <b-card
      v-for="a in articles"
      :key="a.id"
      :title="a.title"
      :img-src="a.imgref"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="mb-2 float-left"
    >
      <b-card-text>{{ a.text }}</b-card-text>
    </b-card>
    <div class="clearfix"></div>
  </b-container>
</template>

<script>
export default {
  fetch() {
    this.$fireStore
      .collection('article')
      // .where('title', '==', 'Frontend')
      .get()
      .then((article) => {
        article.forEach((doc) => {
          this.articles.push({ id: doc.id, ...doc.data() })
        })
      })
      .catch((error) => {
        console.log(error)
      })
  },
  data() {
    return {
      articles: []
    }
  },
  head() {
    return { title: 'letsweb.biz - ' + this.$t('home.title') }
  }
}
</script>
