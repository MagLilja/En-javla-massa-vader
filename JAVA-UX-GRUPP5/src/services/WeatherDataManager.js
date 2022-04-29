let wSymb2Decoder = undefined

function getHourFromTime(time) {
    const event = new Date(time);
    const options = {
        hour: '2-digit',
    }
    return event.toLocaleTimeString('sv-SE', options)
}

function hourTime(time) {
    const event = new Date(time);
    const options = {
        hour: '2-digit', minute: '2-digit'
    }
    return event.toLocaleTimeString('sv-SE', options)
}

function getWSymb2Unicode(data) {
    for (const wSymb2 of wSymb2Decoder.weathers) {
        if (wSymb2.value === data) {
            return wSymb2.symbol
        }
    }
}

function getListWithWeatherDataForToday(forecastFullData, wSymb2Json, interval, noOfDataPoints) {
    let counter = 0
    let circleDataList = []
    let today = new Date()
    wSymb2Decoder = wSymb2Json

    for (let ts of forecastFullData.timeSeries) {
        let timeSerieDate = new Date(ts.validTime)
        if (getHourFromTime(ts.validTime) % interval === 0
            && today.getDate() === timeSerieDate.getDate()
            && counter < noOfDataPoints) {
            counter++
            let temperatureValue = 0
            let precipitationValue = 0
            let windValue = 0
            let gustValue = 0
            let wsymb2Value = 0

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
                if (param.name === 'Wsymb2') {
                    wsymb2Value = param.values[0]
                }
            }
            circleDataList.push({
                time: hourTime(ts.validTime),
                validTime: ts.validTime,
                wSymb2Symbol: getWSymb2Unicode(wsymb2Value),
                temperature: temperatureValue,
                precipitation: precipitationValue, /*Mean preciptation used*/
                wind: windValue,
                gusts: gustValue
            })
        }
    }
    return circleDataList
}

function getListWithWeatherDataFor10Days(forecastFullData, wSymb2Json, interval, noOfDataPoints) {
    let counter = 0
    let circleDataList = []
    let today = new Date()
    wSymb2Decoder = wSymb2Json



    for (let ts of forecastFullData.timeSeries) {
        let timeSerieDate = new Date(ts.validTime)

        if (getHourFromTime(ts.validTime) % interval === 0
            && today.getDate() > timeSerieDate.getDate()
            && counter < noOfDataPoints) {

            counter++
            let temperatureValue = 0
            let precipitationValue = 0
            let windValue = 0
            let gustValue = 0
            let wsymb2Value = 0

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
                if (param.name === 'Wsymb2') {
                    wsymb2Value = param.values[0]
                }
            }
            circleDataList.push({
                time: hourTime(ts.validTime),
                validTime: ts.validTime,
                wSymb2Symbol: getWSymb2Unicode(wsymb2Value),
                temperature: temperatureValue,
                precipitation: precipitationValue, /*Mean preciptation used*/
                wind: windValue,
                gusts: gustValue
            })
        }
    }
    return circleDataList
}


Object.freeze(getListWithWeatherDataForToday);
Object.freeze(getListWithWeatherDataFor10Days);
export default {getListWithWeatherDataForToday, getListWithWeatherDataFor10Days}