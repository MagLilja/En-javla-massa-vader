<template>
  <div>
    <div class="
    grid
    items-center
    w-[300px]
    circle-degree-var" :style="{'--circle-degree-var': clockDeg}">
      <div class="
      outer-circle-container
      relative
      grid place-items-center
      w-[300px] h-[300px]
      overflow-hidden
      rounded-full
      after:absolute
      after:h-[231px]
      after:w-[16px]">
        <div v-for="(wx, index) of completeDailyWxList" :key="index" class="outer-circle-item absolute text-[0.6em] ">
          {{ wx.time }}
          <br>{{ wx.wSymb2Symbol }}
          <br>{{ wx.temperature }}&#176;C
        </div>
        <div class="gradient-temp-circle flex justify-center items-center flex-col w-[200px] aspect-square p-3 rounded-full z-[2] bg-white">
          <div class="font-bold text-5xl">{{
              getForecastFullData.timeSeries[0].parameters[10].values[0]
            }}&#176;C
          </div>
          <div class="text-8xl">{{
              getWSymb2Unicode(getForecastFullData.timeSeries[0].parameters[18].values[0])
            }}
          </div>
          <div class="text-5xl">
            {{ nowTime() }}
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import weatherSymbolJson from "@/assets/json/Wsymb2.json";
  import { useUserDataStore } from "@/stores/useUserDataStore.js";
  import { mapActions, mapState } from "pinia";
  import weatherDataListManager from "@/managers/WeatherDataListManager.js";

  export default {
    props: {},
    data() {
      return {
        wSymb2Decoder: weatherSymbolJson,
        clockDeg: "",
        completeDailyWxList: undefined
      };
    },
    computed: {
      ...mapState(useUserDataStore, ["getCoordinates", "getForecastFullData", "getAnalysisFulldata"])
    },
    watch: {
      getForecastFullData: {
        deep: true,
        handler() {
          this.buildOuterCircleDatalist();
        }
      }
    },
    created() {
      this.setLocalClockDeg();
      this.buildOuterCircleDatalist();
    },
    methods: {
      ...mapActions(useUserDataStore, ["setAnalysisFulldata", "setCoordinates", "setForecastFulldata", "setUserGeoLocationData"]),

      seTime(time) {
        const event = new Date(time);
        const options = {
          hour: "2-digit",
          minute: "2-digit"
        };
        return event.toLocaleTimeString("sv-SE", options);
      },
      nowTime() {
        let now = new Date();
        return this.seTime(now);
      },
      getWSymb2Unicode(data) {
        for (const wSymb2 of this.wSymb2Decoder.weathers) {
          if (wSymb2.value === data) {
            return wSymb2.symbol;
          }
        }
      },
      buildOuterCircleDatalist() {
        let forecastList = weatherDataListManager.getListWithWeatherData(this.getForecastFullData, this.wSymb2Decoder, 2, 12, true);
        let analysisList = weatherDataListManager.getListWithWeatherData(this.getAnalysisFulldata, this.wSymb2Decoder, 2, 12, true, "analysis").reverse();
        if (analysisList.length + forecastList.length === 13) {
          analysisList.pop();
        } else {
          let data0 = analysisList[analysisList.length - 1];
          let tempDate = new Date(data0.validTime);
          tempDate.setHours(tempDate.getHours() + 1);
          data0.time = tempDate.toLocaleTimeString("sv-SE", { hour: "numeric", minute: "numeric" });
        }
        this.completeDailyWxList = analysisList.concat(forecastList);
      },
      setLocalClockDeg() {
        let date = new Date;
        let minutes = date.getMinutes();
        let hours = date.getHours();
        this.clockDeg = ((hours * 30) + (minutes / 2)) / 2 + "deg";
      }
    }
  };
</script>

<style scoped>

@keyframes rotate {
  100% {
    rotate: 360deg;
  }
}

.circle-degree-var {
  --circle-degree-var: 0deg;
}

.outer-circle-container {
  background-color: var(--primary-color-lightblue);
}

.outer-circle-container::after {
  content: '';
  background-image: url('../../assets/icons/caret-up-solid.svg');
  background-size: 1em;
  background-repeat: no-repeat;
  transform: rotateZ(var(--circle-degree-var));
  z-index: 4;
  animation: rotate 43200s infinite linear;
}

.outer-circle-item:nth-child(1) {
  top: calc(150px - 150 * 1px + 7px);
}

.outer-circle-item:nth-child(2) {
  top: calc(150px - 150 * 0.86px + 2px);
  right: calc(150px - 150 * 0.5px);
}

.outer-circle-item:nth-child(3) {
  top: calc(150px - 150 * 0.5px - 10px);
  right: calc(150px - 150 * 0.86px + 10px);
}

.outer-circle-item:nth-child(4) {
  top: calc(150px - 150 * 0px - 20px);
  right: calc(150px - 150 * 1px + 12px);
}

.outer-circle-item:nth-child(5) {
  bottom: calc(150px - 150 * 0.5px - 10px);
  right: calc(150px - 150 * 0.86px + 8px);
}

.outer-circle-item:nth-child(6) {
  bottom: calc(150px - 150 * 0.86px);
  right: calc(150px - 150 * 0.5px);
}

.outer-circle-item:nth-child(7) {
  bottom: calc(150px - 150 * 1px + 5px);
}

.outer-circle-item:nth-child(8) {
  bottom: calc(150px - 150 * 0.86px);
  left: calc(150px - 150 * 0.5px);
}

.outer-circle-item:nth-child(9) {
  bottom: calc(150px - 150 * 0.5px - 10px);
  left: calc(150px - 150 * 0.86px + 8px);
}

.outer-circle-item:nth-child(10) {
  top: calc(150px - 150 * 0px - 20px);
  left: calc(150px - 150 * 1px + 12px);
}

.outer-circle-item:nth-child(11) {
  top: calc(150px - 150 * 0.5px - 10px);
  left: calc(150px - 150 * 0.86px + 10px);
}

.outer-circle-item:nth-child(12) {
  top: calc(150px - 150 * 0.86px + 2px);
  left: calc(150px - 150 * 0.5px);
}


.gradient-temp-circle {
  border: double 10px transparent;
  background-image: linear-gradient(var(--primary-color-lightgrey), var(--primary-color-lightgrey)),
  linear-gradient(25deg, #e46668, #e46868, #ecae5e, #5fb7e0, #68a9d2);
  background-origin: border-box;
  background-clip: content-box, border-box;

}

</style>
