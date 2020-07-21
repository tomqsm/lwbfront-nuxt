<template>
  <div class="container">
    <b-row>
      <h1>{{ $t('about.title') }}</h1>
    </b-row>
    <b-row>
      <b-col>
        <p>
          <span v-html="$t('about.intro')"></span>
        </p>
        <p v-html="$t('about.nip')"></p>
        <p class="float-left">
          <b>{{ $t('about.kontakt') }}:</b>&nbsp;
        </p>
        <b-link v-if="!showEmail" href @click="showEmail = !showEmail">{{
          $t('about.pokazEmail')
        }}</b-link>
        <p v-else>
          website@letsweb.biz {{ $t('about.lub') }}
          <a href="mailto:website@letsweb.biz">
            {{ $t('about.otworzSkrzynke') }}
          </a>
        </p>
      </b-col>
      <b-col>
        <a
          class="LI-simple-link"
          href="https://pl.linkedin.com/in/tomasz-kusmierczyk-letsweb-biz?trk=profile-badge"
          target="blank"
        >
          <img :src="badgeImage" :alt="$t('about.badgeImageLabel')" />
        </a>
        <keep-alive>
          <GoogleMap :map-config="mapConfig">
            <template slot-scope="{ google, map }">
              <GoogleMapMarker
                v-for="config in markersConfig"
                :key="config.id"
                :marker-config="config"
                :google="google"
                :map="map"
              />
              <GoogleMapAutocomplete :google="google" :map="map" />
            </template>
          </GoogleMap>
        </keep-alive>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import GoogleMapMarker from '@/components/GoogleMapMarker'
import GoogleMapAutocomplete from '@/components/GoogleMapAutocomplete'
export default {
  components: { GoogleMapMarker, GoogleMapAutocomplete },
  data() {
    return {
      pagelocale: this.$i18n.locale,
      showEmail: false,
      markersConfig: [
        {
          id: 'test1',
          position: { lat: 52.811148538597904, lng: 21.711489989869552 },
          title: 'test 1',
          infoWindow: {
            content: 'this is info about test 1 <b>turbo</b>'
          }
        },
        {
          id: 'test2',
          position: { lat: 51.811148538597904, lng: 21.711489989869552 },
          title: 'test 2',
          infoWindow: {
            content: 'this is info about test 2'
          }
        }
      ]
    }
  },
  computed: {
    badgeImage() {
      return this.pagelocale === 'pl'
        ? '/img/linkedin-badge_pl-min.PNG'
        : '/img/linkedin-badge_en-min.PNG'
    },
    mapConfig() {
      return {
        zoom: 6,
        mapTypeId: 'terrain',
        disableDoubleClickZoom: true,
        streetViewControl: false
      }
    }
  },
  methods: {},
  head() {
    return { title: 'letsweb.biz - ' + this.$t('about.title') }
  }
}
</script>
