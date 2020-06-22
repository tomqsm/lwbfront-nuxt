<template>
  <div class="container">
    <h1 class="Content__Title">
      {{ $t('home.title') }}
    </h1>
    <p>{{ $t('home.introduction') }}</p>
    <HomeTabs />
  </div>
</template>

<script>
import axios from 'axios'
export default {
  mounted() {
    console.log('mounted')
    axios
      .post('https://lwb-system.ew.r.appspot.com/api/track', { data: 'umba' })
      .then((res) => {
        console.log(res)
      })
      .catch((error) => console.log(error))
  },
  head() {
    return { title: 'letsweb.biz - ' + this.$t('home.title') }
  }
}
</script>
