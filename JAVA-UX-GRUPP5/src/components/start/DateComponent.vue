<template>
  <div class="date">{{ getLocalDate() }}</div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    getLocalDate() {
      const event = new Date();
      const options = { weekday: "long", month: "long", day: "numeric" };
      const date = event.toLocaleDateString("sv-SE", options);
      return date.replace(date.charAt(0), date.charAt(0).toUpperCase())
    },
  },
};
</script>

<style>
.date {
}
</style>
