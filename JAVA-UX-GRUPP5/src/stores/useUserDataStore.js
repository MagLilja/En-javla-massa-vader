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
        favoriteLocationList: useStorage('favoriteLocationList', {
            favorites: []
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
        getFavoriteLocationList() {
            return this.favoriteLocationList
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
        setFavoriteLocation(value) {
            let favoriteLocationList = this.getFavoriteLocationList;
            let isNotAlreadyInList = (value) => {
                for (let favorite of this.favoriteLocationList.favorites) {
                    if (favorite != null) {
                        console.log((favorite.city === value.city && favorite.municipality === value.municipality));
                        if (favorite.city === value.city && favorite.municipality === value.municipality) {
                            console.info("Location already in list");
                            return false
                        }
                    }
                }
                return true
            };
            if (isNotAlreadyInList(value)) {
                favoriteLocationList.favorites.push(value)
                this.favoriteLocationList = favoriteLocationList
            }
        },
        removeFavoriteLocation(value) {
            let favoriteLocationList = this.getFavoriteLocationList;
            for (let favorite of favoriteLocationList.favorites) {
                if (favorite != null && favorite.longitude === value.longitude && favorite.latitude === value.latitude) {
                    let indexOf1 = favoriteLocationList.favorites.indexOf(favorite);
                    delete favoriteLocationList.favorites[indexOf1]
                }
            }
            this.favoriteLocationList = favoriteLocationList
        },
    }
})
