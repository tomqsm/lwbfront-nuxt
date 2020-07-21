<template>
  <div>
    <input ref="acinput" type="text" />
    <div ref="strict-bounds-selector" class="pac-controls">
      <input id="use-strict-bounds" v-model="isStrictBound" type="checkbox" />
      <label for="use-strict-bounds"
        >Limit to shown map: {{ isStrictBound }}</label
      >
    </div>
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
    }
  },
  data() {
    return {
      isStrictBound: false,
      autocomplete: {}
    }
  },
  watch: {
    isStrictBound(val) {
      this.autocomplete.setOptions({ strictBounds: val })
    }
  },
  mounted() {
    const ac = this.createAutocomplete()
    this.autocomplete = ac
    const localMap = this.map
    // eslint-disable-next-line no-undef
    const marker = new google.maps.Marker({
      map: localMap
    })
    // eslint-disable-next-line no-undef
    google.maps.event.addListener(ac, 'place_changed', function() {
      // eslint-disable-next-line no-unused-vars
      const place = ac.getPlace()
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'")
        return
      }
      if (place.geometry.viewport) {
        console.log('viewport')
        localMap.fitBounds(place.geometry.viewport)
      } else {
        localMap.setCenter(place.geometry.location)
      }
      marker.setPosition(place.geometry.location)
      marker.setVisible(true)
    })
  },
  methods: {
    createAutocomplete() {
      // eslint-disable-next-line no-undef
      const autoc = new google.maps.places.Autocomplete(this.$refs.acinput)
      autoc.bindTo('bounds', this.map)
      return autoc
    }
  }
}
</script>

<style></style>
