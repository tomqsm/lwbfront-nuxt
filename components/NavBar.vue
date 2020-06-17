<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand :to="$i18n.path('')" type="light" tag="p">
      <img
        src="/img/logo.svg"
        style="width: 30px; margin-right: 5px;"
        alt="logo"
      /><span>letsweb.biz</span>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="text-white">
        <NuxtLink :to="$i18n.path('')" tag="b-nav-item" exact>{{
          $t('links.home')
        }}</NuxtLink>
        <NuxtLink :to="$i18n.path('about')" tag="b-nav-item" exact>{{
          $t('links.about')
        }}</NuxtLink>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown :text="$t('links.langlabel')" right>
          <NuxtLink
            v-if="$i18n.locale === 'pl'"
            :to="`/en` + $route.fullPath"
            active-class="none"
            exact
            tag="b-dropdown-item"
            >{{ $t('links.english') }}</NuxtLink
          >
          <NuxtLink
            v-else
            :to="$route.fullPath.replace(/^\/[^\/]+/, '')"
            active-class="none"
            exact
            tag="b-dropdown-item"
            >{{ $t('links.polish') }}</NuxtLink
          >
        </b-nav-item-dropdown>
        <NuxtLink :to="$i18n.path('login')" tag="b-nav-item" exact>
          {{ $t('links.login') }}
        </NuxtLink>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    },
    authUser() {
      return this.$store.getters.authUser
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style scoped>
.nav-item {
  font-size: 1.2em;
}
.nav-item.nuxt-link-exact-active {
  font-size: 1.2em;
  text-decoration: underline;
}
</style>
