<template>
  <div class="top-nav-bar-container">
    <MqResponsive target="sm-">
      <router-link to="/search">

        <img class="search-icon"
             src="../../assets/icons/search-icon.svg"
             alt="search-icon"/>
      </router-link>
    </MqResponsive>
    <MqResponsive target="md+">
      <img class="search-icon"
           src="../../assets/icons/search-icon.svg"
           alt="search-icon"/>
      <search-component @click="toggleSearchResult()"/>

      <div class="search-box" v-if="showSearch">

      </div>
    </MqResponsive>

    <div >df</div>

    <div @click="toggleSearch()" class="top-nav-site-title">En jävla massa väder!</div>
    <div class="favorite-link"><img class="favorite-icon"
                                    src="../../assets/icons/favorite.svg"
                                    alt="search-icon"/></div>
  </div>
</template>

<script>
import {MqResponsive} from "vue3-mq";
import SearchComponent from "@/components/global/SearchComponent.vue"

export default {
  data() {
    return {
      showSearch: false,
    }
  },
  components: {MqResponsive, SearchComponent},
  methods: {
    toggleSearchResult() {
      this.showSearch = !this.showSearch
    },
  }
}
</script>
<style scoped>
.search-box {
  width: 100px;
  aspect-ratio: 1;

  position:relative;
  top:500px;
}

</style>
