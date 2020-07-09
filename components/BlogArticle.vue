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
  fetch() {
    this.$fireStore
      .collection('users')
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.articles.push({ id: doc.id, ...doc.data() })
        })
      })
      .catch((e) => {
        console.error(e)
      })
  },
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
  }
}
</script>

<style></style>
