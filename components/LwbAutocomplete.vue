<template>
  <div>
    <div id="acmap"><p>umba</p></div>
    <input type="text" />
  </div>
</template>

<script>
export default {
  props: {
    lwbmap: Object
  },
  mounted() {
    const ac = this.createAutocomplete()
    // eslint-disable-next-line no-undef
    // const marker = new google.maps.Marker({
    //   map: this.lwbmap
    // })
    // eslint-disable-next-line no-undef
    google.maps.event.addListener(ac, 'place_changed', function() {
      // eslint-disable-next-line no-unused-vars
      const place = ac.getPlace()
      console.log(place)
      // if (place.geometry.viewport) {
      //   console.log('viewport')
      //   this.lwbmap.fitBounds(place.geometry.viewport)
      // } else {
      this.lwbmap.setCenter(place.geometry.location)
      // marker.setPosition(place.geometry.location)
      // }
    })
  },
  methods: {
    createAutocomplete() {
      const input = this.$el.getElementsByTagName('input')[0]
      // eslint-disable-next-line no-undef
      const autoc = new google.maps.places.Autocomplete(input)
      autoc.bindTo('bounds', this.lwbmap)
      return autoc
    }
  }
}
</script>

<style></style>
