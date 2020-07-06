<template>
  <b-container>
    <b-row>
      <p>Blog</p>
      <ul>
        <li v-for="a in articles" :key="a.id">{{ a }}</li>
      </ul>
    </b-row>
  </b-container>
</template>

<script>
export default {
  fetchOnServer: false,
  data() {
    return {
      articles: []
    }
  },
  activated() {
    // Call fetch again if last fetch more than a minute ago
    // For this to work this components must be wrapped by <keep-alive> where it is used
    if (this.$fetchState.timestamp <= Date.now() - 500) {
      console.log('OK fetch')
      this.$fetch() // this is when you click a button on somethin, as a lifecycle hook it ronns anyway
    }
  },
  fetch() {
    // this.$axios
    //   .$get('url')
    //   .then((res) => {
    //     console.log(res)
    //   })
    //   .catch((error) => {
    //     console.error(error)
    //   })
    console.log('will get a blog post')
    const ref = this.$fireStore.collection('users')

    ref
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.articles.push(doc.id)
        })
      })
      .catch((e) => {
        console.error(e)
      })
  }
}
</script>

<style></style>
