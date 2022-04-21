<template>
  <div>Välj parameter:</div>
  <select
    v-if="parameters"
    v-model="selectedHref"
    class="parameterSelection"
    @change="toParent(selectedHref)"
  >
    <option
      v-for="(p, index) in parameters.resource"
      :key="`${index}`"
      :value="{ parameterLink: p.link[0].href }"
    >
      {{ `${p.title} - ${p.summary}` }}
    </option>
  </select>
</template>

<script>
import smhiService from "./../services/smhiService.js";

export default {
  name: 'ParametersComponent',
  props: {
    smhiType: String,
  },
  emits: ['selectedHref'],
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
      this.$emit('selectedHref', value)
    },
  },
}
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
