<template>
  <div class="container">
    <b-row>
      <h1>{{ $t('about.title') }}</h1>
    </b-row>
    <b-row>
      <b-col>
        <p>
          <span v-html="$t('about.intro')"></span>
        </p>
        <p v-html="$t('about.nip')"></p>
      </b-col>
      <b-col>
        <a
          class="LI-simple-link"
          href="https://pl.linkedin.com/in/tomasz-kusmierczyk-letsweb-biz?trk=profile-badge"
          target="blank"
        >
          <img :src="badgeImage" :alt="$t('about.badgeImageLabel')" />
        </a>
      </b-col>
    </b-row>
    <keep-alive>
      <BlogArticle />
    </keep-alive>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pagelocale: this.$i18n.locale
    }
  },
  computed: {
    badgeImage() {
      return this.pagelocale === 'pl'
        ? '/img/linkedin-badge_pl-min.PNG'
        : '/img/linkedin-badge_en-min.PNG'
    }
  },
  head() {
    return { title: 'letsweb.biz - ' + this.$t('about.title') }
  }
}
</script>
