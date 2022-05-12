<template>
  worst weather view here

  <img src="./../assets/wireframes/worst.png" alt="" />


</template>

<script>
  import smhiService from "@/services/smhiService.js";
  import swedenCoordinates from "@/assets/sweden-polygon.json";

  export default {
    created() {
      this.getMultiPointAnalysis();
    },
    methods: {
      getSwedenCoordinates: function() {
        let cornersLong = [];
        let cornersLat = [];
        for (let coordinates of swedenCoordinates.features[0].geometry.coordinates[0]) {
          cornersLong.push(coordinates[0]);
          cornersLat.push(coordinates[1]);
        }
        return { cornersLong, cornersLat };
      },
      async getMultiPointAnalysis() {

        let validTimeData = await smhiService.fetchData("https://opendata-download-metanalys.smhi.se/api/category/mesan1g/version/2/validtime.json");
        let validTime = validTimeData.validTime[0];
        let p = "t";
        let lt = "hl";
        validTime = validTime.replace(/[:-]/g, "");
        let l = 2;
        let url = `https://opendata-download-metanalys.smhi.se/api/category/mesan1g/version/2/geotype/multipoint/validtime/${validTime}/parameter/${p}/leveltype/${lt}/level/${l}/data.json?downsample=40`;
        //SMHI ger coordinaterna på fel håll
        let data = await smhiService.fetchData(url);
        let { cornersLong, cornersLat } = this.getSwedenCoordinates();


        data.geometry.coordinates.forEach((c, i) => {
          let longitude = c[0];
          let latitude = c[1];

          let isSweden = this.rayCastingAlgorithm(latitude, longitude, cornersLat, cornersLong);
          if (isSweden) {
            c.sweden = true;
          } else {
            c.sweden = false;
          }
        });


        console.log(data);

        // Gothenburg
        // let latitude =57.7065806
        // let longitude =11.9294613

        // Norrland
        let latitude = 63.792215;
        let longitude = 15.366540;

        // Denmark
        // let latitude =57.448878
        // let longitude =10.290267


      },
      rayCastingAlgorithm(latitude, longitude, cornersLat, cornersLong) {

        var i, j = cornersLat.length - 1;
        var odd = false;

        var pX = cornersLat;
        var pY = cornersLong;

        for (i = 0; i < cornersLat.length; i++) {
          if ((pY[i] < longitude && pY[j] >= longitude || pY[j] < longitude && pY[i] >= longitude)
            && (pX[i] <= latitude || pX[j] <= latitude)) {
            odd ^= (pX[i] + (longitude - pY[i]) * (pX[j] - pX[i]) / (pY[j] - pY[i])) < latitude;
          }

          j = i;
        }
        if (odd === 1) odd = true;
        return odd;
      }
    }

  };


</script>

<style scoped>

</style>
