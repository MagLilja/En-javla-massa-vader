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
            forecastFullData: "",
        }),
    }),
    getters: {
        getCoordinates() {
            return this.coordinates
        },
        getForecastFullData() {
            return this.forecastFullData
        },
    },
    actions: {
        setCoordinates(coordinates) {
            this.coordinates = coordinates
        },
        setForecastFulldata(value) {
            this.forecastFullData = value
        },
    }
})
