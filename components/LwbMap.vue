<template>
  <div>
    <p>Map couldn't be displayed.</p>
  </div>
</template>

<script>
export default {
  props: {
    center: Object,
    markers: Array
  },
  data: () => ({
    items: []
  }),
  computed: {},
  mounted() {
    const m = this.lwbMap()
    this.addMarkers(m)
  },
  methods: {
    lwbMap() {
      // eslint-disable-next-line no-undef
      const map = new google.maps.Map(this.$el, {
        zoom: 7,
        disableDoubleClickZoom: true,
        streetViewControl: false
      })
      map.setCenter(this.center)

      map.addListener('click', function(e) {
        console.log(`${e.latLng.lat()}:${e.latLng.lng()}`)
      })
      return map
    },
    addMarkers(map) {
      console.log('adds markers')
      const mks = []
      if (this.markers && this.markers.length > 0) {
        this.markers.forEach((element) => {
          // eslint-disable-next-line no-undef
          const m = new google.maps.Marker({ position: element, map })
          mks.push(m)
        })
      } else if (this.markers && this.markers.length === 0) {
        // eslint-disable-next-line no-undef
        const m = new google.maps.Marker({ position: this.center, map })
        mks.push(m)
      }
      return mks
    }
  }
}
</script>

<style scoped>
div {
  height: 300px; /* The height is 400 pixels */
  width: 100%; /* The width is the width of the web page */
}
</style>
