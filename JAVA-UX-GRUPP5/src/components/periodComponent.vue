<template>
  <div class="period-component-container">
    <div>periodComponent</div>
    <!--    <div>Välj station:</div>-->
    <!--    <select-->
    <!--        v-model="selectedStationHref"-->
    <!--        class=""-->
    <!--        @change="toParent(selectedStationHref)">-->
    <!--      <option-->
    <!--          v-for="(station, index) in stationsForParam.station"-->
    <!--          :key="`${index}`"-->
    <!--          :value="{data: station.link[0].href}"-->
    <!--      >-->
    <!--        {{ station.name }}-->
    <!--      </option>-->
    <!--    </select>-->
  </div>
</template>

<script>
import smhiService from "./../services/smhiService.js";

export default {
  props: {},
  emits: [''],
  data() {
    return {}
  },
  methods: {},
  watch: {}
}
</script>

<style scoped>
.period-component-container {
  background-color: #d6ded1;
  padding: 2em;
}
</style>
