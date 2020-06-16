<template>
  <div>
    <header class="Header">
      <div class="container">
        <h1 class="Header__Title">
          Nuxt i18n
        </h1>
        <nav class="Header__Menu">
          <NuxtLink :to="$i18n.path('')" class="Header__Link" exact>
            {{ $t('links.home') }}
          </NuxtLink>
          <NuxtLink :to="$i18n.path('about')" class="Header__Link" exact>
            {{ $t('links.about') }}
          </NuxtLink>
          <NuxtLink
            v-if="$i18n.locale === 'en'"
            :to="`/pl` + $route.fullPath"
            class="Header__Link"
            active-class="none"
            exact
          >
            {{ $t('links.polish') }}
          </NuxtLink>
          <NuxtLink
            v-else
            :to="$route.fullPath.replace(/^\/[^\/]+/, '')"
            class="Header__Link"
            active-class="none"
            exact
          >
            {{ $t('links.english') }}
          </NuxtLink>
        </nav>
      </div>
    </header>
    <nuxt />
  </div>
</template>

<script>
export default {
  components: {}
}
</script>

<style>
body {
  font-family: 'Roboto Mono', monospace !important;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
</style>
