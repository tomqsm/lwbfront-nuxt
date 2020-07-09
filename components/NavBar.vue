<template>
  <b-navbar shadow-sm toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand :to="$i18n.path('')" type="light" tag="p">
      <img
        src="/img/logo.svg"
        style="width: 30px; margin-right: 5px;"
        alt="logo letsweb.biz"
      />
      <span>letsweb.biz</span>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="text-white">
        <NuxtLink :to="$i18n.path('')" tag="b-nav-item" exact>
          {{ $t('links.home') }}
        </NuxtLink>
        <NuxtLink :to="$i18n.path('about')" tag="b-nav-item" exact>
          {{ $t('links.about') }}
        </NuxtLink>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <template v-if="!isAuthenticated">
          <NuxtLink
            v-if="!isAuthenticated"
            :to="$i18n.path('login')"
            tag="b-nav-item"
            exact
            >{{ $t('links.login') }}</NuxtLink
          >
        </template>
        <template v-else>
          <NuxtLink :to="$i18n.path('admin')" tag="b-nav-item" exact>{{
            $t('links.admin')
          }}</NuxtLink>
          <b-nav-item id="logout" @click="logout()">Logout</b-nav-item>
          <b-spinner
            v-show="showLogoutSpinner"
            small
            light
            type="grow"
          ></b-spinner>
        </template>

        <NuxtLink
          v-if="$i18n.locale === 'pl'"
          :to="`/en` + $route.fullPath"
          active-class="none"
          exact
          tag="b-nav-item"
          ><span class="flag gb"></span
        ></NuxtLink>
        <NuxtLink
          v-else
          :to="$route.fullPath.replace(/^\/[^\/]+/, '')"
          active-class="none"
          exact
          tag="b-nav-item"
        >
          <span class="flag pl"></span>
        </NuxtLink>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  data() {
    return {
      showLogoutSpinner: false
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters['users/isAuthenticated']
    },
    authUser() {
      return this.$store.getters['users/getEmail']
    }
  },
  methods: {
    logout() {
      this.showLogoutSpinner = true
      this.$nuxt.$loading.rtl = true
      this.$nuxt.$loading.start()
      this.$store
        .dispatch('users/logout')
        .then((result) => {
          this.$fireAuthUnsubscribe()
          localStorage.clear()
          this.showLogoutSpinner = false
          this.$nuxt.$loading.finish()
          this.$router.push(this.$i18n.path(''))
        })
        .catch((error) => {
          console.error('Failed loging out', error)
        })
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
.gb {
  background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgNjAgMzAiIGhlaWdodD0iNjAwIj4NCjxkZWZzPg0KPGNsaXBQYXRoIGlkPSJ0Ij4NCjxwYXRoIGQ9Im0zMCwxNWgzMHYxNXp2MTVoLTMwemgtMzB2LTE1enYtMTVoMzB6Ii8+DQo8L2NsaXBQYXRoPg0KPC9kZWZzPg0KPHBhdGggZmlsbD0iIzAwMjQ3ZCIgZD0ibTAsMHYzMGg2MHYtMzB6Ii8+DQo8cGF0aCBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iNiIgZD0ibTAsMGw2MCwzMG0wLTMwbC02MCwzMCIvPg0KPHBhdGggc3Ryb2tlPSIjY2YxNDJiIiBzdHJva2Utd2lkdGg9IjQiIGQ9Im0wLDBsNjAsMzBtMC0zMGwtNjAsMzAiIGNsaXAtcGF0aD0idXJsKCN0KSIvPg0KPHBhdGggc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEwIiBkPSJtMzAsMHYzMG0tMzAtMTVoNjAiLz4NCjxwYXRoIHN0cm9rZT0iI2NmMTQyYiIgc3Ryb2tlLXdpZHRoPSI2IiBkPSJtMzAsMHYzMG0tMzAtMTVoNjAiLz4NCjwvc3ZnPg0K');
  width: 200%;
  height: 100%;
  background-size: 100% 100%;
}
.pl {
  background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjgwIDgwMCI+DQo8cGF0aCBmaWxsPSIjZTllOGU3IiBkPSJtMCwwaDEyODB2NDAwaC0xMjgweiIvPg0KPHBhdGggZmlsbD0iI2Q0MjEzZCIgZD0ibTAsNDAwaDEyODB2NDAwaC0xMjgweiIvPg0KPC9zdmc+DQo=');
  width: 160%;
  height: 100%;
  background-size: 100% 100%;
}
span.flag {
  display: inline-block; /* the default for span */
  width: 32px;
  height: 20px;
}
</style>
