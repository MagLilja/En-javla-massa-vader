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

function getListWithWeatherData(forecastFullData, wSymb2Json, interval, noOfDataPoints, onlyToday) {
    let counter = 0
    let circleDataList = []
    let today = new Date()
    wSymb2Decoder = wSymb2Json

    function populateList(ts) {
        counter++
        let temperatureValue = 0
        let precipitationValue = 0
        let windValue = 0
        let gustValue = 0
        let wsymb2Value = 0

        for (let param of ts.parameters) {
            switch (param.name) {
                case 't':
                    temperatureValue = param.values[0]
                    break;
                case 'pmean':
                    precipitationValue = param.values[0]
                    break;
                case 'ws':
                    windValue = param.values[0]
                    break;
                case 'gust':
                    gustValue = param.values[0]
                    break;
                case 'Wsymb2':
                    wsymb2Value = param.values[0]
                    break;
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

    for (let ts of forecastFullData.timeSeries) {
        let timeSerieDate = new Date(ts.validTime)
        if (onlyToday){
            if (getHourFromTime(ts.validTime) % interval === 0
                && today.getDate() === timeSerieDate.getDate()
                && counter < noOfDataPoints) {
                populateList(ts);
            }
        } else {
            if (getHourFromTime(ts.validTime) % interval === 0
                && today.getDate() > timeSerieDate.getDate()
                && counter < noOfDataPoints) {
                populateList(ts);
            }
        }

    }
    return circleDataList
}


Object.freeze(getListWithWeatherData);
export default {getListWithWeatherData}