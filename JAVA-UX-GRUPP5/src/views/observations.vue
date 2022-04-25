<template>
  <br>

  <param-component
      @paramSelectionHref="onClickParameter"/>
  <station-component
      :selectedParamStationsHref="selectedParamStationsHref"
      @selectedStationHref="onClickStation"/>
  <period-component
      :selectedStationHref="selectedStationHref"
      @selectedPeriodForStationHref="onClickPeriod"/>
  <data-component :selectedPeriodHref="selectedPeriodHref"

    />
</template>
