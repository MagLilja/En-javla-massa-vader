<template>
  worst weather view here

  <img src="./../assets/wireframes/worst.png" alt=""/>


</template>

<script>
import smhiService from "@/services/smhiService.js";
import swedenCoordinates from '@/assets/sweden-polygon.json';

export default {
  created() {
    this.getMultiPointAnalysis()
  },
  methods: {
    async getMultiPointAnalysis() {
      /*
      let validTimeData = await smhiService.fetchData("https://opendata-download-metanalys.smhi.se/api/category/mesan1g/version/2/validtime.json")
      let validTime = validTimeData.validTime[0];
      let p = "t" 
      let lt = "hl"
      validTime = validTime.replace(/[:-]/g, "");
      let l = 2
      let url = `https://opendata-download-metanalys.smhi.se/api/category/mesan1g/version/2/geotype/multipoint/validtime/${validTime}/parameter/${p}/leveltype/${lt}/level/${l}/data.json?downsample=2`
      let data = await smhiService.fetchData(url);
      console.log(data)
        console.log(data.geometry.coordinates[0][0]);
        console.log(data.geometry.coordinates[0][1]);
      console.log(data.timeSeries[0].parameters[0].values[0]);
      */
     
     // Tar fram polygonens hörn. Oanvändbart.
     //
     // let category = "mesan1g"
     // let version = "2"
     // let url2 = `https://opendata-download-metanalys.smhi.se/api/category/${category}/version/${version}/geotype/polygon.json`
     // let data = await smhiService.fetchData(url2);
     // console.log(data)

      for (let coordinates of swedenCoordinates.features[0].geometry.coordinates[0]){
        console.log(coordinates[0]);
      }

      // /api/category/mesan1g/version/2/geotype/multipoint/validtime/20151012T150000Z/parameter/t/leveltype/hl/level/2/data.json?with-geo=false
    },
    checkcheck (x, y, cornersX, cornersY) {

      var i, j=cornersX.length-1 ;
      var odd = false;

      var pX = cornersX;
      var pY = cornersY;

      for (i=0; i<cornersX.length; i++) {
        if ((pY[i]< y && pY[j]>=y ||  pY[j]< y && pY[i]>=y)
            && (pX[i]<=x || pX[j]<=x)) {
          odd ^= (pX[i] + (y-pY[i])*(pX[j]-pX[i])/(pY[j]-pY[i])) < x;
        }

        j=i;
      }

      return odd;
    }
  }

}


</script>

<style scoped>

</style>
