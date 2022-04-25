<template>
  <div class="param-componten-container">
    <div>paramComponent:</div>
    <div>Välj parameter:</div>
    <select
        v-model="selectedHref"
        class=""
        @change="toParent(selectedHref)"
    >
      <option
          v-for="(p, index) in parameters.resource"
          :key="`${index}`"
          :value="{ parameterLink: p.link[0].href }"
      >
        {{ `${p.title} - ${p.summary}` }}
      </option>
    </select></div>
</template>

<script>
import smhiService from "@/services/smhiService.js";

export default {
  name: 'paramComponent',
  props: {
    smhiType: String,
  },
  emits: ['paramSelectionHref'],
  data() {
    return {
      selectedHref: '',
      parameters: "",
    }
  },
  created() {
    smhiService.fetchData().then((p) => (this.parameters = p))
  },
  methods: {
    toParent(value) {
      this.$emit('paramSelectionHref', value)
    },
  },
}
</script>

<style scoped>
a {
  color: #42b983;
}

.param-componten-container {
  background-color: #ded1d1;
  padding: 2em;
}
</style>
