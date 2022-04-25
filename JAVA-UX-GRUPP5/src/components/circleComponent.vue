<template>
  <div class="circle-container">

    <div class="outercircle">
      <img src="../assets/clouds-cloud-svgrepo-com.svg" alt="Ett fint moln"/>
      <img src="../assets/sun-svgrepo-com.svg" alt="En fin sol"/>
      <div class="innercircle" :style="{}">
        {{ forecastFullData.timeSeries[0].parameters[10].values[0] }}&#176C<br>
        {{ getWSymb2Unicode(forecastFullData.timeSeries[0].parameters[18].values[0]) }}
        <br>{{ seTime(forecastFullData.timeSeries[0].validTime) }}
      </div>
    </div>
  </div>
</template>

<script>
import WSymb2 from '../services/WSymb2.json';

export default {
  props: {forecastFullData: {}},
  data() {
    return {
      wSymb2Decoder:WSymb2,
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
  padding: 3em;
  display: flex;
  justify-content: center;
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

.outercircle img {
  position: absolute;

  width: 32px;
  height: 32px;
}

.outercircle img:nth-child(1) {
  position: absolute;
  right: calc(5px + 4px);

  width: 32px;
  height: 32px;
}

.outercircle img:nth-child(2) {
  position: absolute;
  left: 9px;
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
  border: 1px solid red;
  border-radius: 50%;
}
</style>
