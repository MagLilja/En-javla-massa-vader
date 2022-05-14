<template>
  <div class="data-component">
    dataComponent:
    <br />
    <ul v-if="periodData">
      <li v-for="element of periodData.value">
        {{ unitConverter(element.date) }} - {{ element.value }} -
        {{ periodData.parameter.unit }}
      </li>
    </ul>
  </div>
</template>

<script>
import smhiService from '@/services/smhiService.js'

export default {
  name: 'DataComponent',
  props: {
    selectedPeriodHref: String,
  },
  data() {
    return {
      periodData: undefined,
    }
  },
  watch: {
    selectedPeriodHref() {
      this.extractDataLink()
    },
  },
  methods: {
    async extractDataLink() {
      let periodRef = await smhiService.fetchData(this.selectedPeriodHref)
      /** @type (String) */
      let href = periodRef.data[0].link[0].href
      this.periodData = await smhiService.fetchData(href)
    },
    unitConverter(unixTime) {
      let dateFormatted = new Date(unixTime)
      return dateFormatted.toLocaleString('sv-SE')
    },
  },
}
</script>

<style>
.data-component {
  background-color: yellow;
}
</style>
