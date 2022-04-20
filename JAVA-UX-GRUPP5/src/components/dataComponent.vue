<template>
  <p>Häst</p>
  <p>Hund</p>
  <input type="button" value="Tryck" @click="fetchData" />
  <p v-for="(resource, index) in metObs.resource" :key="index">
    {{ resource.title }}
    <br />
    {{ resource.link[0].href }}
  </p>
</template>

<script>
import smhiService from "./../services/smhiService.js";
export default {
  name: "dataComponent",
  data() {
    return {
      metObs: "",
    };
  },
  methods: {
    async fetchData() {
      this.metObs= await smhiService.fetchData();
    },
  },
};
</script>
