import { defineStore } from 'pinia'


export const useUserCoordinatesStore = defineStore('userCoordinatesStore', {
    state: () => {
        return {
            longitude: 0,
            latitude: 0,
        }
    },
})
