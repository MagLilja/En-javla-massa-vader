<template>
  <h1>En jävla massa väder</h1>
  <router-link to="home">Hem</router-link>
  -
  <router-link to="observations">Observationer</router-link>
  -
  <router-link to="forecast">Prognoser</router-link>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
