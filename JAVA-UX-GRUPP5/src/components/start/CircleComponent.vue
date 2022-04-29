<template>
  <div>
    <div class="circle-container">
      <div class="outercircle">
      <div class="outer-circle-item" v-for="(wx, index) of completeDailyWxList" :key="index">
      {{wx.time}}<br>{{wx.wSymb2Symbol}}<br>{{wx.temperature}}&#176C
      </div>
        <div class="innercircle" :style="{}"><p>{{ forecastFullData.timeSeries[0].parameters[10].values[0] }}&#176C </p>
          <p>{{ getWSymb2Unicode(forecastFullData.timeSeries[0].parameters[18].values[0]) }}</p>
          {{ seTime(forecastFullData.timeSeries[0].validTime) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WSymb2 from '@/services/Wsymb2.json';
import weatherDataManager from "@/services/WeatherDataManager";
export default {
  props: {forecastFullData: {},
         completeDailyWxList: []},
  data() {
    return {
      wSymb2Decoder: WSymb2,
    }
  },
  watch: {

  },
  methods: {
    seTime(time) {
      const event = new Date(time);
      const options = {
        hour: '2-digit',
        minute: '2-digit'
      }
      return event.toLocaleTimeString('se-SV', options)
    },
    getWSymb2Unicode(data) {
      for (const wSymb2 of this.wSymb2Decoder.weathers) {
        if (wSymb2.value === data) {
          return wSymb2.symbol
        }
      }
    }
  }
}
</script>

<style>
.circle-container {
  display: flex;
  justify-content: center;
  width: 300px;
}

.outercircle {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
  border: 1px solid black;
  border-radius: 50%;
  position: relative;
}

.outer-circle-item {
  position: absolute;
  /*border: 2px solid black;*/
}

.outer-circle-item:nth-child(1) {
  top: 0px;
}

.outer-circle-item:nth-child(2) {
  top: 15px;
  right: 60px;
}

.outer-circle-item:nth-child(3) {
  top: 60px;
  right: 15px;
}

.outer-circle-item:nth-child(4) {
  right: 0;
}

.outer-circle-item:nth-child(5) {
  right: 20px;
  top: 180px;
}

.outer-circle-item:nth-child(6) {
  right: 60px;
  top: 230px;
}

.outer-circle-item:nth-child(7) {
  bottom: 0px;
}

.outer-circle-item:nth-child(8) {
  bottom: 15px;
  left: 60px;
}

.outer-circle-item:nth-child(9) {
  bottom: 60px;
  left: 15px;
}

.outer-circle-item:nth-child(10) {
  left: 0;
}

.outer-circle-item:nth-child(11) {
  left: 15px;
  top: 60px;
}

.outer-circle-item:nth-child(12) {
  top: 15px;
  left: 60px;
}



.innercircle {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  padding: 10px;
  width: 200px;
  height: 200px;
  border: 1px solid red;
  border-radius: 50%;
}
</style>
