<template><div class="circle-container">
    
      <div class="outercircle">
        <img src="../assets/clouds-cloud-svgrepo-com.svg" alt="Ett fint moln" />
        <img src="../assets/sun-svgrepo-com.svg" alt="En fin sol" />
        <div class="innercircle">13 grader</div>
      </div>
</div>
</template>
<style>
.circle-container{
    padding: 3em;
    display:flex;
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
