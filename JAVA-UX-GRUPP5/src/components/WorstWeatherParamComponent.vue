<template>
  <div class="hottest grid grid-cols-2 justify-items-start w-fit gap-4 ">
    <div class="font-bold w-fit col-span-2 justify-self-center ">{{ title }}</div>
    <!--      <div></div>-->
    <div class="justify-self-end"><img class="w-16" :src="iconName" alt=""></div>
    <div class="max-w-max justify-self-start flex flex-col ">
      <div class="" @click="selectCity(searchData)">
        {{ paramCity }}
      </div>
      <div class="self-start ">{{ paramValue }} {{ parameter.unit }}
      </div>
    </div>
  </div>
</template>
<script>
import snowflake_icon from "@/assets/prototype_icons/snowflake-solid3.svg"
import wind_icon from "@/assets/prototype_icons/wind-solid3.svg"
import rain_icon from "@/assets/prototype_icons/Group12.svg"

export default {
  name: 'worst-weather-param-component',
  props: {
    parameter: {},
    title: String,
    icon: String
  },
  data() {
    return {
      iconName: "",
      paramValue: "",
      paramCity: "",
    }
  },
  mounted() {
    this.checkParam()
  },
  watch: {
    // parameter: {
    //   deep:true,
    //   handler(){
    //     this.checkParam()
    //   }
    // }

  },
  methods: {
    checkParam() {
      if (this.parameter.unit === "Cel") {
        this.iconName = snowflake_icon
        this.paramValue = this.parameter.minValue
        this.paramCity = this.parameter.city.minValueGeo.features[0].properties.city
      }
      if (this.parameter.unit === "mm") {
        this.iconName = rain_icon
        this.paramValue = this.parameter.maxValue
        this.paramCity = this.parameter.city.maxValueGeo.features[0].properties.city
      }
      if (this.parameter.unit === "m/s") {
        this.iconName = wind_icon
        this.paramValue = this.parameter.maxValue
        this.paramCity = this.parameter.city.maxValueGeo.features[0].properties.city
      }
    }
  }
}
</script>
