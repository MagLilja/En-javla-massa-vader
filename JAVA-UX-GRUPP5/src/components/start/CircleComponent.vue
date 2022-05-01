<template>
  <div>
    <div class="circle-container">
      <div class="outer-circle-container" :style="{'--my-var': bgColor}">
        <div class="outer-circle-item" v-for="(wx, index) of completeDailyWxList" :key="index">
          {{ wx.time }}
          <br>{{ wx.wSymb2Symbol }}
          <br>{{ wx.temperature }}&#176C
        </div>
        <div class="inner-circle-container" >
          <div class="inner-circle-temperature">{{
              forecastFullData.timeSeries[0].parameters[10].values[0]
            }}&#176C
          </div>
          <div class="inner-circle-symbol">{{
              getWSymb2Unicode(forecastFullData.timeSeries[0].parameters[18].values[0])
            }}
          </div>
          <div class="inner-circle-time">

            <!--            {{ seTime(forecastFullData.timeSeries[0].validTime) }}-->
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
      bgColor: "90deg",
    }
  },
  watch: {},
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
      // Get the local time using JS
      var date = new Date;
      var seconds = date.getSeconds();
      var minutes = date.getMinutes();
      var hours = date.getHours();

      // Create an object with each hand and it's angle in degrees
      var angle = (hours * 30) + (minutes / 2)



      // Loop through each of these hands to set their angle
      for (var j = 0; j < hands.length; j++) {
        var elements = document.querySelectorAll('.' + hands[j].hand);
        for (var k = 0; k < elements.length; k++) {
          elements[k].style.webkitTransform = 'rotateZ(' + hands[j].angle + 'deg)';
          elements[k].style.transform = 'rotateZ(' + hands[j].angle + 'deg)';
          // If this is a minute hand, note the seconds position (to calculate minute position later)
          if (hands[j].hand === 'minutes') {
            elements[k].parentNode.setAttribute('data-second-angle', hands[j + 1].angle);
          }
        }
      }
    }
  }
}
</script>

<style scoped>


@keyframes rotate {
  100% {
    /*transform: rotateZ(360deg);*/
    rotate: 360deg;
  }
}

.circle-container {
  display: grid;
  place-items: center;
  width: 300px;
  /*overflow: hidden;*/
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
  --my-var:0deg;
  transform: rotateZ(var(--my-var));
  width: 16px;
  /*border:1px solid black;*/
  border-radius: 12px;
  z-index: 1;
  animation: rotate 600s infinite linear;
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
