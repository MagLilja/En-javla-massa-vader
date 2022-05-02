import {defineStore} from 'pinia'


export const useUserDataStore = defineStore('useUserDataStore', {
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
