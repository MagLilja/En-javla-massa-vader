<template>
  <div>
    summary view header
  </div>
  {{ this.getActiveCityName() }}
  ------------------------------ <br>
  {{ this.getLastMonth() }}
</template>
<script>

import {mapState} from "pinia";
import {useUserDataStore} from "@/stores/useUserDataStore";

export default {
  name: 'summary-view-header-component',
  computed: {
    ...mapState(useUserDataStore, ["getCoordinates", "getUserGeoLocationData"])
  },
  methods: {
    getActiveCityName() {
      if (this.getCoordinates.origin === "FROM_SEARCH") {
        return this.getCoordinates.searchSelection
      } else {
        return this.getUserGeoLocationData.features[0].properties.city
      }
    },
    getLastMonth() {
      let today = new Date()
      today.setMonth(today.getMonth() - 1)

      return today.toLocaleDateString("sv-SE",{month:"long"})
    },
  },

}

</script>