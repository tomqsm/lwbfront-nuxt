<template>
  <div>
    <div class="googlemap"></div>
    <template v-if="mapScriptLoaded && mapInitialized">
      <slot :google="google" :map="map" />
    </template>
  </div>
</template>

<script>
// import LwbMap from '@/components/LwbMap'

export default {
  props: {
    center: Object,
    mapConfig: Object
  },
  data() {
    return {
      mapScriptLoaded: false,
      mapInitialized: false,
      map: null
    }
  },
  computed: {
    google() {
      // eslint-disable-next-line no-undef
      return google
    }
  },
  mounted() {
    this.loadGoogleMapsScriptOnce()
  },
  methods: {
    loadGoogleMapsScriptOnce() {
      if (typeof google === 'undefined') {
        const script = document.createElement('script')
        script.onload = this.loadGoogleMapsScriptOnceCallback
        script.type = 'text/javascript'
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.apiKey}&libraries=places&language=pl&region=pl`
        document.head.appendChild(script)
      } else {
        this.loadGoogleMapsScriptOnceCallback()
      }
    },
    loadGoogleMapsScriptOnceCallback(event = null) {
      this.mapScriptLoaded = true
      if (event) {
        console.log('Script loaded')
      } else {
        console.log('Script already existed')
      }
      // eslint-disable-next-line no-undef
      this.googleapi = google
      this.initializeMap()
    },
    initializeMap() {
      // this.map gets nulled and each time needs to be created
      console.log('initialized maps')
      // eslint-disable-next-line no-unused-vars
      const mapContainer = this.$refs.googleMap
      this.map = new this.google.maps.Map(
        this.$el.getElementsByClassName('googlemap')[0],
        this.mapConfig
      )
      this.map.setCenter({ lat: 52.811148538597904, lng: 21.711489989869552 })
      this.mapInitialized = true
    }
  }
}
</script>
<style scoped>
div.googlemap {
  height: 300px; /* The height is 400 pixels */
  width: 100%; /* The width is the width of the web page */
}
</style>
