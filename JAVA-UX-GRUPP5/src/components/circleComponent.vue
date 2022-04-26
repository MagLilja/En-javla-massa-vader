<template>
  <div class="circle-container">

    <div class="outercircle">
      <div class="outer-circle-items" v-for="(data, index) of circleDataList">
        {{ data.time }}
        {{ data.wSymb2Symbol }}
        {{ data.temperature }}&#176C
      </div>

      <div class="innercircle" :style="{}">
        {{ forecastFullData.timeSeries[0].parameters[10].values[0] }}&#176C<br>
        {{ getWSymb2Unicode(forecastFullData.timeSeries[0].parameters[18].values[0]) }}
        <br>{{ seTime(forecastFullData.timeSeries[0].validTime) }}
      </div>

    </div>


  </div>


</template>


<script>
import WSymb2 from '@/services/Wsymb2.json';


export default {
  props: {forecastFullData: {}},
  data() {
    return {
      wSymb2Decoder: WSymb2,
      limitCircleItems: 0,
      circleDataList: [],
    }
  },
  watch: {},
  mounted() {
    this.populateCircleDataList()
  },
  methods: {
    seTime(time) {
      const event = new Date(time);
      const options = {
        hour: '2-digit',
        minute: '2-digit'
      }
      return event.toLocaleTimeString('sv-SE', options)
    },
    countValues(v) {
      this.limitCircleItems++
      console.log(this.limitCircleItems);
      return v
    },
    getHourFromTime(time) {
      const event = new Date(time);
      const options = {
        hour: '2-digit',

      }
      return event.toLocaleTimeString('sv-SE', options)
    },
    getWSymb2Unicode(data) {
      for (const wSymb2 of this.wSymb2Decoder.weathers) {
        if (wSymb2.value === data) {
          return wSymb2.symbol
        }
      }
    },
    populateCircleDataList() {
      let counter = 0
      for (let ts of this.forecastFullData.timeSeries) {
        if (this.getHourFromTime(ts.validTime) % 2 === 0 && counter < 12) {
          counter++
          this.circleDataList.push(
              {
                time: this.seTime(ts.validTime),
                validTime: ts.validTime,
                wSymb2Symbol: this.getWSymb2Unicode(ts.parameters[18].values[0]),
                temperature: `${ts.parameters[10].values[0]}`,
              }
          )
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
}

.outercircle {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
  border: 1px solid #dcdcdc;
  border-radius: 50%;
  position: relative;
  background-color: #d0d0d0;
}

.outer-circle-items {
  position: absolute;
  width: 32px;
  height: 32px;
}

.outercircle div:nth-child(1) {
  position: absolute;
  top: calc(5px + 4px);

  width: 32px;
  height: 32px;
}

.outercircle div:nth-child(2) {
  position: absolute;
  right: 60px;
  top: 9px;
  width: 32px;
  height: 32px;
}

.outercircle div:nth-child(3) {
  position: absolute;
  right: 30px;
  top: 60px;
  width: 32px;
  height: 32px;
}

.outercircle div:nth-child(4) {
  position: absolute;
  right: 10px;
  top:110px;
  width: 32px;
  height: 32px;
}

.outercircle div:nth-child(5) {
  position: absolute;
  right: 30px;
  top:180px;
  width: 32px;
  height: 32px;
}

.outercircle div:nth-child(6) {
  position: absolute;

  bottom:10px;
  width: 32px;
  height: 32px;
}

.outercircle div:nth-child(7) {
  position: absolute;
  bottom:30px;
  left:60px;
  width: 32px;
  height: 32px;
}

.outercircle div:nth-child(8) {
  position: absolute;
  bottom:60px;
  left:20px;
  width: 32px;
  height: 32px;
}

.outercircle div:nth-child(9) {
  position: absolute;
  bottom:120px;
  left:10px;
  width: 32px;
  height: 32px;
}

.outercircle div:nth-child(10) {
  position: absolute;
  bottom:180px;
  left:20px;
  width: 32px;
  height: 32px;
}

.outercircle div:nth-child(11) {
  position: absolute;
  bottom:230px;
  left:40px;
  width: 32px;
  height: 32px;
}

.outercircle div:nth-child(12) {
  position: absolute;
  top:10px;
  left:80px;
  width: 32px;
  height: 32px;
}

.innercircle {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  padding: 10px;
  width: 200px;
  height: 200px;
  background-color: #adadad;
  font-size: 2em;

  border: double 1px transparent;
  border-radius: 50%;
  background-image: linear-gradient(white, white),
  linear-gradient(25deg, #ff0000, #00d9ff);
  background-origin: border-box;
  background-clip: content-box, border-box;


}
</style>
