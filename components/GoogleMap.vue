<template>
  <div>
    <LwbMap
      v-if="mapScriptLoaded"
      :center="center"
      :markers="markers"
      :googleapi="googleapi"
    />
  </div>
</template>

<script>
import LwbMap from '@/components/LwbMap'

export default {
  components: { LwbMap },
  props: {
    center: Object,
    markers: Array
  },
  data() {
    return {
      items: [],
      mapScriptLoaded: false,
      // eslint-disable-next-line no-undef
      googleapiHolder: undefined
    }
  },
  computed: {
    googleapi() {
      // eslint-disable-next-line no-undef
      return this.googleapiHolder
    }
  },
  watch: {},
  mounted() {
    if (typeof google === 'undefined') {
      const script = document.createElement('script')
      script.onload = this.onScriptLoaded
      script.type = 'text/javascript'
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.apiKey}&libraries=places&language=pl&region=pl`
      document.head.appendChild(script)
    } else {
      this.onScriptLoaded()
    }
  },
  methods: {
    onScriptLoaded(event = null) {
      this.mapScriptLoaded = true
      // eslint-disable-next-line no-undef
      this.googleapiHolder = google
      if (event) {
        console.log('Was added')
        // eslint-disable-next-line no-undef
        // this.googleapi = google
      } else {
        console.log('Already existed')
      }
    }
  }
}
</script>
