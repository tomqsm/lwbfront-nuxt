<template>
  <div class="geolocation">
    <LwbMap v-if="mapScriptLoaded" :center="center" :markers="markers" />
  </div>
</template>

<script>
import LwbMap from '@/components/LwbMap'
export default {
  props: {
    center: Object,
    markers: Array
  },
  components: { LwbMap },
  data: () => ({
    items: [],
    mapScriptLoaded: false
  }),
  watch: {},
  mounted() {
    if (typeof google === 'undefined') {
      const script = document.createElement('script')
      script.onload = this.onScriptLoaded
      script.type = 'text/javascript'
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.apiKey}&libraries=places`
      document.head.appendChild(script)
    } else {
      this.onScriptLoaded()
    }
  },
  methods: {
    onScriptLoaded(event = null) {
      this.mapScriptLoaded = true
      if (event) {
        console.log('Was added')
      } else {
        console.log('Already existed')
      }
    },
    geolocate() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    }
  }
}
</script>
