import {defineStore} from 'pinia'
import {useStorage} from '@vueuse/core'


export const useUserDataStore = defineStore('useUserDataStore', {

    state: () => ({
        coordinates: useStorage('coordinates', {
            coordinates: {
                longitude: 0,
                latitude: 0,
            },
        }),
        forecastFullData: useStorage('forecastFulData', {
            forecastFullData: undefined,
        }),
        analysisFullData: useStorage('analysisFullData', {
            analysisFullData: undefined,
        }),
        userGeoLocationData: useStorage('userGeoLocationData', {

            features: [{
                geometry: {coordinates: [0, 0]}
            }]

        }),
        searchData: undefined,
    }),
    getters: {
        getCoordinates() {
            return this.coordinates
        },
        getSearchData() {
            return this.searchData
        },
        getForecastFullData() {
            return this.forecastFullData
        },
        getUserGeoLocationData() {
            return this.userGeoLocationData
        },
        getAnalysisFulldata() {
            return this.analysisFullData
        },
    },
    actions: {
        setCoordinates(coordinates) {
            this.coordinates = coordinates
        },
        setSearchData(searchData) {
            this.searchData = searchData
        },
        setForecastFulldata(value) {
            this.forecastFullData = value
        },
        setUserGeoLocationData(value) {
            this.userGeoLocationData = value
        },
        setAnalysisFulldata(value) {
            this.analysisFullData = value
        },
    }
})
