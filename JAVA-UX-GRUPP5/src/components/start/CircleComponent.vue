<template>
  <div>
    <div class="circle-container" :style="{'--circle-degree-var': clockDeg}">
      <div class="outer-circle-container">
        <div class="outer-circle-item" v-for="(wx, index) of completeDailyWxList" :key="index">
          {{ wx.time }}
          <br>{{ wx.wSymb2Symbol }}
          <br>{{ wx.temperature }}&#176C
        </div>
        <div class="inner-circle-container">
          <div class="inner-circle-temperature">{{
              getForecastFullData.timeSeries[0].parameters[10].values[0]
            }}&#176C
          </div>
          <div class="inner-circle-symbol">{{
              getWSymb2Unicode(getForecastFullData.timeSeries[0].parameters[18].values[0])
            }}
          </div>
          <div class="inner-circle-time">
            {{ nowTime() }}
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import WSymb2 from '@/services/Wsymb2.json';
import {useUserDataStore} from "@/stores/useUserDataStore.js";
import {mapActions, mapState} from "pinia";
import weatherDataManager from "@/managers/WeatherDataManager";

export default {
  props: {},
  data() {
    return {
      wSymb2Decoder: WSymb2,
      clockDeg: "",
      completeDailyWxList: undefined,
    }
  },
  computed: {
    ...mapState(useUserDataStore, ["getCoordinates", "getForecastFullData", "getAnalysisFulldata"])
  },
  created() {
    this.setLocalClockDeg()
    this.buildOuterCircleDatalist()
  },
  watch: {
    getForecastFullData: {
      deep: true,
      handler() {
        this.buildOuterCircleDatalist()
      },
    }
  },
  methods: {
    ...mapActions(useUserDataStore, ["setAnalysisFulldata", "setCoordinates", "setForecastFulldata", "setUserGeoLocationData"]),

    seTime(time) {
      const event = new Date(time);
      const options = {
        hour: '2-digit',
        minute: '2-digit'
      }
      return event.toLocaleTimeString('sv-SE', options)
    },
    nowTime() {
      let now = new Date()
      return this.seTime(now)
    },
    getWSymb2Unicode(data) {
      for (const wSymb2 of this.wSymb2Decoder.weathers) {
        if (wSymb2.value === data) {
          return wSymb2.symbol
        }
      }
    },
    buildOuterCircleDatalist() {
      let forecastList = weatherDataManager.getListWithWeatherData(this.getForecastFullData, this.wSymb2Decoder, 2, 12, true)
      let analysisList = weatherDataManager.getListWithWeatherData(this.getAnalysisFulldata, this.wSymb2Decoder, 2, 12, true, "analysis").reverse()
      if (analysisList.length + forecastList.length === 13) {
        analysisList.pop()
      } else {
        let data0 = analysisList[analysisList.length - 1];
        let tempDate = new Date(data0.validTime);
        tempDate.setHours(tempDate.getHours() + 1)
        let timeString = tempDate.toLocaleTimeString("sv-SE", {hour: "numeric", minute: "numeric"});
        data0.time = timeString;
      }
      this.completeDailyWxList = analysisList.concat(forecastList)
    },
    setLocalClockDeg() {
      let date = new Date;
      let minutes = date.getMinutes();
      let hours = date.getHours();
      this.clockDeg = ((hours * 30) + (minutes / 2)) / 2 + 'deg'
    }
  }
}
</script>

<style scoped>

@keyframes rotate {
  100% {
    rotate: 360deg;
  }
}

.circle-container {
  display: grid;
  place-items: center;
  width: 300px;
  --circle-degree-var: 0deg;
}

.outer-circle-container::after {
  content: "";
  background-image: url('../../assets/prototype_icons/caret-up-solid.svg');
  background-size: 1em;
  background-repeat: no-repeat;
  height: 231px;
  position: absolute;
  transform: rotateZ(var(--circle-degree-var));
  width: 16px;
  border-radius: 12px;
  z-index: 5;
  animation: rotate 43200s infinite linear;
  /*animation: rotate 60s infinite linear;*/

}


.outer-circle-container {
  display: grid;
  place-items: center;
  width: 300px;
  height: 300px;
  /*border: 1px solid #afafaf;*/
  border-radius: 50%;
  position: relative;
  background-color: var(--primary-color-greyishblue);
  overflow: hidden;
}

.outer-circle-item {
  position: absolute;
  font-size: 0.6em;
  font-weight: 700;
  z-index: 2;
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


.inner-circle-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 10px;
  padding: 10px;
  width: 200px;
  height: 200px;
  border: 1px solid #be1a1a;
  border-radius: 50%;
  background-color: white;

  border: double 10px transparent;
  border-radius: 50%;
  background-image: linear-gradient(var(--primary-color-lightgrey), var(--primary-color-lightgrey)),
  linear-gradient(25deg, #e46668, #e46868, #ecae5e, #5fb7e0, #68a9d2);
  background-origin: border-box;
  background-clip: content-box, border-box;


  z-index: 2;
}

.inner-circle-temperature {
  font-size: 2.5em;
}

.inner-circle-time {
  font-size: 2em;
}

.inner-circle-symbol {
  font-size: 2em;
}
</style>
