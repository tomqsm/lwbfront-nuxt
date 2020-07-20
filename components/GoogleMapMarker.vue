<template>
  <div>
    <!-- <template> -->
    <!-- <slot :google="google" :map="map" :markero="markero" :loaded="loaded" /> -->
    <!-- </template> -->
  </div>
</template>
<script>
export default {
  props: {
    google: {
      type: Object,
      required: true
    },
    map: {
      type: Object,
      required: true
    },
    marker: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      markero: {},
      loaded: false
    }
  },
  mounted() {
    // eslint-disable-next-line no-new
    const mar = new this.google.maps.Marker({
      position: this.marker.position,
      map: this.map,
      title: this.marker.title
    })
    const infoWindow = new this.google.maps.InfoWindow({
      content: this.marker.infoWindow.content
    })
    mar.addListener('click', function() {
      infoWindow.open(this.map, mar)
    })
  }
}
</script>

<style scoped></style>
