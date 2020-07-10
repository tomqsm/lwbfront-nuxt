<template>
  <div class="geolocation">
    <div id="map1"></div>
  </div>
</template>

<script>
export default {
  methods: {
    initMap() {
      console.log('map inited')
    }
  },
  fetch() {
    const url = `https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.apiKey}`
    console.log(url)
    this.initMap()
  },
  data() {
    return {
      data1: null
    }
  }
}
</script>

<style></style>
