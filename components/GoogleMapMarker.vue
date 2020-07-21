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
    markerConfig: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loaded: false
    }
  },
  mounted() {
    // eslint-disable-next-line no-new
    const mar = new this.google.maps.Marker({
      position: this.markerConfig.position,
      map: this.map,
      title: this.markerConfig.title
    })
    const infoWindow = new this.google.maps.InfoWindow({
      content: this.markerConfig.infoWindow.content
    })
    mar.addListener('click', function() {
      infoWindow.open(this.map, mar)
    })
  }
}
</script>

<style scoped></style>
