import {defineStore} from 'pinia'


export const useUserCoordinatesStore = defineStore('userCoordinatesStore', {
    state: () => {
        return {
            coordinates: {
                longitude: 0,
                latitude: 0,
            },

        }
    },
    actions: {
        setCoordinates(coordinates) {
            this.coordinates = coordinates
        },
    }
})
