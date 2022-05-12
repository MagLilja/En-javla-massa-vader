<template>
  <div class="hottest grid grid-cols-2 justify-items-start w-fit gap-4">
    <div class="font-bold w-fit col-span-2 justify-self-center">{{ title }}</div>
    <!--      <div></div>-->
    <div class="justify-self-end"><img class="w-16" :src="iconName"  alt=""></div>
    <div class="max-w-max justify-self-start flex flex-col">
      <div class="">{{ parameter.city.minValueGeo.features[0].properties.city }}</div>
      <div class="self-start">{{ parameter.minValue }} {{ parameter.unit }}
      </div>
    </div>
  </div>
</template>
<script>
 import icon from "@/assets/prototype_icons/snowflake-solid3.svg"

export default {
  name: 'worst-weather-param-component',
  props: {
    parameter: {},
    title: String,
  },
  data() {
    return {
      iconName:icon
    }
  },
}
</script>
