<template>
  <div class="grid gap-4 mt-40 p-8"><h2> About text här...
  </h2>  <!--  Det här står i uppgiftsbeskrivningen: -->
    <!--  En “Om”-sida med information om applikationen (som t.ex. version) och vilket API ni-->
    <!--  använder, samt vilka ni är som har skapat den.-->
    <p>Den här sidan är ett skolprojekt på YRGO yrkeshögskola i Göteborg för</p>


    <p> utbildningarna Java Enterprise utvecklare och UX-design (RÄTT NAMN FÖR DERAS
    </p>
    <p> UTBILDNING HÄR). Väderdatan som visas från SMHI:s öppna API
      (https://opendata.smhi.se/), dokumentation för API:n finns att hitta på

      följande länk https://opendata.smhi.se/apidocs/.</p>
    <p>
      Vi använder oss också av
      följande API:er För att kunna söka på ortsnamn använder vi oss av:
      https://smeijer.github.io/leaflet-geosearch/ För att koppla en koordinat till
      ett ortsnamn använder vi oss av: https://www.geoapify.com/</p>

    <p>
      Vi som har gjort
      detta är följande personer........
    </p>
    <p> Sidan är skapad i utbildningssyfte med hjälp av VueJs 3 och Tailwind CSS.
    </p></div>
</template>

<script>
  export default {
    name: "AboutView"
  };
</script>

<style scoped></style>
