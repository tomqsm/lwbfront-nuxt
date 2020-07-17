<template>
  <div>
    <div class="lwbmap"></div>
    <input type="text" />
  </div>
</template>

<script>
import LwbAutocomplete from '@/components/LwbAutocomplete'
export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { LwbAutocomplete },
  props: {
    googleapi: Object,
    center: Object,
    markers: Array
  },
  data: () => ({}),
  computed: {},
  mounted() {
    const map = this.lwbMap()
    const markers = this.addMarkers(map)
    const marker1 = markers[0]
    const infoBox = this.createInfoBox('to to wstawiłem', marker1)
    const ac = this.createAutocomplete(map)
    marker1.addListener('click', function(e) {
      console.log(e)
      infoBox.open(map, marker1)
    })
    map.addListener('click', function(e) {
      console.log(`${e.latLng.lat()}:${e.latLng.lng()}`)
      infoBox.open(map, marker1)
    })
    // eslint-disable-next-line no-undef
    this.googleapi.maps.event.addListener(ac, 'place_changed', function() {
      // eslint-disable-next-line no-unused-vars
      const place = ac.getPlace()
      console.log(place)
      if (place.geometry.viewport) {
        console.log('viewport')
        map.fitBounds(place.geometry.viewport)
      } else {
        map.setCenter(place.geometry.location)
        // eslint-disable-next-line no-undef
        // marker.setPosition(place.geometry.location)
      }
    })
  },
  methods: {
    lwbMap() {
      // eslint-disable-next-line no-undef
      const map = new this.googleapi.maps.Map(
        this.$el.getElementsByClassName('lwbmap')[0],
        {
          zoom: 7,
          // eslint-disable-next-line no-undef
          mapTypeId: this.googleapi.maps.MapTypeId.ROADMAP,
          // mapTypeId: google.maps.MapTypeId.TERRAIN,
          disableDoubleClickZoom: true,
          streetViewControl: false
        }
      )
      map.setCenter(this.center)

      return map
    },
    addMarkers(map) {
      console.log('adds markers')
      const mks = []
      if (this.markers && this.markers.length > 0) {
        this.markers.forEach((element) => {
          // eslint-disable-next-line no-undef
          const m = new this.googleapi.maps.Marker({ position: element, map })
          mks.push(m)
        })
      } else if (this.markers && this.markers.length === 0) {
        // eslint-disable-next-line no-undef
        const m = new this.googleapi.maps.Marker({ position: this.center, map })
        mks.push(m)
      }
      return mks
    },
    addMarkersToLocations(map, locations) {
      const mks = []
      locations.forEach((element) => {
        // eslint-disable-next-line no-undef
        const m = new this.googleapi.maps.Marker({ position: element, map })
        mks.push(m)
      })
      return mks
    },
    createInfoBox(text, marker) {
      // eslint-disable-next-line no-undef
      return new this.googleapi.maps.InfoWindow({ content: text })
    },
    createAutocomplete(map) {
      const input = this.$el.getElementsByTagName('input')[0]
      // eslint-disable-next-line no-undef
      const autoc = new this.googleapi.maps.places.Autocomplete(input)
      autoc.bindTo('bounds', map)
      return autoc
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
