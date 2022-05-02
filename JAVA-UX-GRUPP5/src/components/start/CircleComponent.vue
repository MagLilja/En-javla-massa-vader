<template>
  <div>
    <div class="circle-container" :style="{'--my-var': clockDeg}">
      <div class="outer-circle-container">
        <div class="outer-circle-item" v-for="(wx, index) of completeDailyWxList" :key="index">
          {{ wx.time }}
          <br>{{ wx.wSymb2Symbol }}
          <br>{{ wx.temperature }}&#176C
        </div>
        <div class="inner-circle-container">
          <div class="inner-circle-temperature">{{
              forecastFullData.timeSeries[0].parameters[10].values[0]
            }}&#176C
          </div>
          <div class="inner-circle-symbol">{{
              getWSymb2Unicode(forecastFullData.timeSeries[0].parameters[18].values[0])
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

export default {
  props: {
    forecastFullData: {},
    completeDailyWxList: []
  },
  data() {
    return {
      wSymb2Decoder: WSymb2,
      clockDeg: "90deg",
    }
  },
  watch: {},
  mounted() {
    this.initLocalClocks()
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
    nowTime() {
      let now = new Date()
      return now.getHours() + ":" + now.getMinutes()
    },
    getWSymb2Unicode(data) {
      for (const wSymb2 of this.wSymb2Decoder.weathers) {
        if (wSymb2.value === data) {
          return wSymb2.symbol
        }
      }
    },
    initLocalClocks() {
      var date = new Date;
      var seconds = date.getSeconds();
      var minutes = date.getMinutes();
      var hours = date.getHours();
      this.clockDeg = ((hours * 30) + (minutes / 2)) / 2 + 'deg'
      //08:41 = 8*30 + 41/2 = 260
      //20:41 = 20*30 + 41/2 = 620
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
  --my-var: 0deg;
}

.outer-circle-container::after {
  content: "";
  /*En gradient för att få änden av det roterande objektet att "försvinna"*/
  /*background: linear-gradient(45deg, rgba(230, 230, 230, 0) 0%,*/
  /*rgba(231, 71, 71, 0) 35%,*/
  /*rgba(0, 212, 255, 1) 100%);;*/
  background-image: url('../../assets/icons/arrow-up-solid.svg');
  background-size: 1em;
  background-repeat: no-repeat;
  height: 230px;
  position: absolute;
  transform: rotateZ(var(--my-var));
  width: 16px;
  border-radius: 12px;
  z-index: 1;
  animation: rotate 43200s infinite linear;
}


.outer-circle-container {
  display: grid;
  place-items: center;
  width: 300px;
  height: 300px;
  border: 1px solid #afafaf;
  border-radius: 50%;
  position: relative;
  background-color: #e6e6e6;
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
  background-color: #adabab;
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
