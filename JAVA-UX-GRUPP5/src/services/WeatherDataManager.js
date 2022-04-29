const weatherDataManager = {
    getListWithWeatherDataForToday(forecastFullData, wSymb2Decoder, interval, noOfDataPoints) {
        let counter = 0
        let circleDataList = []

        let getHourFromTime = (time) => {
            const event = new Date(time);
            const options = {
                hour: '2-digit',
            }
            return event.toLocaleTimeString('sv-SE', options)
        }

        let hourTime = (time) => {
            const event = new Date(time);
            const options = {
                hour: '2-digit', minute: '2-digit'
            }
            return event.toLocaleTimeString('sv-SE', options)
        }


        let getWSymb2Unicode = (data) => {
            for (const wSymb2 of wSymb2Decoder.weathers) {
                if (wSymb2.value === data) {
                    return wSymb2.symbol
                }
            }
        }

        let roundToHour = (date) => {
            let p = 60 * 60 * 1000;
            return new Date(Math.round(date.getTime() / p) * p);
        }

        let today = new Date()
        let time1 = roundToHour(today);
        let data1 = getHourFromTime(time1);
        if (data1 % 2 !== 0) {
            today.setHours(today.getHours() + 1)
        }
        time1 = roundToHour(today);
        data1 = getHourFromTime(time1);

        for (let ts of forecastFullData.timeSeries) {

            let timeSerieDate = new Date(ts.validTime)
            if (getHourFromTime(ts.validTime) % interval === 0 && today.getDate() === timeSerieDate.getDate() && counter < noOfDataPoints) {
                counter++

                let temperatureValue = 0
                let precipitationValue = 0
                let windValue = 0
                let gustValue = 0

                for (let param of ts.parameters) {
                    if (param.name === 't') {
                        temperatureValue = param.values[0]
                    }
                    if (param.name === 'pmean') {
                        precipitationValue = param.values[0]
                    }
                    if (param.name === 'ws') {
                        windValue = param.values[0]
                    }
                    if (param.name === 'gust') {
                        gustValue = param.values[0]
                    }
                }
                circleDataList.push({
                    time: hourTime(ts.validTime),
                    validTime: ts.validTime,
                    wSymb2Symbol: getWSymb2Unicode(ts.parameters[18].values[0]),
                    temperature: temperatureValue,
                    precipitation: precipitationValue, /*Mean preciptation used*/
                    wind: windValue,
                    gusts: gustValue
                })
            }
        }


        return circleDataList
    },


};
Object.freeze(weatherDataManager);
export default weatherDataManager;