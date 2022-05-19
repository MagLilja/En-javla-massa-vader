<template>
  <div class="grid gap-4 mt-40 p-8 md:mt-0">
    <h4><b>Syfte</b></h4> 
      <p>Den här vädersidan är ett skolprojekt i kursen <i>Klientprogrammering</i> i Java Enterprise-programmet 
      vid YRGO yrkeshögskola i Göteborg. Sidan har utvecklats i samarbete med programmet UX-design.
      </p>
  <br>
    <h4><b>Väderdata</b></h4>
      <p>Väderdatan som visas kommer från SMHI:s öppna API <i>http://opendata.smhi.se</i> och dokumentation för detta API
      finns på <i>https://opendata.smhi.se/apidocs/</i>. I de fall vi har behövt koppla ett ortsnamn till en koordinat har vi använt 
      oss av <i>https://smeijer.github.io/leaflet-geosearch/</i>. I det omvända fallet, att få ut ett ortsnamn givet en koordinat, 
      har vi använt oss av <i>https://www.geoapify.com.</i></p>
  <br>
    <h4><b>Utveckling</b></h4>
      <p>
      Websidans grafiska design och layout är framtagen av UX-team:et. Det grafiska har designats i Figma och funktionaliteten 
      har verifierats av att allmänheten har fått testa prototyper av applikationen. Websidan är skapad och stilsatt med 
      VueJs 3 och Tailwind CSS.
      </p>
    <h4><b>Projektmedlemmar</b></h4>
      <p>Utvecklarna från Java Enterprise:</p>
      <ul class=about_us_people>
        <li>Magnus Lilja</li>
        <li>Anton Ranstad</li>
        <li>Patrik Hjortberg</li>
        <li>Hampus Olsson</li>
      </ul>
      <p>Designers från UX-design:</p>
      <ul class=about_us_people>
        <li>Elvira Nyman</li>
        <li>Robert Arnestad</li>
        <li>Philip Sunnerholm</li>
        <li>Joella Jantzen</li>
        <li>Vazgon Babakhanian</li>
        <li>Benjamin Evling</li>
        <li>Sabrina Gnerlich</li>
      </ul>
  </div>
</template>

<script>
  export default {
    name: "AboutView"
  };
</script>

<style scoped>
.about_us_people {
  list-style-type: square;
}
  
</style>
