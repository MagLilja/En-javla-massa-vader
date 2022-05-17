<template>
  <div class="worst-weather-item flex flex-col justify-items-start w-5/6">
    <div class="font-bold w-fit p-4 md:p-0">{{ title }}</div>
    <div class="flex items-center">
      <img class="w-1/6 m-4" :src="iconName" alt="" />
      <div class="max-w-max justify-self-start flex flex-col">
        <div class="" @click="selectCity(searchData)">
          {{ paramCity }}
        </div>
        <div class="self-start font-bold">
          {{ paramValue }} {{ parameter.unit }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import snowflake_icon from '@/assets/prototype_icons/snowflake-solid3.svg'
import wind_icon from '@/assets/prototype_icons/wind-solid3.svg'
import rain_icon from '@/assets/prototype_icons/Group12.svg'

export default {
  name: 'worst-weather-param-component',
  props: {
    parameter: {},
    title: String,
    icon: String,
  },
  data() {
    return {
      iconName: '',
      paramValue: '',
      paramCity: '',
    }
  },
  mounted() {
    this.checkParam()
  },
  watch: {},
  methods: {
    checkParam() {
      if (this.parameter.unit === 'Cel') {
        this.iconName = snowflake_icon
        this.paramValue = this.parameter.minValue
        this.paramCity =
          this.parameter.city.minValueGeo.features[0].properties.city
      }
      if (this.parameter.unit === 'mm') {
        this.iconName = rain_icon
        this.paramValue = this.parameter.maxValue
        this.paramCity =
          this.parameter.city.maxValueGeo.features[0].properties.city
      }
      if (this.parameter.unit === 'm/s') {
        this.iconName = wind_icon
        this.paramValue = this.parameter.maxValue
        this.paramCity =
          this.parameter.city.maxValueGeo.features[0].properties.city
      }
    },
  },
}
</script>
