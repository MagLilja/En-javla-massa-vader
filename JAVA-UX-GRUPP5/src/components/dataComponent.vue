<template>
  <p>Häst</p>
  <p>Hund</p>
  <input type="button" value="Tryck" @click="fetchData" />
  <select @change="emitDataToParent(value)" v-model="value">
    <option
      :value="`${resource.link[0].href}`"
      v-for="(resource, index) in metObs.resource"
      :key="index"
    >
      {{ resource.title }}
      <br />
      {{ resource.summary }}
      <br />
      {{ resource.link[0].href }}
    </option>
  </select>
</template>

<script>
import smhiService from "./../services/smhiService.js";
export default {
  name: "dataComponent",
  emits: ["stationHref"],

  data() {
    return {
      metObs: "",
      value: "",
    };
  },
  methods: {
    async fetchData() {
      this.metObs = await smhiService.fetchData();
    },
    emitDataToParent() {
      this.$emit("stationHref", this.value);
    },
  },
};
</script>
