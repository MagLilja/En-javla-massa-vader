<template>
  <p>Häst</p>
  <p>Hund</p>
  <input type="button" value="Tryck" @click="fetchData" />
  <p v-for="(resource, index) in metObs.resource" :key="index">{{resource.title}}</p>
</template>

<script>
export default {
  name: "dataComponent",
  data() {
    return {
      metObs: ""
    };
  },
  methods: {
    async fetchData() {
      let response = await fetch(
        "http://opendata-download-metobs.smhi.se/api/version/1.0.json"
      );
      this.metObs = await response.json();
      console.log(this.metObs);
    },
  },
};
</script>
